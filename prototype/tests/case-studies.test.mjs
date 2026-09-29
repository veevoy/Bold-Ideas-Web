import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parseCaseStudy, publishedCaseStudies, findCaseStudy, relatedCaseStudies, caseStudyImages } from '../src/case-study-model.ts';
import { validateCaseStudyFiles } from '../scripts/validate-case-studies.mjs';

const sample = JSON.parse(await readFile(new URL('../src/content/case-studies/love-peace-harmony.json', import.meta.url), 'utf8'));
const entry = (overrides = {}) => ({ ...structuredClone(sample), hero: undefined, thumbnail: undefined, ...overrides });

test('hero media is optional and every supplied layer is validated and collected', () => {
  assert.equal(parseCaseStudy(entry(), 'optional.json').hero, undefined);
  const source = entry({ hero: {
    background: { ...sample.image, src: '/images/background.webp', illustrative: true },
    screen: { ...sample.image, src: '/images/screen.webp' },
  } });
  const study = parseCaseStudy(source, 'hero.json');
  assert.equal(study.hero.background.illustrative, true);
  assert.deepEqual(caseStudyImages(study).slice(0, 3).map(image => image.src), [sample.image.src, '/images/background.webp', '/images/screen.webp']);
  source.hero.screen.src = '/images/../unsafe.webp';
  assert.throws(() => parseCaseStudy(source, 'hero.json'), /hero.screen.src/);
  delete source.hero.screen;
  assert.equal(parseCaseStudy(source, 'hero.json').hero.screen, undefined);
  source.hero.background.width = 0;
  assert.throws(() => parseCaseStudy(source, 'hero.json'), /hero.background.width/);
});

test('all authored projects have valid fields and available media', async () => {
  const studies = await validateCaseStudyFiles();
  assert.ok(studies.length >= 2);
  for (const study of studies) assert.equal(findCaseStudy(`/work/${study.slug}`, studies), study);
});

test('a thumbnail screen is independent of hero media and included in validation', () => {
  const source = entry({ hero: sample.hero, thumbnailScreen: { ...sample.image, src: '/images/thumbnail-graphs.webp' } });
  const study = parseCaseStudy(source, 'thumbnail-screen.json');
  assert.equal(study.hero.screen.src, sample.hero.screen.src);
  assert.ok(caseStudyImages(study).some(image => image.src === '/images/thumbnail-graphs.webp'));
  source.thumbnailScreen.src = '/images/../unsafe.webp';
  assert.throws(() => parseCaseStudy(source, 'thumbnail-screen.json'), /thumbnailScreen.src/);
});

test('new files are ordered and unpublished entries are omitted from navigation', () => {
  const studies = publishedCaseStudies({ last: entry({ slug: 'last', order: 9 }), first: entry({ slug: 'first', order: 1 }), draft: entry({ slug: 'draft', published: false }) });
  assert.deepEqual(studies.map(s => s.slug), ['first', 'last']);
  assert.equal(findCaseStudy('/work/draft', studies), undefined);
});

test('duplicate slugs cannot silently replace an existing story', () => {
  assert.throws(() => publishedCaseStudies({ a: entry(), b: entry() }), /Duplicate case study slug/);
});

test('unknown and malformed detail URLs do not show an unrelated project', () => {
  const studies = publishedCaseStudies({ sample });
  assert.equal(findCaseStudy('/work/love-peace-harmony/', studies), studies[0]);
  for (const path of ['/work/not-found', '/work/%ZZ', '/work/love-peace-harmony/extra', '/work', '/']) assert.equal(findCaseStudy(path, studies), undefined);
});

test('related stories show the next two published projects, wrap, and exclude the current project', () => {
  const studies = publishedCaseStudies({ a: entry({ slug: 'one', order: 1 }), b: entry({ slug: 'two', order: 2 }), c: entry({ slug: 'three', order: 3 }) });
  assert.deepEqual(relatedCaseStudies(studies[0], studies), [studies[1], studies[2]]);
  assert.deepEqual(relatedCaseStudies(studies[2], studies), [studies[0], studies[1]]);
  assert.deepEqual(relatedCaseStudies(studies[0], [studies[0]]), []);
  assert.deepEqual(relatedCaseStudies(studies[0], studies.slice(0, 2)), [studies[1]]);
  assert.deepEqual(relatedCaseStudies(studies[0], [studies[0], entry({ published: false })]), []);
  assert.deepEqual(relatedCaseStudies(entry({ slug: 'unknown' }), studies), []);
});

