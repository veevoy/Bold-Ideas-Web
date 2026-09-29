import { createElement, useLayoutEffect, useRef, type ReactNode } from 'react';
import { useSiteMotion } from './SiteMotion';

/** Quiet supporting entrance after a headline. Content stays visible without animation
 * support, and keyboard focus immediately completes the reveal. Each group plays once.
 */
export function ContentReveal({ children, className, as = 'div', delay = 100, stagger = 0 }: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'p' | 'li' | 'figure';
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const revealed = useRef(false);
  const { reduced } = useSiteMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || revealed.current) return;
    if (reduced || !Element.prototype.animate) {
      revealed.current = true;
      return;
    }

    const items = stagger ? Array.from(element.children) : [element];
    const animations: Animation[] = [];
    let observer: IntersectionObserver | undefined;
    const finish = () => {
      revealed.current = true;
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      element.dataset.contentReveal = 'complete';
    };
    const reveal = () => {
      if (revealed.current) return;
      revealed.current = true;
      observer?.disconnect();
      try {
        items.forEach((item, index) => {
          animations.push(item.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], {
            duration: 720,
            delay: delay + Math.min(index * stagger, 240),
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both',
          }));
        });
        element.dataset.contentReveal = 'revealing';
        void Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {
          // Cancellation restores the unanimated, fully visible content.
        });
      } catch { finish(); }
    };

    try {
      element.dataset.contentReveal = 'waiting';
      element.addEventListener('focusin', finish);
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) reveal();
        }, { threshold: .08 });
        observer.observe(element);
      } else reveal();
    } catch {
      finish();
    }

    return () => {
      observer?.disconnect();
      element.removeEventListener('focusin', finish);
      animations.forEach(animation => animation.cancel());
      delete element.dataset.contentReveal;
    };
  }, [delay, reduced, stagger]);

  return createElement(as, { ref, className }, children);
}
