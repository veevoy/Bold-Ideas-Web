import assert from 'node:assert/strict';
import test from 'node:test';
import { attachScrollSequence } from '../src/scroll-sequence.ts';

// Only browser I/O is substituted. The real controller owns loading, timing,
// frame selection and disposal; decoding/network completion stays asynchronous.
function fixture(t) {
  const doc = new EventTarget();
  doc.hidden = false;
  const raf = new Map(), images = [], draws = [], shown = [], errors = [];
  let id = 0, intersection, changed, target = 0;
  const restore = [];
  for (const [name, value] of Object.entries({
    document: doc,
    requestAnimationFrame: fn => { raf.set(++id, fn); return id; },
    cancelAnimationFrame: key => raf.delete(key),
    IntersectionObserver: class {
      constructor(callback) { intersection = callback; }
      observe() {}
      disconnect() {}
    },
    Image: class {
      constructor() { images.push(this); }
      src = ''; complete = false; naturalWidth = 0;
      decode() { return Promise.resolve(); }
    },
  })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, value });
    restore.push(() => previous ? Object.defineProperty(globalThis, name, previous) : delete globalThis[name]);
  }
  const canvas = { width: 720, height: 405, getContext: () => ({ drawImage: (...args) => draws.push(args) }) };
  const stop = attachScrollSequence(canvas, { width: 720, height: 405, columns: 4, framesPerSheet: 8, fps: 24, frameCount: 24, sheets: ['/a.webp', '/b.webp', '/c.webp'] }, {
    get: () => target, on: (_event, callback) => { changed = callback; return () => { changed = undefined; }; },
  }, time => shown.push(time), () => errors.push('failed'));
  t.after(() => { stop(); restore.forEach(fn => fn()); });
  return {
    images, draws, shown, errors, stop, doc,
    visible: value => intersection([{ isIntersecting: value }]),
    target: value => { target = value; changed?.(); },
    tick: () => { const jobs = [...raf.values()]; raf.clear(); jobs.forEach(fn => fn()); },
    async loaded(src) { const image = images.findLast(item => item.src === src); assert.ok(image, `requested ${src}`); image.complete = true; image.naturalWidth = 2880; await image.onload(); },
    fail(src) { images.findLast(item => item.src === src).onerror(); },
  };
}

test('keeps the last painted frame until the next scroll target has decoded', async t => {
  const f = fixture(t);
  f.visible(true); f.tick();
  assert.deepEqual(f.shown, []);
  await f.loaded('/a.webp'); f.tick();
  assert.equal(f.draws.length, 1);
  f.target(0.5); f.tick();
  assert.equal(f.draws.length, 1); // No clearing/replacing the visible frame with a pending one.
  assert.deepEqual(f.shown, [0]);
  await f.loaded('/b.webp'); f.tick();
  assert.deepEqual(f.draws.at(-1).slice(1), [0, 405, 720, 405, 0, 0, 720, 405]);
  assert.equal(f.shown.at(-1), 0.5);
});

test('a stale download cannot overwrite a newer scroll position; reverse and final frames work', async t => {
  const f = fixture(t);
  f.visible(true); f.tick(); f.target(100); f.tick();
  await f.loaded('/a.webp'); f.tick();
  assert.equal(f.draws.length, 0);
  await f.loaded('/c.webp'); f.tick();
  assert.equal(f.shown.at(-1), 23 / 24);
  assert.deepEqual(f.draws.at(-1).slice(1, 3), [2160, 405]);
  f.target(-1); f.tick();
  assert.equal(f.shown.at(-1), 0);
});

test('offscreen and hidden sections stop painting; disposal cancels pending work', async t => {
  const f = fixture(t);
  f.tick(); assert.equal(f.images.length, 0);
  f.visible(true); f.tick(); await f.loaded('/a.webp');
  f.doc.hidden = true; f.tick(); assert.equal(f.draws.length, 0);
  f.doc.hidden = false; f.doc.dispatchEvent(new Event('visibilitychange')); f.tick();
  assert.equal(f.draws.length, 1);
  f.visible(false); f.target(0.2); f.tick(); assert.equal(f.draws.length, 1);
  f.stop(); f.visible(true); f.tick(); assert.equal(f.draws.length, 1);
});

test('a failed required sheet invokes the static fallback, without erasing the canvas', async t => {
  const f = fixture(t);
  f.visible(true); f.tick(); await f.loaded('/a.webp'); f.tick();
  f.target(.5); f.tick(); f.fail('/b.webp');
  assert.equal(f.draws.length, 1);
  assert.deepEqual(f.errors, ['failed']);
});
