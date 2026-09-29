import { useLayoutEffect, type RefObject } from 'react';
import { useSiteMotion } from './SiteMotion';

/** Small, once-only editorial entrances. The unanimated DOM is always readable. */
export function usePageEntrance(root: RefObject<HTMLElement | null>) {
  const { reduced } = useSiteMotion();
  useLayoutEffect(() => {
    const page = root.current;
    if (!page || reduced || !Element.prototype.animate || !('IntersectionObserver' in window)) return;
    const running = new Map<Element, Animation>();
    const finish = (element: Element) => {
      running.get(element)?.cancel();
      running.delete(element);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (element.contains(document.activeElement)) continue;
        const media = element.dataset.entrance === 'media';
        try {
          const animation = element.animate(media ? [
            { clipPath: 'inset(0 0 10% 0)', opacity: .65 },
            { clipPath: 'inset(0 0 0% 0)', opacity: 1 },
          ] : [
            { opacity: .45, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], {
            duration: media ? 700 : 520,
            delay: Math.min(Number(element.dataset.entranceOrder ?? 0) * 70, 210),
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'both',
          });
          running.set(element, animation);
          void animation.finished.then(() => finish(element)).catch(() => { /* Cancellation restores the visible default. */ });
        } catch { finish(element); }
      }
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    page.querySelectorAll('[data-entrance], .service-index-offers > .package-offer').forEach(element => observer.observe(element));
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      for (const element of running.keys()) if (element.contains(event.target)) finish(element);
    };
    page.addEventListener('focusin', onFocus);
    return () => {
      observer.disconnect();
      page.removeEventListener('focusin', onFocus);
      running.forEach(animation => animation.cancel());
    };
  }, [root, reduced]);
}