test('timelines retain their authored sequence, are optional and reject incomplete steps', () => {
  const timeline = [{ title: 'Discovery', description: 'Understand the challenge.' }, { title: 'Prototype', description: 'Test the first version.' }];
  assert.deepEqual(parseCaseStudy(entry({ timeline }), 'sample.json').timeline, timeline);
  const without = entry();
  delete without.timeline;
  assert.equal(parseCaseStudy(without, 'sample.json').timeline, undefined);
  for (const [value, field] of [[[], /timeline/], [[timeline[0]], /timeline/], [['invalid', timeline[1]], /timeline\[0\]/], [[timeline[0], { title: 'Next' }], /timeline\[1\].description/], [[{ title: '', description: 'Description' }, timeline[1]], /timeline\[0\].title/]]) {
    assert.throws(() => parseCaseStudy(entry({ timeline: value }), 'sample.json'), field);
  }
});

test('editing errors report their content field instead of producing a broken page', () => {
  for (const [changes, expected] of [[{ headline: [] }, /headline/], [{ published: 'yes' }, /published/], [{ serviceId: 'typo' }, /serviceId/], [{ challenge: { title: 'A title' } }, /challenge.paragraphs/], [{ slug: '../bad' }, /slug/]]) {
    assert.throws(() => parseCaseStudy(entry(changes), 'sample.json'), expected);
  }
});

test('image links and attribution cannot introduce remote code or path traversal', () => {
  assert.equal(parseCaseStudy(entry({ image: { ...sample.image, presentation: 'screen' } }), 'screen.json').image.presentation, 'screen');
  assert.throws(() => parseCaseStudy(entry({ image: { ...sample.image, presentation: 'unknown' } }), 'screen.json'), /image.presentation/);
  for (const src of ['javascript:alert(1)', '//evil.test/image.jpg', '/images/../file.jpg']) {
    assert.throws(() => parseCaseStudy(entry({ image: { ...sample.image, src } }), 'sample.json'), /image.src/);
  }
  assert.throws(() => parseCaseStudy(entry({ image: { ...sample.image, credit: { label: 'Source', href: 'javascript:alert(1)' } } }), 'sample.json'), /credit.href/);
});

test('optional gallery and next phase can be omitted', () => {
  const study = entry();
  delete study.gallery;
  delete study.outcome.next;
  const result = parseCaseStudy(study, 'sample.json');
  assert.equal(result.gallery, undefined);
  assert.equal(result.outcome.next, undefined);
});

test('editorial sections retain lists, closing copy and the separate future phase', async () => {
  const source = JSON.parse(await readFile(new URL('../src/content/case-studies/czech-beer-alliance.json', import.meta.url), 'utf8'));
  const study = parseCaseStudy(source, 'czech-beer-alliance.json');
  assert.deepEqual(study.approach[0].items, source.approach[0].items);
  assert.deepEqual(study.approach[1].closingParagraphs, source.approach[1].closingParagraphs);
  assert.deepEqual(study.outcome.paragraphs, source.outcome.paragraphs);
  assert.deepEqual(study.nextPhase.items, source.nextPhase.items);
  assert.deepEqual(study.nextPhase.paragraphs, source.nextPhase.paragraphs);
  assert.deepEqual(study.callToAction, source.callToAction);
  assert.equal(study.serviceLabel, source.serviceLabel);
});

test('optional editorial blocks and linked testimonials report authoring mistakes', () => {
  const study = entry({ testimonialId: 'mapwhizz' });
  assert.equal(parseCaseStudy(study, 'sample.json').testimonialId, 'mapwhizz');
  for (const [changes, field] of [
    [{ testimonialId: 'unknown' }, /testimonialId/],
    [{ serviceLabel: '' }, /serviceLabel/],
    [{ nextPhase: { title: 'Next', paragraphs: ['Planned work'], items: [''] } }, /nextPhase.items/],
    [{ approach: [{ title: 'Work', paragraphs: ['Done'], closingParagraphs: [] }] }, /closingParagraphs/],
    [{ outcome: { ...sample.outcome, paragraphs: [''] } }, /outcome.paragraphs/],
    [{ callToAction: { title: 'Talk to us', body: 'About the project' } }, /callToAction.label/],
  ]) assert.throws(() => parseCaseStudy(entry(changes), 'sample.json'), field);
});

