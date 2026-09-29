import assert from 'node:assert/strict';
import test from 'node:test';
import { navigationVariant, withNavigationPreview } from '../src/navigation-preview.ts';

test('the chosen expanding navigation is the default, including unknown review values', () => {
  assert.equal(navigationVariant('?nav=glass'), 'glass');
  assert.equal(navigationVariant('?nav=classic'), 'classic');
  for (const search of ['', '?nav=expanding', '?nav=unknown', '?other=glass']) assert.equal(navigationVariant(search), 'expanding');
});

test('review navigation preserves routes and fragments; the chosen default uses clean URLs', () => {
  assert.equal(withNavigationPreview('/case-studies', 'glass'), '/case-studies?nav=glass');
  assert.equal(withNavigationPreview('/#how-we-work', 'expanding'), '/#how-we-work');
  assert.equal(withNavigationPreview('#top', 'glass'), '?nav=glass#top');
  assert.equal(withNavigationPreview('/services?view=all#built-to-last', 'glass'), '/services?view=all&nav=glass#built-to-last');
  assert.equal(withNavigationPreview('/services?nav=glass&view=all#built-to-last', 'expanding'), '/services?view=all#built-to-last');
});

test('navigation variants never alter outbound actions', () => {
  for (const href of ['https://calendar.app.google/example', '//example.test', 'mailto:hello@example.test']) assert.equal(withNavigationPreview(href, 'glass'), href);
  assert.equal(withNavigationPreview('/services#built-to-last', 'expanding'), '/services#built-to-last');
});
