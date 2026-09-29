import { ArrowUpRight } from 'lucide-react';
import { BrandJunction } from './BrandJunction';
import { CaseStudyThumbnail } from './CaseStudyThumbnail';
import { caseStudyHref, type ProjectCaseStudy } from '../case-study-model';

/** One preview vocabulary for the project index and the smaller related stories. */
export function CaseStudyPreview({ study, related = false, eager = false }: { study: ProjectCaseStudy; related?: boolean; eager?: boolean }) {
  const Heading = related ? 'h3' : 'h2';
  return <a className={`case-preview${related ? ' case-preview--related' : ''}`} href={caseStudyHref(study)} aria-labelledby={`preview-${study.slug}`}>
    <div className="case-preview-image" data-entrance="media">
      <CaseStudyThumbnail study={study} eager={eager} decorative />
    </div>
    {related && <BrandJunction className="case-related-mobile-node" />}
    <div className="case-preview-copy" data-entrance="copy">
      <Heading id={`preview-${study.slug}`}><span>{study.name}</span><ArrowUpRight size={28} strokeWidth={1.4} aria-hidden="true" /></Heading>
      <p className="case-preview-headline">{study.headline.join(' ')}</p>
      <p className="case-preview-sector">{study.sector}</p>
    </div>
  </a>;
}