test('chapter media are editable, optional and validated throughout the story', () => {
  const source = entry({
    challenge: { title: 'Challenge', paragraphs: ['Context'], images: [{ ...sample.image, src: '/images/challenge.webp' }] },
    approach: [{ title: 'Work', paragraphs: ['Approach'], images: [] }],
    gallery: [],
    nextPhase: { title: 'Next', paragraphs: ['Planned'], images: [{ ...sample.image, src: '/images/next.webp' }] },
  });
  const study = parseCaseStudy(source, 'editable.json');
  assert.deepEqual(caseStudyImages(study).map(image => image.src), [sample.image.src, '/images/challenge.webp', '/images/next.webp']);
  assert.deepEqual(study.approach[0].images, []);
  source.challenge.images[0].src = '/images/../unsafe.webp';
  assert.throws(() => parseCaseStudy(source, 'editable.json'), /challenge.images\[0\].src/);
  source.challenge.images = [];
  source.nextPhase.images[0].width = 0;
  assert.throws(() => parseCaseStudy(source, 'editable.json'), /nextPhase.images\[0\].width/);
  source.nextPhase.images = 'not an array';
  assert.throws(() => parseCaseStudy(source, 'editable.json'), /nextPhase.images must be an array/);
});

const detailBoard = () => ({ label: 'A product detail', background: '#CFE6DD', layout: 'focus', items: [{ image: { ...sample.image, src: '/images/detail.webp' }, crop: { x: 20, y: 30, width: 400, height: 300 } }] });

test('detail compositions retain original sources and are included in the media inventory', () => {
  const source = entry({
    challenge: { title: 'Challenge', paragraphs: ['Context'], showcases: [detailBoard()] },
    approach: [{ title: 'Work', paragraphs: ['Approach'], showcases: [detailBoard()] }],
    showcases: [detailBoard()],
    nextPhase: { title: 'Next', paragraphs: ['Next'], showcases: [detailBoard()] },
  });
  const study = parseCaseStudy(source, 'details.json');
  assert.deepEqual(study.challenge.showcases[0].items[0].crop, { x: 20, y: 30, width: 400, height: 300 });
  assert.equal(caseStudyImages(study).filter(image => image.src === '/images/detail.webp').length, 4);
  assert.deepEqual(study.showcases[0].items[0].image.credit, sample.image.credit);
});

test('detail crops cannot extend beyond the real image or inject arbitrary styles', () => {
  for (const [mutate, field] of [
    [board => { board.items[0].crop.x = -1; }, /crop.x/],
    [board => { board.items[0].crop.width = 0; }, /crop.width/],
    [board => { board.items[0].crop.y = 0.5; }, /crop.y/],
    [board => { board.items[0].crop.width = sample.image.width; }, /crop must fit/],
    [board => { board.items[0].crop.height = sample.image.height; }, /crop must fit/],
    [board => { board.items[0].image.src = '/images/../unsafe.webp'; }, /image.src/],
    [board => { board.background = 'url(https://example.com/image)'; }, /background/],
    [board => { board.layout = 'unknown'; }, /layout/],
    [board => { board.layout = 'cards'; }, /items must contain 3/],
  ]) {
    const board = detailBoard();
    mutate(board);
    assert.throws(() => parseCaseStudy(entry({ showcases: [board] }), 'details.json'), field);
  }
});

test('thumbnail compositions retain their independent media and validate crop bounds', () => {
  const board = detailBoard();
  const study = parseCaseStudy(entry({ thumbnail: board }), 'thumbnail.json');
  assert.deepEqual(study.thumbnail?.items[0].crop, board.items[0].crop);
  assert.ok(caseStudyImages(study).some(image => image.src === '/images/detail.webp'));
  board.items[0].crop.x = 99999;
  assert.throws(() => parseCaseStudy(entry({ thumbnail: board }), 'thumbnail.json'), /crop must fit/);
});

test('phone navigation crops stay attached to authentic source pixels', () => {
  const board = detailBoard();
  board.items[0].footerCrop = { x: 0, y: 400, width: 400, height: 120 };
  assert.deepEqual(parseCaseStudy(entry({ showcases: [board] }), 'phones.json').showcases[0].items[0].footerCrop, board.items[0].footerCrop);
  board.items[0].footerCrop.y = 99999;
  assert.throws(() => parseCaseStudy(entry({ showcases: [board] }), 'phones.json'), /footerCrop must fit/);
});
