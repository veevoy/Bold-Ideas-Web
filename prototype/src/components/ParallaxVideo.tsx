import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useSiteMotion } from './SiteMotion';
import { responsiveImage } from '../responsive-images';

type ParallaxVideoProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  className?: string;
  priority?: boolean;
};

/** Decorative background. The parent provides position: relative and its own scrim.
 * Overscan covers the complete scroll travel without revealing an empty edge.
 */
export function ParallaxVideo({ src, mobileSrc, poster, className = '', priority = false }: ParallaxVideoProps) {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reduced } = useSiteMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const video = videoRef.current;
    const element = container.current;
    if (!video || !element) return;
    let inView = false;
    let active = true;
    const syncPlayback = () => {
      if (!active || reduced || !inView || document.hidden) {
        video.pause();
        return;
      }
      void video.play().then(() => {
        if (!active || document.hidden || !inView) video.pause();
      }).catch(() => { /* Keep the poster if the browser blocks autoplay. */ });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [reduced, src]);

  return <div ref={container} className={`parallax-video ${className}`} aria-hidden="true">
    <motion.div className="parallax-video-media" style={{ y: reduced ? 0 : y }}>
      <img src={poster} {...responsiveImage(poster, '100vw')} alt="" width="1920" height="1080" fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      <video ref={videoRef} muted loop playsInline preload={reduced ? 'none' : 'metadata'} poster={poster} tabIndex={-1} disablePictureInPicture>
        {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 699px)" />}
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  </div>;
}
