import test from 'node:test';
import assert from 'node:assert/strict';
import { pageForPath, navigationHref } from '../src/site-routes.ts';

test('index pages and existing project URLs remain distinct, including trailing slashes', () => {
  for (const path of ['/case-studies', '/case-studies/', '/work', '/work/']) assert.equal(pageForPath(path), 'case-studies');
  for (const path of ['/services', '/services/']) assert.equal(pageForPath(path), 'services');
  assert.equal(pageForPath('/work/mapwhizz'), 'case-study');
  assert.equal(pageForPath('/work/unpublished/'), 'case-study');
  assert.equal(pageForPath('/testimonials/'), 'testimonials');
  assert.equal(pageForPath('/'), 'home');
});

test('page navigation never becomes a protocol-relative URL and home anchors work from detail pages', () => {
  assert.equal(navigationHref('/case-studies', false), '/case-studies');
  assert.equal(navigationHref('/services', false), '/services');
  assert.equal(navigationHref('#about', false), '/#about');
  assert.equal(navigationHref('#about', true), '#about');
});
