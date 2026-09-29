import { services, testimonials, type ServiceId } from './content.ts';

export interface StudyImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly position?: string;
  readonly caption?: string;
  readonly credit?: { readonly label: string; readonly href: string };
  readonly illustrative?: boolean;
  readonly presentation?: 'screen';
}

export interface StorySection {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly items?: readonly string[];
  readonly closingParagraphs?: readonly string[];
  readonly images?: readonly StudyImage[];
  readonly showcases?: readonly StudyShowcase[];
}

/** Authored source-pixel crops keep product details tied to the original export. */
export interface StudyCrop { readonly x: number; readonly y: number; readonly width: number; readonly height: number }

export interface StudyShowcase {
  readonly label: string;
  readonly background: string;
  readonly layout: 'focus' | 'cards' | 'feature' | 'report' | 'comparison' | 'care' | 'phones' | 'pages' | 'screen' | 'stack' | 'artwork' | 'artwork-pair' | 'canvas' | 'canvas-pair';
  readonly items: readonly {
    readonly image: StudyImage;
    readonly crop: StudyCrop;
    readonly footerCrop?: StudyCrop;
  }[];
}

export interface ProjectMilestone {
  readonly title: string;
  readonly description: string;
}

export interface ProjectCaseStudy {
  readonly slug: string;
  readonly order: number;
  readonly published: boolean;
  readonly name: string;
  readonly headline: readonly string[];
  readonly summary: string;
  readonly sector: string;
  readonly serviceId: ServiceId;
  readonly serviceLabel?: string;
  readonly scope: string;
  readonly image: StudyImage;
  readonly thumbnailTone?: 'light';
  readonly thumbnail?: StudyShowcase;
  readonly thumbnailScreen?: StudyImage;
  readonly hero?: { readonly background: StudyImage; readonly screen?: StudyImage };
  readonly challenge: StorySection;
  readonly timeline?: readonly ProjectMilestone[];
  readonly approach: readonly StorySection[];
  readonly gallery?: readonly StudyImage[];
  readonly showcases?: readonly StudyShowcase[];
  readonly testimonialId?: string;
  readonly nextPhase?: StorySection;
  readonly callToAction?: { readonly title: string; readonly body: string; readonly label: string };
  readonly outcome: {
    readonly summary: string;
    readonly paragraphs?: readonly string[];
    readonly deliverables: readonly string[];
    readonly next?: string;
  };
}

