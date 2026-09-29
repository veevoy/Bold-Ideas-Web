import { useEffect, useRef, useState, type RefObject } from 'react';
import { useSiteMotion } from './SiteMotion';
import { responsiveImage } from '../responsive-images';

const poster = '/images/footer-studio-poster.jpg';

/** Play only when the exposed media window is visible, not while the footer
 * panel still covers the sticky underlay. Motion-off and errors keep a still. */
export function FooterFilm({ exposure }: { exposure: RefObject<HTMLDivElement | null> }) {
  const video = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const { reduced } = useSiteMotion();

  useEffect(() => {
    const target = exposure.current;
    if (!target) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, [exposure]);

  useEffect(() => {
    const element = video.current;
    const target = exposure.current;
    if (!element || !target || reduced || failed) return;
    let visible = false;
    let active = true;
    const syncPlayback = () => {
      if (!active || !visible || document.hidden) {
        element.pause();
        return;
      }
      void element.play().then(() => {
        if (!active || !visible || document.hidden) element.pause();
      }).catch(() => { /* The poster remains if autoplay is unavailable. */ });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(target);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      element.pause();
    };
  }, [exposure, load, reduced, failed]);

  return <>
    <img src={poster} {...responsiveImage(poster, '100vw')} width="1920" height="1080" alt="" loading="lazy" decoding="async" />
    {load && !reduced && !failed && <video ref={video} src="/video/footer-studio.mp4"
      width="1920" height="1080" poster={poster} muted loop playsInline preload="auto"
      tabIndex={-1} disablePictureInPicture onError={() => setFailed(true)} />}
  </>;
}
