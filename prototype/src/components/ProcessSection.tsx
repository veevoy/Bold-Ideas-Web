import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react';
import { opticalCopy } from '../optical-content';
import { ProcessFilm, ProcessStill } from './ProcessFilm';
import { TextReveal } from './TextReveal';
import { useSiteMotion } from './SiteMotion';

const { steps, title } = opticalCopy.process;
const filmStart = .10;
const filmEnd = .94;
const finalFrame = 9.94;
const chapterTimes = [1.7, 4.5];
// Derive text boundaries from the same continuous mapping as the film.
const chapterStarts = [0, ...chapterTimes.map(time => filmStart + time / finalFrame * (filmEnd - filmStart))];
const subtitleOffset = 160;
const subtitleRevealDistance = 80;

function ScrollSubtitle({ text, index, active, progress, travel }: {
  text: string; index: number; active: boolean;
  progress: MotionValue<number>; travel: MotionValue<number>;
}) {
  const opacity = useTransform(() => Math.max(0, Math.min(1,
    ((progress.get() - chapterStarts[index]) * travel.get() - subtitleOffset) / subtitleRevealDistance,
  )));
  const y = useTransform(opacity, [0, 1], [8, 0]);
  return <motion.p className="process-story-subtitle" style={{
    opacity: active ? opacity : 0, y: active ? y : 8,
    visibility: active ? 'visible' : 'hidden',
  }}>{text}</motion.p>;
}

function StaticProcess() {
  return <div className="process-story-static">
    {steps.map((step, index) => <article className="process-story-still wrap" key={step.number}>
      <h3>{step.title}<span aria-hidden="true">.</span></h3>
      <p>{step.body}</p>
      <div className="process-story-still-media"><ProcessStill stage={index} /></div>
    </article>)}
  </div>;
}

function AnimatedProcess({ onError }: { onError: () => void }) {
  const section = useRef<HTMLDivElement>(null);
  const [{ index: chapter, visit }, setChapter] = useState({ index: 0, visit: 0 });
  const travel = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // Keep a constant film/scroll speed through all three chapters. Only the
  // opening and final frame hold; intermediate freezes caused stop/start motion.
  const filmTime = useTransform(scrollYProgress,
    [0, filmStart, filmEnd, 1],
    [0, 0, finalFrame, finalFrame]);
  const onFrame = useCallback((time: number) => {
    const index = time < chapterTimes[0] ? 0 : time < chapterTimes[1] ? 1 : 2;
    setChapter(current => current.index === index ? current : { index, visit: current.visit + 1 });
  }, []);

  useEffect(() => {
    const element = section.current;
    const stage = element?.querySelector<HTMLElement>('.process-story-stage');
    if (!element || !stage) return;
    const measure = () => travel.set(Math.max(1, element.offsetHeight - stage.offsetHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [travel]);

  return <div className="process-scroll-story" ref={section}>
    <ol className="process-story-readable">{steps.map(step => <li key={step.number}>
      <h3>{step.title}.</h3><p>{step.body}</p>
    </li>)}</ol>
    <div className="process-story-stage">
      <div className="process-story-copy wrap" aria-hidden="true">
        <div className="process-story-headings">
          {/* Match the reveal's word geometry and reserve every heading's height. */}
          {steps.map(step => <h3 className="process-story-measure text-reveal" key={step.number}>
            <span className="reveal-line">{`${step.title}.`.split(' ').map((word, index) => <Fragment key={index}>
              {index > 0 && ' '}<span className="reveal-word">{Array.from(word).map((character, i) => <span className="reveal-char" key={i}>{character}</span>)}</span>
            </Fragment>)}</span>
          </h3>)}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={visit} className="process-story-heading" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .18 }}>
              <TextReveal as="h3" id={`process-step-${chapter}`} lines={[`${steps[chapter].title}.`]} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="process-story-subtitles">
          {steps.map((step, index) => <ScrollSubtitle key={step.number} text={step.body} index={index}
            active={chapter === index} progress={scrollYProgress} travel={travel} />)}
        </div>
      </div>
      <div className="process-story-media wrap">
        <ProcessFilm time={filmTime} onFrame={onFrame} onError={onError} />
      </div>
    </div>
  </div>;
}

export function ProcessSection() {
  const { reduced } = useSiteMotion();
  const [failed, setFailed] = useState(false);
  return <section id="how-we-work" aria-labelledby="process-introduction">
    <div className="process-story-intro wrap"><h2 id="process-introduction">{title}</h2></div>
    {reduced || failed ? <StaticProcess /> : <AnimatedProcess onError={() => setFailed(true)} />}
  </section>;
}
