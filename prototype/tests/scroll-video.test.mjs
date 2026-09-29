import assert from 'node:assert/strict';
import test from 'node:test';
import { attachScrollVideo } from '../src/scroll-video.ts';

// A metadata-only video is a legal Safari loading state. Decoding remains
// asynchronous: currentTime changes immediately, seeked completes it later.
function fixture(t) {
  const doc = new EventTarget();
  doc.hidden = false;
  const frames = new Map();
  let id = 0, intersection;
  const restore = [];
  for (const [name, value] of Object.entries({
    document: doc,
    requestAnimationFrame: callback => { frames.set(++id, callback); return id; },
    cancelAnimationFrame: key => frames.delete(key),
    IntersectionObserver: class {
      constructor(callback) { intersection = callback; }
      observe() {}
      disconnect() {}
    },
  })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, value });
    restore.push(() => previous ? Object.defineProperty(globalThis, name, previous) : delete globalThis[name]);
  }
  const video = new EventTarget();
  Object.assign(video, { readyState: 1, duration: 14.6, seeking: false });
  let currentTime = 0, desired = 0, changed;
  Object.defineProperty(video, 'currentTime', {
    get: () => currentTime,
    set: value => { currentTime = value; video.seeking = true; },
  });
  const decoded = [];
  const cleanup = attachScrollVideo(video, {
    get: () => desired,
    on: (_event, callback) => { changed = callback; return () => { changed = undefined; }; },
  }, time => decoded.push(time));
  t.after(() => { cleanup(); restore.forEach(fn => fn()); });
  return {
    video, doc, decoded, cleanup,
    visible: value => intersection([{ isIntersecting: value }]),
    target: value => { desired = value; changed?.(); },
    emit: event => video.dispatchEvent(new Event(event)),
    finish: () => { video.readyState = 2; video.seeking = false; video.dispatchEvent(new Event('seeked')); },
    tick: () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback()); },
  };
}

test('metadata alone can start a scroll seek, without waiting for loadeddata', t => {
  const f = fixture(t);
  f.visible(true);
  f.target(5);
  f.emit('loadedmetadata');
  f.tick();
  assert.equal(f.video.currentTime, 5);
  assert.deepEqual(f.decoded, []); // The heading must wait for the actual decoded frame.
  f.finish();
  assert.deepEqual(f.decoded, [5]);
});

test('loading metadata wakes an already-visible film even after scrolling stops', t => {
  const f = fixture(t);
  f.video.readyState = 0;
  f.visible(true);
  f.target(7);
  f.tick();
  assert.equal(f.video.currentTime, 0);
  f.video.readyState = 1;
  f.emit('loadedmetadata');
  f.tick();
  assert.equal(f.video.currentTime, 7);
});

test('one pending seek catches up to the latest scroll position, including reverse', t => {
  const f = fixture(t);
  f.video.readyState = 4;
  f.visible(true);
  f.target(5);
  f.tick();
  f.target(8);
  f.target(2);
  f.tick();
  assert.equal(f.video.currentTime, 5);
  f.finish();
  f.tick();
  assert.equal(f.video.currentTime, 2);
});

test('offscreen, hidden and disposed films do not keep seeking', t => {
  const f = fixture(t);
  f.video.readyState = 4;
  f.target(5);
  f.tick();
  assert.equal(f.video.currentTime, 0);
  f.visible(true);
  f.doc.hidden = true;
  f.tick();
  assert.equal(f.video.currentTime, 0);
  f.doc.hidden = false;
  f.doc.dispatchEvent(new Event('visibilitychange'));
  f.tick();
  assert.equal(f.video.currentTime, 5);
  f.finish();
  f.cleanup();
  f.target(10);
  f.tick();
  assert.equal(f.video.currentTime, 5);
});