// Validate editable content at build time and in Vite: errors identify the file/field.
export function parseCaseStudy(input: unknown, source: string): ProjectCaseStudy {
  const fail = (field: string, expected: string): never => { throw new Error(`${source}: ${field} ${expected}`); };
  function record(value: unknown, field: string): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return fail(field, 'must be an object.');
    return value as Record<string, unknown>;
  }
  function text(value: unknown, field: string): string {
    if (typeof value !== 'string' || !value.trim()) return fail(field, 'must contain text.');
    return value;
  }
  function list(value: unknown, field: string): unknown[] {
    if (!Array.isArray(value) || !value.length) return fail(field, 'must be a non-empty array.');
    return value;
  }
  const texts = (value: unknown, field: string) => list(value, field).map((item, index) => text(item, `${field}[${index}]`));
  function section(value: unknown, field: string): StorySection {
    const item = record(value, field);
    return { title: text(item.title, `${field}.title`), paragraphs: texts(item.paragraphs, `${field}.paragraphs`),
      items: item.items === undefined ? undefined : texts(item.items, `${field}.items`),
      closingParagraphs: item.closingParagraphs === undefined ? undefined : texts(item.closingParagraphs, `${field}.closingParagraphs`),
      images: images(item.images, `${field}.images`), showcases: showcases(item.showcases, `${field}.showcases`) };
  }
  function image(value: unknown, field: string): StudyImage {
    const item = record(value, field);
    const src = text(item.src, `${field}.src`);
    if (!/^\/images\/[a-zA-Z0-9/_-]+\.(webp|png|jpe?g|avif|svg)$/.test(src) || src.includes('..')) fail(`${field}.src`, 'must be a local /images/ file.');
    for (const dimension of ['width', 'height']) {
      if (typeof item[dimension] !== 'number' || !Number.isInteger(item[dimension]) || (item[dimension] as number) <= 0) fail(`${field}.${dimension}`, 'must be a positive integer.');
    }
    if (item.illustrative !== undefined && typeof item.illustrative !== 'boolean') fail(`${field}.illustrative`, 'must be true or false.');
    if (item.presentation !== undefined && item.presentation !== 'screen') fail(`${field}.presentation`, 'must be screen, or omitted for photography.');
    let credit: StudyImage['credit'];
    if (item.credit !== undefined) {
      const source = record(item.credit, `${field}.credit`);
      const href = text(source.href, `${field}.credit.href`);
      try { if (new URL(href).protocol !== 'https:') fail(`${field}.credit.href`, 'must be an HTTPS URL.'); }
      catch { fail(`${field}.credit.href`, 'must be an HTTPS URL.'); }
      credit = { label: text(source.label, `${field}.credit.label`), href };
    }
    return { src, alt: text(item.alt, `${field}.alt`), width: item.width as number, height: item.height as number,
      position: item.position === undefined ? undefined : text(item.position, `${field}.position`),
      caption: item.caption === undefined ? undefined : text(item.caption, `${field}.caption`),
      illustrative: item.illustrative as boolean | undefined, presentation: item.presentation as StudyImage['presentation'], credit };
  }
  function images(value: unknown, field: string): StudyImage[] | undefined {
    if (value === undefined) return undefined;
    if (!Array.isArray(value)) return fail(field, 'must be an array.');
    return value.map((item, index) => image(item, `${field}[${index}]`));
  }
  function crop(value: unknown, field: string, source: StudyImage): StudyCrop {
    const rect = record(value, field);
    for (const key of ['x', 'y', 'width', 'height']) {
      if (typeof rect[key] !== 'number' || !Number.isInteger(rect[key]) || (rect[key] as number) < (key === 'x' || key === 'y' ? 0 : 1)) {
        fail(`${field}.${key}`, 'must be a valid source-pixel integer.');
      }
    }
    const bounds = { x: rect.x as number, y: rect.y as number, width: rect.width as number, height: rect.height as number };
    if (bounds.x + bounds.width > source.width || bounds.y + bounds.height > source.height) fail(field, 'must fit inside the source image.');
    return bounds;
  }
  function showcases(value: unknown, field: string): StudyShowcase[] | undefined {
    if (value === undefined) return undefined;
    return list(value, field).map((value, index) => {
      const path = `${field}[${index}]`;
      const item = record(value, path);
      const background = text(item.background, `${path}.background`);
      if (!/^#[\da-f]{6}$/i.test(background)) fail(`${path}.background`, 'must be a six-digit hex colour.');
      const counts = { focus: 1, cards: 3, feature: 3, report: 3, comparison: 2, care: 6, phones: 2, pages: 2, screen: 1, stack: 2, artwork: 1, 'artwork-pair': 2, canvas: 1, 'canvas-pair': 2 };
      const layout = text(item.layout, `${path}.layout`) as StudyShowcase['layout'];
      if (!Object.hasOwn(counts, layout)) fail(`${path}.layout`, `must be one of: ${Object.keys(counts).join(', ')}.`);
      const pieces = list(item.items, `${path}.items`);
      if (pieces.length !== counts[layout]) fail(`${path}.items`, `must contain ${counts[layout]} items for ${layout}.`);
      return { label: text(item.label, `${path}.label`), background, layout, items: pieces.map((value, index) => {
        const piecePath = `${path}.items[${index}]`;
        const piece = record(value, piecePath);
        const source = image(piece.image, `${piecePath}.image`);
        return { image: source, crop: crop(piece.crop, `${piecePath}.crop`, source),
          footerCrop: piece.footerCrop === undefined ? undefined : crop(piece.footerCrop, `${piecePath}.footerCrop`, source) };
      }) };
    });
  }
  const data = record(input, 'case study');
  if (data.thumbnailTone !== undefined && data.thumbnailTone !== 'light') fail('thumbnailTone', 'must be light, or omitted for the default treatment.');
  const slug = text(data.slug, 'slug');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('slug', 'must use lowercase words separated by hyphens.');
  if (typeof data.published !== 'boolean') fail('published', 'must be true or false.');
  if (typeof data.order !== 'number' || !Number.isFinite(data.order)) fail('order', 'must be a finite number.');
  const serviceId = text(data.serviceId, 'serviceId');
  if (!services.some(service => service.id === serviceId)) fail('serviceId', 'must match an existing service.');
  const outcome = record(data.outcome, 'outcome');
  const testimonialId = data.testimonialId === undefined ? undefined : text(data.testimonialId, 'testimonialId');
  if (testimonialId && !testimonials.some(item => item.id === testimonialId)) fail('testimonialId', 'must match an existing testimonial.');
  let callToAction: ProjectCaseStudy['callToAction'];
  if (data.callToAction !== undefined) {
    const cta = record(data.callToAction, 'callToAction');
    callToAction = { title: text(cta.title, 'callToAction.title'), body: text(cta.body, 'callToAction.body'), label: text(cta.label, 'callToAction.label') };
  }
  const gallery = images(data.gallery, 'gallery');
  let hero: ProjectCaseStudy['hero'];
  if (data.hero !== undefined) {
    const value = record(data.hero, 'hero');
    hero = { background: image(value.background, 'hero.background'), screen: value.screen === undefined ? undefined : image(value.screen, 'hero.screen') };
  }
  const timeline = data.timeline === undefined ? undefined : list(data.timeline, 'timeline').map((value, index) => {
    const item = record(value, `timeline[${index}]`);
    return { title: text(item.title, `timeline[${index}].title`), description: text(item.description, `timeline[${index}].description`) };
  });
  if (timeline && timeline.length < 2) fail('timeline', 'must contain at least two steps, or be omitted.');
  return {
    slug, order: data.order as number, published: data.published as boolean,
    name: text(data.name, 'name'), headline: texts(data.headline, 'headline'), summary: text(data.summary, 'summary'),
    sector: text(data.sector, 'sector'), serviceId: serviceId as ServiceId, scope: text(data.scope, 'scope'),
    serviceLabel: data.serviceLabel === undefined ? undefined : text(data.serviceLabel, 'serviceLabel'),
    image: image(data.image, 'image'), thumbnail: data.thumbnail === undefined ? undefined : showcases([data.thumbnail], 'thumbnail')![0], thumbnailScreen: data.thumbnailScreen === undefined ? undefined : image(data.thumbnailScreen, 'thumbnailScreen'), thumbnailTone: data.thumbnailTone as ProjectCaseStudy['thumbnailTone'], hero, challenge: section(data.challenge, 'challenge'), timeline,
    approach: list(data.approach, 'approach').map((item, index) => section(item, `approach[${index}]`)), gallery, showcases: showcases(data.showcases, 'showcases'),
    testimonialId, callToAction, nextPhase: data.nextPhase === undefined ? undefined : section(data.nextPhase, 'nextPhase'),
    outcome: { summary: text(outcome.summary, 'outcome.summary'), deliverables: texts(outcome.deliverables, 'outcome.deliverables'),
      paragraphs: outcome.paragraphs === undefined ? undefined : texts(outcome.paragraphs, 'outcome.paragraphs'),
      next: outcome.next === undefined ? undefined : text(outcome.next, 'outcome.next') },
  };
}

