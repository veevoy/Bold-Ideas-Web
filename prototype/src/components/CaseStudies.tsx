import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionStyle } from 'motion/react';
import { caseStudies, type CaseStudy } from '../case-studies';
import { caseStudyHref } from '../case-study-model';
import { TextReveal } from './TextReveal';
import { useSiteMotion } from './SiteMotion';
import { CaseStudyThumbnail } from './CaseStudyThumbnail';

function Junction() {
  return <svg className="study-junction" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z" /></svg>;
}

function StudyRow({ study, index }: { study: CaseStudy; index: number }) {
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 901px) and (min-height: 521px)').matches);
  const [headlineActive, setHeadlineActive] = useState(false);
  const headlineTriggered = useRef(false);
  const row = useRef<HTMLDivElement>(null);
  const centre = useRef<HTMLDivElement>(null);
  const { reduced } = useSiteMotion();
  const animated = desktop && !reduced;
  const { scrollYProgress } = useScroll({ target: row, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [.15, .5, .85], [90, 0, -90]);
  const opacity = useTransform(scrollYProgress, [.29, .38, .62, .71], [0, 1, 1, 0]);
  const lineSpread = useTransform(scrollYProgress, [.15, .32, .61, .83], ['30px', '0px', '0px', '72px']);
  const nameY = useTransform(scrollYProgress, [.15, .32, .61, .83], [-18, 0, 0, -46]);
  const buttonY = useTransform(scrollYProgress, [.15, .32, .61, .83], [18, 0, 0, 46]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], [1.08, 1, 1.08]);
  const project = study.project;
  const id = project.slug;

  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px) and (min-height: 521px)');
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', progress => {
    if (!headlineTriggered.current && progress >= .29 && progress <= .71) {
      headlineTriggered.current = true;
      setHeadlineActive(true);
    }
  });

  useEffect(() => {
    const progress = scrollYProgress.get();
    if (progress >= .29 && progress <= .71) setHeadlineActive(true);
  }, [animated, scrollYProgress]);

  function revealFocusedTitle() {
    setHeadlineActive(true);
    if (!row.current || !centre.current) return;
    const bounds = row.current.getBoundingClientRect();
    const text = centre.current.getBoundingClientRect();
    // A tabbed-to control must remain visible within its row.
    if (text.top < bounds.top || text.bottom > bounds.bottom) {
      row.current.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }

  return <article className={`study ${index % 2 ? 'study-image-left' : 'study-image-right'}`} aria-labelledby={`study-${id}-name study-${id}-title`}>
    <div className="study-row" id={`case-${id}`} ref={row}>
      <div className="study-centre-window">
        <div className="study-scroll-track">
          <motion.div className="study-scroll-content" style={{ y: animated ? y : 0, opacity: animated ? opacity : 1, '--study-line-spread': animated ? lineSpread : '0px' } as MotionStyle}>
            <div className="study-centre-content" ref={centre}>
              <motion.p className="study-project-name" id={`study-${id}-name`} style={{ y: animated ? nameY : 0 }}>{project.name}</motion.p>
              <TextReveal as="h3" className="study-headline" id={`study-${id}-title`} lines={study.headline} active={animated ? headlineActive : undefined} />
              <motion.a
                className="study-read-more"
                href={caseStudyHref(project)}
                aria-label={`Read more about ${project.name}`}
                onFocus={revealFocusedTitle}
                style={{ y: animated ? buttonY : 0 }}
              ><span>Read more</span><ArrowUpRight size={19} aria-hidden="true" /></motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      <figure className="study-image">
        <CaseStudyThumbnail study={project} backgroundStyle={animated ? { y: imageY, scale: imageScale } : undefined} />
      </figure>
      <Junction />
    </div>

  </article>;
}

export function CaseStudies() {
  const { reduced } = useSiteMotion();
  return <section className={`case-studies${reduced ? ' case-studies-static' : ''}`} id="work" aria-labelledby="work-title">
    <div className="study-section-heading section-heading-with-link wrap"><TextReveal id="work-title" lines={['Case studies.']} /><a className="text-link" href="/case-studies">All case studies<ArrowUpRight size={19} aria-hidden="true" /></a></div>
    <div className="study-list">{caseStudies.map((study, index) => <StudyRow key={study.project.slug} study={study} index={index} />)}</div>
  </section>;
}
