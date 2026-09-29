import { motion, type MotionStyle } from 'motion/react';
import type { ProjectCaseStudy } from '../case-study-model';
import { ShowcaseComposition } from './CaseStudyShowcase';
import { responsiveImage, thumbnailSizes } from '../responsive-images';

/** Authored preview compositions, with the complete hero pairing as the fallback. */
export function CaseStudyThumbnail({ study, eager = false, decorative = false, backgroundStyle }: {
  study: ProjectCaseStudy;
  eager?: boolean;
  decorative?: boolean;
  backgroundStyle?: MotionStyle;
}) {
  const background = study.hero?.background ?? study.image;
  const foreground = study.thumbnailScreen ?? (study.hero ? study.hero.screen : study.image);
  const portrait = foreground && foreground.height > foreground.width;
  const loading = eager ? 'eager' : 'lazy';

  if (study.thumbnail) return <div className="case-thumbnail" data-composition={study.thumbnail.layout} aria-hidden={decorative || undefined}>
    <div className={`case-showcase case-showcase--${study.thumbnail.layout}`} style={{ backgroundColor: study.thumbnail.background }}>
      <ShowcaseComposition showcase={study.thumbnail} decorative={decorative} eager={eager} />
    </div>
  </div>;

  return <div className="case-thumbnail" data-tone={study.thumbnailTone} data-portrait={portrait || undefined} aria-hidden={decorative || undefined}>
    <motion.div className="case-thumbnail-background" data-parallax={!!backgroundStyle || undefined} style={backgroundStyle}>
      <img data-soft-background={study.slug === 'kinable' || undefined} src={background.src} {...responsiveImage(background.src, thumbnailSizes)} alt={foreground || decorative ? '' : background.alt} width={background.width} height={background.height} style={{ objectPosition: background.position }} loading={loading} decoding="async" />
    </motion.div>
    <div className="case-thumbnail-shade" aria-hidden="true" />
    {foreground && <div className="case-thumbnail-stage">
      <img className="case-thumbnail-foreground" data-screen={(study.thumbnailScreen ? foreground.presentation === 'screen' : !!study.hero?.screen) || undefined} src={foreground.src} {...responsiveImage(foreground.src, portrait ? '(max-width: 600px) 35vw, 240px' : thumbnailSizes)} alt={decorative ? '' : foreground.alt} width={foreground.width} height={foreground.height} loading={loading} decoding="async" />
    </div>}
  </div>;
}
