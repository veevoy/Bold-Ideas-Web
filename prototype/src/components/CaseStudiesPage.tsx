import { projectCaseStudies } from '../case-studies';
import { BrandJunction } from './BrandJunction';
import { CaseStudyPreview } from './CaseStudyPreview';
import { TextReveal } from './TextReveal';
import { useRef } from 'react';
import { usePageEntrance } from './usePageEntrance';

export function CaseStudiesPage() {
  const page = useRef<HTMLElement>(null);
  usePageEntrance(page);
  return <section ref={page} className="listing-page case-index wrap" aria-labelledby="case-index-title">
    <header className="listing-header">
      <TextReveal as="h1" id="case-index-title" lines={['Case studies.']} />
      <p data-entrance="copy">Good ideas deserve to get out into the world. A closer look at the challenges, decisions and products we’ve worked on.</p>
    </header>
    <div className="case-index-grid">
      {projectCaseStudies.map((study, index) => <article className="case-index-project" key={study.slug} aria-labelledby={`preview-${study.slug}`}>
        <BrandJunction className="case-index-junction case-index-junction--top" />
        {index === projectCaseStudies.length - 1 && <BrandJunction className="case-index-junction case-index-junction--bottom" />}
        <CaseStudyPreview study={study} eager={index < 2} />
      </article>)}
    </div>
  </section>;
}
