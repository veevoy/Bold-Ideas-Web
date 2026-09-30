import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'motion/react';
import { attachScrollVideo } from '../scroll-video';
import { useScrollVideoSource } from './useScrollVideoSource';
import { responsiveImage, posterImage, gallerySizes } from '../responsive-images';
import { MobileScrollSequence } from './MobileScrollSequence';
import sequences from '../content/scroll-sequences.json';

const posters = ['/images/bridge-4k-opening.webp', '/images/bridge-4k-options.webp', '/images/bridge-4k-complete.webp'];

export function ProcessStill({ stage }: { stage: number }) {
  return <div className="process-film" aria-hidden="true">
    <img src={posters[stage]} {...responsiveImage(posters[stage], gallerySizes)} width="1920" height="1080" loading="lazy" decoding="async" alt="" />
  </div>;
}

/** The user-supplied bridge film follows scroll in both directions. It never
 * plays on a clock. Load near the section and seek only while it is visible. */
export function ProcessFilm({ time, onFrame, onError }: {
  time: MotionValue<number>; onFrame: (time: number) => void; onError: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const source = useScrollVideoSource('/video/collaboration-bridge-scroll-4k.mp4', '/video/collaboration-bridge-scroll-mobile.mp4');
  const mobile = source.includes('-mobile');

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [source]);

  useEffect(() => {
    const element = video.current;
    if (!element || !load) return;
    return attachScrollVideo(element, time, onFrame);
  }, [load, source, time, onFrame]);

  return <div className="process-film" aria-hidden="true">
    {mobile ? <MobileScrollSequence sequence={sequences.bridge} poster={posterImage(posters[0], 960)} time={time} onFrame={onFrame} onError={onError} />
      : <video ref={video} src={load ? source : undefined}
        poster={posterImage(posters[0], 1920)} width="3840" height="2160" muted playsInline
        preload={load ? 'auto' : 'none'} tabIndex={-1} disablePictureInPicture onError={onError} />}
  </div>;
}
