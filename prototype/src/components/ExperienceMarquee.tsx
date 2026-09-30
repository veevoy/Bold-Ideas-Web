import { useEffect, useRef, useState } from 'react';
import { useSiteMotion } from './SiteMotion';

const brands = [
  { name: 'Tesco', image: 'tesco.svg', width: 92 },
  { name: 'Mapwhizz', image: 'mapwhizz.svg', width: 120 },
  { name: 'Love Peace Harmony', image: 'lph.svg', width: 72 },
  { name: 'Kinable', image: 'kinable.svg', width: 132 },
  { name: 'Czech Beer Alliance', image: 'czech-beer-alliance.png', width: 140 },
];

export function ExperienceMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useSiteMotion();
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setRunning(visible && !document.hidden && !reduced);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (ref.current) observer.observe(ref.current);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [reduced]);

  return <div ref={ref} className="hero-experience wrap" role="group" aria-labelledby="experience-label">
    <p id="experience-label">Our team's experience</p>
    <div className="experience-window">
      <div className="experience-track" style={{ animationPlayState: running ? 'running' : 'paused' }}>
        {[0, 1, 2, 3].map(copy => <div className="experience-set" key={copy} aria-hidden={copy > 0 ? true : undefined}>
          {brands.map(brand => <img key={brand.name} data-brand={brand.image.split('.')[0]} src={`/brand/experience/${brand.image}`} alt={copy === 0 ? brand.name : ''} width={brand.width} height="32" />)}
        </div>)}
      </div>
    </div>
  </div>;
}
