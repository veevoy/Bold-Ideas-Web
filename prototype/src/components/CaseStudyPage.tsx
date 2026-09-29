import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import { type ProjectCaseStudy, type StudyImage, type StorySection } from '../case-study-model';
import { services } from '../content';
import { testimonialSlides } from '../testimonial-content';
import { FrameJunctions, TestimonialAuthor, TestimonialQuote } from './Testimonials';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyShowcases } from './CaseStudyShowcase';
import { usePageEntrance } from './usePageEntrance';
import { BrandJunction } from './BrandJunction';
import { CaseStudyPreview } from './CaseStudyPreview';
import { BrandList } from './BrandList';
import { responsiveImage, gallerySizes } from '../responsive-images';

function Junction({ edge }: { edge: 'top' | 'bottom' }) {
  return <svg className={`case-detail-junction case-detail-junction--${edge}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z" /></svg>;
}

function ProjectImage({ image }: { image: StudyImage }) {
  return <figure className="case-detail-image" data-entrance="media">
    <div className="case-detail-image-frame" data-portrait={image.height > image.width || undefined}><img data-screen={image.presentation === 'screen' || undefined} src={image.src} {...responsiveImage(image.src, gallerySizes)} alt={image.alt} width={image.width} height={image.height} style={{ objectPosition: image.position }} loading="lazy" decoding="async" /></div>
  </figure>;
}

function StoryImages({ images }: { images?: readonly StudyImage[] }) {
  if (!images?.length) return null;
  return <div className={`case-detail-media wrap${images.length > 1 ? ' case-detail-media-pair' : ''}`}>
    {images.map((image, index) => <ProjectImage key={`${image.src}-${index}`} image={image} />)}
  </div>;
}

function StoryChapter({ section, label, id }: { section: StorySection; label?: string; id: string }) {
  return <>
    <section className="case-detail-chapter wrap" id={id} aria-labelledby={`${id}-title`}>
      <div className="case-detail-margin">{label && <p className="case-detail-chapter-label">{label}</p>}</div>
      <div className="case-detail-prose" data-entrance="copy">
        <h2 id={`${id}-title`}>{section.title}</h2>
        {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {section.items && <BrandList className="case-detail-list" items={section.items} />}
        {section.closingParagraphs?.map((paragraph, index) => <p key={`closing-${index}`}>{paragraph}</p>)}
      </div>
    </section>
    <StoryImages images={section.images} />
    <CaseStudyShowcases showcases={section.showcases} />
  </>;
}

export function CaseStudyPage({ study, related }: { study: ProjectCaseStudy; related: readonly ProjectCaseStudy[] }) {
  const page = useRef<HTMLElement>(null);
  usePageEntrance(page);
  const service = services.find(item => item.id === study.serviceId)!;
  const testimonial = testimonialSlides.find(item => item.id === study.testimonialId);
  return <article ref={page} className="case-detail" aria-labelledby="case-detail-title">
    <CaseStudyHero study={study} />
    <div className="case-detail-overview wrap">
      <div className="case-detail-facts-frame" data-entrance="copy"><FrameJunctions /><dl className="case-detail-facts">
        <div><dt>Client</dt><dd>{study.name}</dd></div>
        <div><dt>Service</dt><dd>{study.serviceLabel ?? <a href={`/services#${service.id}`}>{service.name}<ArrowUpRight size={16} aria-hidden="true" /></a>}</dd></div>
        <div><dt>Our role</dt><dd>{study.scope}</dd></div>
      </dl></div>
      <p className="case-detail-summary" data-entrance="copy">{study.summary}</p>
    </div>
    <StoryChapter section={study.challenge} label="The challenge" id="case-challenge" />
    {study.timeline && <section className="case-timeline-band" id="case-timeline" aria-labelledby="case-timeline-title" data-nav-tone="dark"><div className="case-timeline wrap">
      <h2 id="case-timeline-title" data-entrance="copy">The project, step by step.</h2>
      <ol className="case-timeline-steps" style={{ '--timeline-columns': Math.min(study.timeline.length, 4) } as CSSProperties}>
        {study.timeline.map((step, index) => <li key={index} data-entrance="copy" data-entrance-order={index}>
          <BrandJunction className="case-timeline-node" />
          <span className="case-timeline-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3>{step.title}</h3><p>{step.description}</p>
        </li>)}
      </ol>
    </div></section>}
    {study.approach.map((step, index) => <StoryChapter key={index} section={step} label={index === 0 ? 'What we did' : undefined} id={`case-approach${index ? `-${index + 1}` : ''}`} />)}
    <StoryImages images={study.gallery} />
    <CaseStudyShowcases showcases={study.showcases} />
    {testimonial && <section className="case-detail-testimonial" id="case-testimonial" aria-labelledby="case-testimonial-title"><div className="wrap">
      <h2 id="case-testimonial-title" className="case-detail-chapter-label">In their words</h2>
      <div className="testimonial-frame"><FrameJunctions /><figure data-entrance="copy"><TestimonialQuote quote={testimonial.quote} /><TestimonialAuthor testimonial={testimonial} /></figure></div>
    </div></section>}
    <section className="case-detail-outcome wrap" id="case-outcome" aria-labelledby="case-outcome-title">
      <div className="case-detail-outcome-inner"><Junction edge="top" /><Junction edge="bottom" />
        <div className="case-detail-outcome-heading"><h2 className="case-detail-chapter-label" id="case-outcome-title">The outcome</h2></div>
        <div className="case-detail-result" data-entrance="copy"><p className="case-detail-result-summary">{study.outcome.summary}</p>
          {study.outcome.paragraphs && <div className="case-detail-result-body">{study.outcome.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
          <BrandList className="case-detail-deliverables" items={study.outcome.deliverables} />
          {study.outcome.next && <div className="case-detail-next-step"><h3>What comes next</h3><p>{study.outcome.next}</p></div>}
        </div>
      </div>
    </section>
    {study.nextPhase && <StoryChapter section={study.nextPhase} label="What’s next" id="case-next-phase" />}
    {related.length > 0 && <nav className="case-detail-next wrap" aria-label="More case studies">
      <div className="case-detail-next-heading"><h2>More stories.</h2></div>
      <div className="case-related-grid" data-single={related.length === 1 || undefined}>
        <BrandJunction className="case-related-junction case-related-junction--top" />
        <BrandJunction className="case-related-junction case-related-junction--bottom" />
        {related.map(item => <CaseStudyPreview key={item.slug} study={item} related />)}
      </div>
    </nav>}
  </article>;
}

export function CaseStudyNotFound() {
  return <section className="case-detail-not-found wrap" aria-labelledby="case-not-found-title"><h1 id="case-not-found-title">This story isn’t here.</h1><p>The link may have changed, or this case study hasn’t been published yet.</p><a className="primary-link" href="/case-studies"><ArrowLeft size={18} aria-hidden="true" />Explore our case studies</a></section>;
}
