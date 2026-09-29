import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { ProcessSection } from './ProcessSection';
import { AboutSection } from './AboutSection';
import { Testimonials } from './Testimonials';
import { useSiteMotion } from './SiteMotion';

const paper = [248, 243, 236];
const green = [23, 52, 56];
const entryScrollDistance = 560;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const channels = (amount: number) => paper.map((channel, i) => Math.round(channel + (green[i] - channel) * amount));
const luminance = (rgb: number[]) => rgb.map(channel => {
  const s = channel / 255;
  return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
}).reduce((sum, channel, i) => sum + channel * [.2126, .7152, .0722][i], 0);

// Prefer the brand foregrounds. Use black/white only through the mid-tones,
// where interpolating two foreground colours would make the copy disappear.
function foreground(amount: number) {
  const light = luminance(channels(amount));
  if ((light + .05) / (luminance(green) + .05) >= 4.5) return '#173438';
  if ((luminance(paper) + .05) / (light + .05) >= 4.5) return '#f8f3ec';
  return light > .179 ? '#000000' : '#ffffff';
}

export function HomeJourney({ services }: { services: ReactNode }) {
  const range = useRef<HTMLDivElement>(null);
  const entryStart = useMotionValue(Infinity);
  const { reduced } = useSiteMotion();
  // Finish the full 560px transition before the actual media enters the
  // viewport, including after responsive wrapping or switching to stills.
  const { scrollY } = useScroll();
  const darkness = useTransform(() => clamp((scrollY.get() - entryStart.get()) / entryScrollDistance));
  const backgroundColor = useTransform(darkness, value => `rgb(${channels(value).join(', ')})`);
  const color = useTransform(darkness, foreground);
  useEffect(() => {
    if (!range.current) return;
    const element = range.current;
    const measure = () => {
      const media = element.querySelector<HTMLElement>('.process-film');
      if (!media) return;
      const story = element.querySelector<HTMLElement>('.process-scroll-story');
      const stage = story?.querySelector<HTMLElement>('.process-story-stage');
      // A pinned stage's current position is not its original document position.
      const firstMediaTop = story && stage
        ? story.getBoundingClientRect().top + window.scrollY
          + media.getBoundingClientRect().top - stage.getBoundingClientRect().top
        : media.getBoundingClientRect().top + window.scrollY;
      entryStart.set(firstMediaTop - window.innerHeight - 96 - entryScrollDistance);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    // Expanded service cards above this range also move the film's entrance.
    observer.observe(document.body);
    const media = element.querySelector('.process-film');
    if (media) observer.observe(media);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [entryStart, reduced]);
  return <><motion.div className={`home-journey${reduced ? ' home-journey--static' : ''}`} style={reduced ? undefined : { backgroundColor, color }}>
    {services}
    <div className="delivery-range" ref={range}>
      <ProcessSection />
      <AboutSection />
    </div>
  </motion.div><Testimonials /></>;
}