/** The same inventory feeds build validation and content tooling, including inline media. */
export function caseStudyImages(study: ProjectCaseStudy): readonly StudyImage[] {
  const details = (showcases?: readonly StudyShowcase[]) => showcases?.flatMap(showcase => showcase.items.map(item => item.image)) ?? [];
  return [study.image, ...details(study.thumbnail ? [study.thumbnail] : undefined), ...(study.thumbnailScreen ? [study.thumbnailScreen] : []), ...(study.hero ? [study.hero.background, ...(study.hero.screen ? [study.hero.screen] : [])] : []), ...(study.challenge.images ?? []), ...study.approach.flatMap(section => section.images ?? []),
    ...(study.gallery ?? []), ...(study.nextPhase?.images ?? []), ...details(study.challenge.showcases), ...study.approach.flatMap(section => details(section.showcases)), ...details(study.showcases), ...details(study.nextPhase?.showcases)];
}

export function publishedCaseStudies(files: Record<string, unknown>): ProjectCaseStudy[] {
  const entries = Object.entries(files).map(([file, data]) => parseCaseStudy(data, file));
  const slugs = new Set<string>();
  for (const study of entries) {
    if (slugs.has(study.slug)) throw new Error(`Duplicate case study slug: ${study.slug}`);
    slugs.add(study.slug);
  }
  return entries.filter(study => study.published).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export const caseStudyHref = (study: ProjectCaseStudy) => `/work/${study.slug}`;

export function findCaseStudy(pathname: string, studies: readonly ProjectCaseStudy[]): ProjectCaseStudy | undefined {
  const path = pathname.replace(/\/$/, '');
  return studies.find(study => caseStudyHref(study) === path);
}

export function relatedCaseStudies(current: ProjectCaseStudy, studies: readonly ProjectCaseStudy[]): ProjectCaseStudy[] {
  const published = studies.filter(study => study.published);
  const index = published.findIndex(study => study.slug === current.slug);
  if (index < 0) return [];
  return [...published.slice(index + 1), ...published.slice(0, index)].slice(0, 2);
}
