import { useRef, useState, type RefObject } from 'react';
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useSiteMotion } from './SiteMotion';
import { AudienceFilm } from './AudienceFilm';

// Original labels: docs/content-source-2026-09-22.txt.
// Temporary stock footage provenance: docs/assets.json.
const audiences = [
  { name: 'charities', film: 'charities', introduction: 'Your mission comes first. We help you build the technology to reach more people.' },
  { name: 'climate solutions', film: 'climate-canyon', introduction: 'You’re working towards a better future. We help turn your climate ideas into practical products.' },
  { name: 'wellbeing solutions', film: 'wellbeing-motion', introduction: 'You’re focused on helping people feel better. We help turn your wellbeing ideas into thoughtful, reliable products.' },
  { name: 'innovators', film: 'innovators-conference', introduction: 'You see what could be better. We help turn your next bold idea into a working product.' },
] as const;
const readingStops = [.05, .3, .55, .8];
const starPath = 'M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z';
const wordMotion = {
  enter: (direction: number) => ({ y: `${direction * 65}%`, rotate: direction * 3, opacity: 0 }),
  visible: { y: '0%', rotate: 0, opacity: 1 },
  leave: (direction: number) => ({ y: `${direction * -55}%`, rotate: direction * -3, opacity: 0, transition: { duration: .16 } }),
};

type StageProps = {
  active: number;
  direction: number;
  stageRef: RefObject<HTMLDivElement | null>;
  onSelect: (index: number) => void;
  markerLeft?: MotionValue<string>;
  markerRotate?: MotionValue<number>;
};

function AudienceStage({ active, direction, stageRef, onSelect, markerLeft, markerRotate }: StageProps) {
  const { reduced } = useSiteMotion();
  const near = useInView(stageRef, { margin: '400px', once: true });
  const visible = useInView(stageRef, { amount: .05 });
  const phrase = <>For {audiences[active].name}<span className="audience-period">.</span></>;

  return <div className="audience-stage" data-nav-tone="dark" ref={stageRef}>
    <div className="audience-backdrops" aria-hidden="true">
      {audiences.map((audience, index) => <AudienceFilm key={audience.film} id={audience.film} selected={active === index} near={near} visible={visible} reduced={reduced} />)}
    </div>
    <div className="audience-content wrap">
      <h2 className="audience-heading" id="audience-title" aria-label="For charities, climate solutions, wellbeing solutions and innovators.">
        <span className="audience-word-window" aria-hidden="true">
          <span className="audience-word-measure">For wellbeing solutions.</span>
          {reduced ? <span className="audience-word">{phrase}</span> : <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.span className="audience-word" key={active} custom={direction} variants={wordMotion} initial="enter" animate="visible" exit="leave" transition={{ duration: .48, ease: [.16, 1, .3, 1] }}>
              {phrase}
            </motion.span>
          </AnimatePresence>}
        </span>
      </h2>
      <div className="audience-introductions" aria-live="polite" aria-atomic="true">
        {audiences.map((audience, index) => <p key={audience.film} className={`audience-introduction${active === index ? ' is-selected' : ''}`} aria-hidden={active !== index}>{audience.introduction}</p>)}
      </div>
    </div>
    <div className="audience-index">
      <div className="wrap">
        <div className="audience-index-items" role="group" aria-label="Who we work with">
          <motion.svg className="audience-marker" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
            style={markerLeft ? { left: markerLeft, rotate: markerRotate } : undefined}
            animate={markerLeft ? undefined : { left: `${12.5 + active * 25}%`, rotate: active * 45 }}
            transition={{ duration: reduced ? 0 : .45, ease: [.16, 1, .3, 1] }}><path d={starPath} /></motion.svg>
          {audiences.map(({ name }, index) => <button key={name} type="button" aria-pressed={active === index} onClick={() => onSelect(index)}>{name[0].toUpperCase() + name.slice(1)}</button>)}
        </div>
      </div>
    </div>
  </div>;
}

function ScrollAudiences() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = useRef(0);
  const direction = useRef(1);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // Finish each text turn even when scrolling stops between two reading holds.
  const position = useTransform(scrollYProgress, [0, .1, .25, .35, .5, .6, .75, 1], [0, 0, 1, 1, 2, 2, 3, 3]);
  const markerLeft = useTransform(position, value => `${12.5 + value * 25}%`);
  const markerRotate = useTransform(position, [0, 3], [0, 135]);
  useMotionValueEvent(position, 'change', value => {
    const next = Math.round(value);
    if (next === current.current) return;
    direction.current = next > current.current ? 1 : -1;
    current.current = next;
    setActive(next);
  });
  const goToAudience = (index: number) => {
    if (!section.current || !stage.current) return;
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const travel = section.current.offsetHeight - stage.current.offsetHeight;
    window.scrollTo({ top: top + travel * readingStops[index], behavior: 'smooth' });
  };
  return <section className="audience-section" id="who-we-work-with" ref={section} aria-labelledby="audience-title">
    <AudienceStage active={active} direction={direction.current} stageRef={stage} onSelect={goToAudience} markerLeft={markerLeft} markerRotate={markerRotate} />
  </section>;
}

function CompactAudiences() {
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const direction = useRef(1);
  const select = (index: number) => {
    direction.current = index > active ? 1 : -1;
    setActive(index);
  };
  return <section className="audience-section audience-section--compact" id="who-we-work-with" aria-labelledby="audience-title">
    <AudienceStage active={active} direction={direction.current} stageRef={stage} onSelect={select} />
  </section>;
}

export function Audiences() {
  const { reduced } = useSiteMotion();
  return reduced ? <CompactAudiences /> : <ScrollAudiences />;
}
