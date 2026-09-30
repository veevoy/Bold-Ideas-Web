import type { ProjectCaseStudy } from '../case-study-model';
import { TextReveal } from './TextReveal';
import { responsiveImage } from '../responsive-images';

export function CaseStudyHero({ study }: { study: ProjectCaseStudy }) {
  const background = study.hero?.background ?? study.image;
  const screen = study.hero?.screen;
  const foreground = study.hero ? screen : study.image;
  const portrait = screen && screen.height > screen.width;
  return <header className="case-hero" data-nav-tone="dark" data-background-only={!foreground || undefined}>
    <img className="case-hero-background" data-soft-background={study.slug === 'kinable' || undefined} src={background.src} {...responsiveImage(background.src, '100vw')} alt={background.illustrative ? '' : background.alt} width={background.width} height={background.height} style={{ objectPosition: background.position }} fetchPriority="high" decoding="async" />
    <div className="case-hero-shade" aria-hidden="true" />
    <div className="case-hero-content wrap">
      <div className="case-hero-heading">
        <p className="case-detail-project-name">{study.name}</p>
        <TextReveal as="h1" id="case-detail-title" lines={study.headline} />
      </div>
      {foreground && <figure className="case-hero-screen" data-screen={!!screen || undefined} data-portrait={portrait || undefined} data-entrance="media">
        {screen && !portrait && <div className="case-hero-screen-bar" aria-hidden="true"><span /><span /><span /><b>{study.name}</b></div>}
        <img src={foreground.src} {...responsiveImage(foreground.src, portrait ? '(max-width: 600px) 60vw, 420px' : '(max-width: 600px) calc(100vw - 48px), (max-width: 1450px) 78vw, 1120px')} alt={foreground.alt} width={foreground.width} height={foreground.height} loading="eager" decoding="async" />
      </figure>}
    </div>
  </header>;
}
