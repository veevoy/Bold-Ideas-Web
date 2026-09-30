import test from 'node:test';
import assert from 'node:assert/strict';
import { animateServiceReflow } from '../src/service-reflow.ts';

function card(rect) {
  const calls = [];
  return { calls, getBoundingClientRect: () => rect, animate: (...args) => {
    const animation = { cancel() { this.cancelled = true; }, cancelled: false };
    calls.push({ args, animation });
    return animation;
  } };
}

test('unstacks from the visible old pose, including scale, without animating document scroll', () => {
  const element = card({ left: 24, top: -340, width: 800, height: 600 });
  const cancel = animateServiceReflow(new Map([[element, { left: 44, top: 104, width: 760, height: 570 }]]), false, 900);
  const [{ args: [frames, options], animation }] = element.calls;
  assert.equal(frames[0].transform, 'translate(20px, 444px) scale(0.95)');
  assert.equal(frames[1].transform, 'none');
  assert.ok(options.duration >= 250 && options.duration <= 450);
  cancel();
  assert.equal(animation.cancelled, true);
});

test('reduced motion, unchanged cards and wholly offscreen cards do not allocate animations', () => {
  const element = card({ left: 24, top: 200, width: 800, height: 600 });
  const pose = { left: 24, top: 200, width: 800, height: 600 };
  animateServiceReflow(new Map([[element, { ...pose, top: 104 }]]), true, 900);
  animateServiceReflow(new Map([[element, pose]]), false, 900);
  const offscreen = card({ ...pose, top: -1300 });
  animateServiceReflow(new Map([[offscreen, { ...pose, top: -1400 }]]), false, 900);
  assert.equal(element.calls.length, 0);
  assert.equal(offscreen.calls.length, 0);
});

test('restacking animates back from normal flow and skips zero-width hidden elements', () => {
  const element = card({ left: 24, top: 124, width: 800, height: 600 });
  const hidden = card({ left: 0, top: 0, width: 0, height: 0 });
  animateServiceReflow(new Map([[element, { left: 24, top: -400, width: 800, height: 600 }], [hidden, { left: 0, top: 0, width: 0, height: 0 }]]), false, 900);
  assert.equal(element.calls[0].args[0][0].transform, 'translate(0px, -524px) scale(1)');
  assert.equal(hidden.calls.length, 0);
});

test('a scaled child stays at its captured screen position when the stack scale returns', () => {
  const element = card({ left: 20, top: 100, width: 800, height: 600 });
  element.firstElementChild = { getBoundingClientRect: () => ({ left: 40, top: 100, width: 760, height: 570 }) };
  animateServiceReflow(new Map([[element, { left: 20, top: 200, width: 800, height: 600 }]]), false, 900);
  const start = element.calls[0].args[0][0].transform;
  const [x, y, scale] = start.match(/-?\d+(?:\.\d+)?/g).map(Number);
  // Independently check the old visible edges, not the helper's formula.
  assert.ok(Math.abs(20 + x + 20 * scale - 20) < .01);
  assert.equal(100 + y, 200);
  assert.ok(Math.abs(760 * scale - 800) < .01);
});
