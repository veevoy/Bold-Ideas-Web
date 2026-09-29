import { createRef, Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode, type RefObject } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BOOKING_URL, needs, services, type Need, type Service } from '../content';
import { Disclosure } from './Disclosure';
import { useSiteMotion } from './SiteMotion';
import { TextReveal } from './TextReveal';
import { BrandList } from './BrandList';

export type ServiceFinderProps = {
  openServices: Set<string>;
  onServiceToggle: (id: string, open: boolean) => void;
  activeServiceId?: string;
};

export const needCopy: Record<string, { label: string; lines: string[]; body: string }> = {
  build: {
    label: 'I have an idea', lines: ['I have', 'an idea'],
    body: 'Your idea needs a real first version fast — a version that lets you onboard users or pitch to the board.',
  },
  leadership: {
    label: 'I need a tech lead', lines: ['I need', 'a tech lead'],
    body: 'As your strategic tech partner, we make sure your bold ideas are backed by tech that fits.',
  },
  ai: {
    label: 'I want to use AI', lines: ['I want', 'to use AI'],
    body: 'Automation is one of the best ways to see AI make a difference in your everyday operations.',
  },
  finish: {
    label: 'I need to get it live', lines: ['I need to', 'get it live'],
    body: "You've got a live product that won't scale, keeps breaking, or needs constant changes.",
  },
};

export function ServiceScope({ service, headingAs: Heading = 'h5', outcomeMedia }: { service: Service; headingAs?: 'h4' | 'h5'; outcomeMedia?: ReactNode }) {
  return <div className="package-scope">
    <dl className="package-facts">
      <div><dt>Who it’s for</dt><dd>{service.audience}</dd></div>
      <div className="package-outcome"><dt>What you get</dt><dd>{service.outcome}{outcomeMedia}</dd></div>
      <div><dt>What’s included</dt><dd><BrandList className="package-inclusions" items={service.scope.split(/(?<=\.)\s+(?=[A-Z])/)} /></dd></div>
    </dl>
    {service.tiers && <div className="package-options"><Heading>Ways to work together</Heading><dl className="package-tiers">
      {service.tiers.map(tier => <div key={tier.name}><dt>{tier.name}</dt><dd>{tier.price}</dd></div>)}
    </dl></div>}
    <a className="package-booking" href={BOOKING_URL}>
      <span>Book Strategy Session</span><ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" />
    </a>
  </div>;
}

type Anchor = RefObject<HTMLDivElement | null>;

/** A sticky card's live position is not its natural scroll destination. */
function visitCard(anchor: Anchor, reduced: boolean, focusId?: string) {
  if (!anchor.current) return;
  window.scrollTo({ top: window.scrollY + anchor.current.getBoundingClientRect().top - 112, behavior: reduced ? 'instant' : 'smooth' });
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
}

