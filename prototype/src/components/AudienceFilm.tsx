import { useEffect, useRef, useState } from 'react';
import { responsiveImage } from '../responsive-images';

type AudienceFilmProps = {
  id: string;
  selected: boolean;
  near: boolean;
  visible: boolean;
  reduced: boolean;
};

/** Decorative stock footage: only the selected, visible clip plays. */
export function AudienceFilm({ id, selected, near, visible, reduced }: AudienceFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const poster = `/images/audiences/${id}.jpg`;

  useEffect(() => {
    if (near && selected && !reduced) setRequested(true);
  }, [near, selected, reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !requested || failed) return;
    let mounted = true;
    const sync = () => {
      if (!mounted || !selected || !visible || reduced || document.hidden) {
        video.pause();
        return;
      }
      void video.play().then(() => {
        if (!mounted || document.hidden) video.pause();
      }).catch(() => { /* The poster remains when autoplay is unavailable. */ });
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      mounted = false;
      video.pause();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [requested, selected, visible, reduced, failed]);

  return <div className={`audience-film${selected ? ' is-selected' : ''}`}>
    <img src={near ? poster : undefined} {...near ? responsiveImage(poster, '100vw') : {}} alt="" width="1280" height="720" decoding="async" />
    {requested && !reduced && !failed && <video
      ref={videoRef}
      src={`/video/audiences/${id}.mp4`}
      poster={poster}
      className={ready ? 'is-ready' : ''}
      muted loop playsInline preload="none" tabIndex={-1} disablePictureInPicture
      onPlaying={() => setReady(true)}
      onError={() => { setFailed(true); setReady(false); }}
    />}
  </div>;
}
