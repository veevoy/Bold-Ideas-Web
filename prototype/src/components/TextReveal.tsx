import { Fragment, useLayoutEffect, useRef, type CSSProperties } from 'react';
import { useSiteMotion } from './SiteMotion';

/** Word masks preserve responsive wrapping; the accessible name stays unsplit. */
export function TextReveal({ lines, as: Heading = 'h2', id, className = '', accentLine, delay = 0, active }: {
  lines: readonly string[];
  as?: 'h1' | 'h2' | 'h3';
  id: string;
  className?: string;
  accentLine?: number;
  delay?: number;
  /** An explicit visibility gate for headings inside a scroll-clipped panel. */
  active?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const hasRevealed = useRef(false);
  const { reduced } = useSiteMotion();
  const text = lines.join(' ');

  useLayoutEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    if (reduced || !Element.prototype.animate) return;
    if (hasRevealed.current) return;
    const characters = [...heading.querySelectorAll<HTMLElement>('.reveal-char')];
    const stagger = Math.min(15, 420 / Math.max(1, characters.length - 1));
    const animations: Animation[] = [];
    let observer: IntersectionObserver | undefined;
    const finish = () => {
      heading.dataset.reveal = 'complete';
      animations.forEach(animation => animation.cancel());
    };
    const reveal = () => {
      if (hasRevealed.current) return;
      hasRevealed.current = true;
      observer?.disconnect();
      try {
        // Allocate animation layers only for the heading entering the viewport.
        // Avoid retaining hundreds of paused, fill-both effects offscreen.
        for (const [index, character] of characters.entries()) {
          animations.push(character.animate(
            [{ transform: 'translateY(115%)' }, { transform: 'translateY(0)' }],
            { duration: Heading === 'h1' ? 900 : 760, delay: delay + index * stagger, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
          ));
        }
        heading.dataset.reveal = 'revealing';
        void Promise.all(animations.map(animation => animation.finished)).then(finish)
          .catch(() => { /* Cleanup restores the readable default state. */ });
      } catch { finish(); }
    };
    try {
      heading.dataset.reveal = 'waiting';
      if (active !== undefined) {
        if (active) reveal();
      } else if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) reveal();
        }, { threshold: 0.12 });
        observer.observe(heading);
      } else reveal();
    } catch {
      animations.forEach(animation => animation.cancel());
      delete heading.dataset.reveal;
    }
    return () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      delete heading.dataset.reveal;
    };
  }, [Heading, delay, reduced, text, active]);

  return <Heading ref={ref} id={id} className={`text-reveal ${className}`} aria-label={text}>
    {lines.map((line, index) => <Fragment key={index}>
      {index > 0 && ' '}
      <span aria-hidden="true" className={`reveal-line${index === accentLine ? ' reveal-accent' : ''}`} style={{ '--reveal-line-index': index - (lines.length - 1) / 2 } as CSSProperties}>
        {line.split(' ').map((word, wordIndex) => <Fragment key={wordIndex}>
          {wordIndex > 0 && ' '}
          <span className="reveal-word">{Array.from(word).map((character, characterIndex) => <span className="reveal-char" key={characterIndex}>{character}</span>)}</span>
        </Fragment>)}
      </span>
    </Fragment>)}
  </Heading>;
}
