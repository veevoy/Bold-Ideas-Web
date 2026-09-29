import { useLayoutEffect, useRef, useState } from 'react';
import type { NavigationVariant } from '../navigation-preview';

/** Sample the actual section beneath the header, including the animated journey ground.
 * Photo sections declare a tone; solid sections inherit their nearest painted ancestor.
 * No pixel sampling, video readback or continuously running animation loop is needed.
 */
export function useNavigationSurface(variant: NavigationVariant, home: boolean) {
  const header = useRef<HTMLElement>(null);
  const [state, setState] = useState({ dark: home, expanded: home });
  useLayoutEffect(() => {
    let frame = 0;
    let disposed = false;
    let lastGround = '';
    const measure = () => {
      frame = 0;
      if (!header.current || disposed) return;
      const box = header.current.getBoundingClientRect();
      const surface = document.elementsFromPoint(window.innerWidth / 2, box.top + Math.min(box.height, 62) / 2)
        .find(element => !header.current!.contains(element) && !element.closest('.skip-link'));
      let dark = false;
      let ground = '#f8f3ec';
      let element = surface;
      const explicit = surface?.closest<HTMLElement>('[data-nav-tone]');
      while (element) {
        const background = getComputedStyle(element).backgroundColor;
        const channels = background.match(/[\d.]+/g)?.map(Number);
        if (channels && channels.length >= 3 && (channels[3] ?? 1) > .8) {
          ground = background;
          const rgb = channels.slice(0, 3).map(channel => {
            const value = channel / 255;
            return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
          });
          dark = rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722 < .35;
          break;
        }
        element = element.parentElement ?? undefined;
      }
      if (explicit) {
        dark = explicit.dataset.navTone === 'dark';
        // Photographic backgrounds have no solid computed colour to sample.
        if (dark) ground = '#173438';
      }
      if (ground !== lastGround) {
        document.documentElement.style.setProperty('--viewport-surface', ground);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', ground);
        lastGround = ground;
      }
      setState(previous => {
        // Hysteresis avoids chattering at the entrance threshold with tiny scroll changes.
        const expanded = home && window.scrollY < (previous.expanded ? 96 : 32);
        return previous.dark === dark && previous.expanded === expanded ? previous : { dark, expanded };
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('resize', schedule);
    // Content expansion, font loading and motion-mode changes can move a section under us.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    void document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('resize', schedule);
    };
  }, [variant, home]);
  return { header, ...state };
}
