import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useSiteMotion } from './SiteMotion';
import { TextReveal } from './TextReveal';
import { whyCopy } from '../why-content';
import { attachScrollVideo } from '../scroll-video';
import { useScrollVideoSource } from './useScrollVideoSource';
import { responsiveImage, posterImage, gallerySizes } from '../responsive-images';

const chapters = [
  { text: whyCopy.title, notes: [whyCopy.ideaLead, whyCopy.ideaFit], poster: '/images/bold-story-4k-opening.webp' },
  { text: whyCopy.concern, notes: [whyCopy.apparentReadiness, whyCopy.risk], poster: '/images/bold-story-4k-impact.webp' },
  { text: whyCopy.lasting, notes: [whyCopy.promise, whyCopy.conviction], poster: '/images/bold-story-4k-built.webp' },
] as const;

// Chapter boundaries share the same mapping as the film below. Note offsets
// are CSS pixels travelled after each boundary, not elapsed reading time.
const chapterStarts = [0, .30, .65 + (10.7 - 10.4) / (14.6 - 10.4) * .30];
const noteOffsets = [160, 340];
const noteFadeDistance = 80;

function ScrollNote({ text, index, side, active, progress, travel }: {
  text: string; index: number; side: number; active: boolean;
  progress: MotionValue<number>; travel: MotionValue<number>;
}) {
  const opacity = useTransform(() => Math.max(0, Math.min(1,
    ((progress.get() - chapterStarts[index]) * travel.get() - noteOffsets[side]) / noteFadeDistance,
  )));
  const y = useTransform(opacity, [0, 1], [6, 0]);
  return <motion.p className={active ? 'is-active' : undefined}
    style={{ opacity: active ? opacity : 0, y: active ? y : 6, visibility: active ? 'visible' : 'hidden' }}>{text}</motion.p>;
}

function StaticStory() {
  return <section className="bold-story-static" id="perspective" aria-label="Why be bold">
    {chapters.map(chapter => <article className="bold-story-still wrap" key={chapter.poster}>
      <h2>{chapter.text}</h2>
      <div className="bold-story-still-media">
        <img src={chapter.poster} {...responsiveImage(chapter.poster, gallerySizes)} width="1920" height="1080" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="bold-story-still-notes">{chapter.notes.map(note => <p key={note}>{note}</p>)}</div>
    </article>)}
  </section>;
}

/** One continuous scroll-driven film, with start/end reading holds. */
function AnimatedStory({ onError }: { onError: () => void }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const source = useScrollVideoSource('/video/bold-story-scroll-4k.mp4', '/video/bold-story-scroll-mobile.mp4');
  const [{ index: chapter, visit }, setChapter] = useState({ index: 0, visit: 0 });
  const travel = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // Start with the whole plane visible, then retain the complete source ending
  // including the balls' rebounds. All times are relative to source +0.4s.
  const filmTime = useTransform(scrollYProgress, [0, .07, .30, .56, .65, .95, 1], [0, 0, 3.6, 9.1, 10.4, 14.6, 14.6]);

  useEffect(() => {
    const element = section.current;
    const stage = element?.querySelector<HTMLElement>('.bold-story-stage');
    if (!element || !stage) return;
    const measure = () => travel.set(Math.max(1, element.offsetHeight - stage.offsetHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [travel]);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '700px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element || !load) return;
    return attachScrollVideo(element, filmTime, decodedTime => {
      // Keep headings in sync with decoded frames, including reverse scrolling.
      const index = decodedTime < 3.6 ? 0 : decodedTime < 10.7 ? 1 : 2;
      setChapter(current => current.index === index ? current : { index, visit: current.visit + 1 });
    });
  }, [filmTime, load, source]);

  return <section className="bold-scroll-story" id="perspective" ref={section} aria-label="Why be bold">
    <ol className="bold-story-readable">{chapters.map(item => <li key={item.text}><h2>{item.text}</h2>{item.notes.map(note => <p key={note}>{note}</p>)}</li>)}</ol>
    <div className="bold-story-stage">
      <div className="bold-story-copy wrap" aria-hidden="true">
        {/* Reserve the longest claim with exactly the same word/letter geometry.
            The film keeps its size and position as chapters change. */}
        {chapters.map(item => <div className="bold-story-claim bold-story-measure" key={item.text}>
          <h2 className="text-reveal"><span className="reveal-line">
            {item.text.split(' ').map((word, index) => <Fragment key={index}>
              {index > 0 && ' '}<span className="reveal-word">{Array.from(word).map((character, characterIndex) => <span className="reveal-char" key={characterIndex}>{character}</span>)}</span>
            </Fragment>)}
          </span></h2>
        </div>)}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={visit} className="bold-story-claim" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .18 }}>
            <TextReveal id={`bold-story-claim-${chapter}`} lines={[chapters[chapter].text]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="bold-story-scene wrap" aria-hidden="true">
        <div className="bold-story-media">
          <video ref={video} src={load ? source : undefined} poster={posterImage(chapters[0].poster, source.includes('-mobile') ? 960 : 1920)} width="3840" height="2160" muted playsInline preload={load ? 'auto' : 'none'} tabIndex={-1} disablePictureInPicture onError={onError} />
        </div>
        {[0, 1].map(side => <div className={`bold-story-note bold-story-note-${side}`} key={side}>
          {/* Stacked notes reserve the longest text, so the film never jumps. */}
          {chapters.map((item, index) => <ScrollNote key={item.text} text={item.notes[side]} index={index} side={side} active={chapter === index} progress={scrollYProgress} travel={travel} />)}
        </div>)}
      </div>
    </div>
  </section>;
}

export function BoldScrollStory() {
  const { reduced } = useSiteMotion();
  const [failed, setFailed] = useState(false);
  return reduced || failed ? <StaticStory /> : <AnimatedStory onError={() => setFailed(true)} />;
}
