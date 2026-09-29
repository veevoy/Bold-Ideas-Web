import type { CSSProperties } from 'react';
import type { StudyShowcase } from '../case-study-model';
import { responsiveImage, gallerySizes } from '../responsive-images';

function ShowcasePiece({ item, decorative = false, eager = false, sizes = gallerySizes }: { item: StudyShowcase['items'][number]; decorative?: boolean; eager?: boolean; sizes?: string }) {
  const { image, crop } = item;
  const wholeFrame = crop.x === 0 && crop.y === 0 && crop.width === image.width && crop.height === image.height;
  return <div className="case-showcase-piece" style={{ aspectRatio: `${crop.width} / ${crop.height}`, '--piece-ratio': crop.width / crop.height } as CSSProperties}>
    <img src={image.src} {...wholeFrame ? responsiveImage(image.src, sizes) : {}} alt={decorative ? '' : image.alt} width={image.width} height={image.height} loading={eager ? 'eager' : 'lazy'} decoding="async" style={{
      width: `${image.width / crop.width * 100}%`,
      left: `${-crop.x / crop.width * 100}%`,
      top: `${-crop.y / crop.height * 100}%`,
    }} />
  </div>;
}

export function ShowcaseComposition({ showcase, decorative = false, eager = false }: { showcase: StudyShowcase; decorative?: boolean; eager?: boolean }) {
  const sizes = showcase.layout === 'artwork-pair' ? '(max-width: 600px) calc(50vw - 30px), (max-width: 2087px) 45vw, 944px' : gallerySizes;
  return <div className="case-showcase-composition">
    {showcase.layout === 'care' && <div className="case-showcase-tiles">
      {showcase.items.slice(0, 4).map((item, index) => <ShowcasePiece item={item} decorative={decorative} eager={eager} key={index} />)}
    </div>}
    {showcase.items.slice(showcase.layout === 'care' ? 4 : 0).map((item, index) => item.footerCrop ?
      <div className="case-showcase-phone" key={index}>
        <div className="case-showcase-phone-body"><ShowcasePiece item={item} decorative={decorative} eager={eager} /></div>
        <div className="case-showcase-phone-nav"><ShowcasePiece item={{ ...item, crop: item.footerCrop }} decorative eager={eager} /></div>
      </div> : <ShowcasePiece item={item} decorative={decorative} eager={eager} sizes={sizes} key={`${item.image.src}-${index}`} />)}
  </div>;
}

export function CaseStudyShowcases({ showcases }: { showcases?: readonly StudyShowcase[] }) {
  return showcases?.map((showcase, index) => <div className="case-detail-media wrap" key={index}>
    <figure className={`case-showcase case-showcase--${showcase.layout}`} style={{ backgroundColor: showcase.background }} aria-label={showcase.label} data-entrance="media">
      <ShowcaseComposition showcase={showcase} />
    </figure>
  </div>);
}