function NeedCard({ need, index, anchor, nextAnchor, openServices, onServiceToggle, reading, onServiceExit }: {
  need: Need; index: number; anchor: Anchor; nextAnchor?: Anchor;
  reading: boolean; onServiceExit: (id: string) => void;
} & Omit<ServiceFinderProps, 'activeServiceId'>) {
  const cardRef = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const { reduced } = useSiteMotion();
  const { scrollYProgress } = useScroll({ target: nextAnchor || anchor, offset: ['start end', 'start start'] });
  const scale = useTransform(scrollYProgress, [.12, .9], [1, .955]);
  const copy = needCopy[need.id];
  const expanded = need.services.some(service => openServices.has(service.id));

  useLayoutEffect(() => {
    const card = cardRef.current;
    const surface = surfaceRef.current;
    if (!card || !surface) return;
    // Long open scopes stick only after their bottom is reached: no trapped content.
    const resize = () => card.style.setProperty('--stack-top', `${Math.min(104 + index * 20, window.innerHeight - surface.offsetHeight - 28)}px`);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    window.addEventListener('resize', resize);
    return () => { observer.disconnect(); window.removeEventListener('resize', resize); };
  }, [index]);

  function exposeKeyboardFocus(event: FocusEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (!target.matches(':focus-visible')) return;
    const rect = target.getBoundingClientRect();
    const hit = document.elementFromPoint(Math.max(0, Math.min(window.innerWidth - 1, rect.left + rect.width / 2)), Math.max(0, Math.min(window.innerHeight - 1, rect.top + rect.height / 2)));
    if (rect.top < 100 || rect.bottom > window.innerHeight || !hit || !target.contains(hit)) {
      visitCard(anchor, true);
      requestAnimationFrame(() => target.scrollIntoView({ block: 'nearest', behavior: 'instant' }));
    }
  }

  return <article
    ref={cardRef} id={`need-${need.id}`}
    className={`need-card need-card--${need.id}${expanded ? ' has-open-package' : ''}`}
    style={{ '--stack-index': index } as CSSProperties}
    aria-labelledby={`need-${need.id}-title`} onFocusCapture={exposeKeyboardFocus}
  >
    <motion.div ref={surfaceRef} className="need-card__surface" style={{ scale: reduced || !nextAnchor || reading ? 1 : scale }}>
      <div className="need-card__lead">
        <TextReveal as="h3" id={`need-${need.id}-title`} lines={copy.lines} className="need-card__title" />
        <p className="need-card__description">{copy.body}</p>
      </div>
      <div className="need-card__packages">
        {need.services.map(link => {
          const service = services.find(item => item.id === link.id);
          if (!service) return null;
          return <Disclosure
            key={service.id} id={service.id} headingAs="h4" className="package-offer"
            open={openServices.has(service.id)} onOpenChange={open => onServiceToggle(service.id, open)}
            onExitComplete={() => onServiceExit(service.id)}
            title={<span className="package-summary">
              <span className="package-name">{service.name}</span>
              <span className="package-tagline">{service.tagline}</span>
              <span className="package-commercial"><span><span className="package-commercial-label">Investment</span>{service.price}</span><span><span className="package-commercial-label">Timing</span>{service.duration}</span></span>
            </span>}
          ><ServiceScope service={service} /></Disclosure>;
        })}
        {need.id === 'finish' && <p className="package-qualification">Diagnosis and audit fees cover those stages. Further implementation is agreed separately.</p>}
      </div>
    </motion.div>
  </article>;
}

export function ServiceFinder({ openServices, onServiceToggle, activeServiceId }: ServiceFinderProps) {
  const anchors = useMemo(() => needs.map(() => createRef<HTMLDivElement>()), []);
  const [closingServices, setClosingServices] = useState<Set<string>>(new Set());
  const reading = openServices.size > 0 || closingServices.size > 0;
  const pendingPosition = useRef<{ id: string; top: number } | null>(null);

  function rememberTrigger(id: string) {
    const trigger = document.getElementById(`${id}-trigger`);
    if (trigger) pendingPosition.current = { id, top: trigger.getBoundingClientRect().top };
  }

  function toggleService(id: string, open: boolean) {
    rememberTrigger(id);
    setClosingServices(current => {
      const next = new Set(current);
      if (open) next.delete(id); else next.add(id);
      return next;
    });
    onServiceToggle(id, open);
  }

  function finishClosing(id: string) {
    // Keep the whole deck in normal flow until the last exit has finished.
    // Re-enabling sticky cards halfway through collapse can cover the trigger.
    if (!openServices.size && closingServices.size === 1 && closingServices.has(id)) rememberTrigger(id);
    setClosingServices(current => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  useLayoutEffect(() => {
    const position = pendingPosition.current;
    pendingPosition.current = null;
    if (!position) return;
    const trigger = document.getElementById(`${position.id}-trigger`);
    if (trigger) window.scrollBy({ top: trigger.getBoundingClientRect().top - position.top, behavior: 'instant' });
  }, [openServices, reading, closingServices]);

  useEffect(() => {
    if (!activeServiceId) return;
    const index = needs.findIndex(need => need.services.some(service => service.id === activeServiceId));
    if (index !== -1) visitCard(anchors[index], true);
  }, [activeServiceId, anchors]);

  useEffect(() => {
    const followNeedHash = () => {
      const index = needs.findIndex(need => window.location.hash === `#need-${need.id}`);
      if (index !== -1) visitCard(anchors[index], true);
    };
    followNeedHash();
    window.addEventListener('hashchange', followNeedHash);
    return () => window.removeEventListener('hashchange', followNeedHash);
  }, [anchors]);

  return <div className={`service-stack${reading ? ' service-stack--reading' : ''}`}>
    <div className="service-stack__deck">
      {needs.map((need, index) => <Fragment key={need.id}>
        <div ref={anchors[index]} className="service-stack__anchor" aria-hidden="true" />
        <NeedCard need={need} index={index} anchor={anchors[index]} nextAnchor={anchors[index + 1]} openServices={openServices} onServiceToggle={toggleService} reading={reading} onServiceExit={finishClosing} />
      </Fragment>)}
    </div>
  </div>;
}
