/** Paused media follows scroll; only a completed seek advances the copy. */
export function attachScrollVideo(
  element: HTMLVideoElement,
  time: { get(): number; on(event: 'change', callback: () => void): () => void },
  onFrame: (time: number) => void,
) {
  let frame = 0;
  let visible = false;
  let active = true;
  const seek = () => {
    frame = 0;
    // Safari can stop at HAVE_METADATA until a seek requests a frame. Waiting
    // for HAVE_CURRENT_DATA here prevents that first request from ever starting.
    if (!active || !visible || document.hidden || element.seeking || element.readyState < 1 || !Number.isFinite(element.duration)) return;
    const target = Math.max(0, Math.min(time.get(), element.duration - .05));
    if (Math.abs(element.currentTime - target) > .025) element.currentTime = target;
  };
  const schedule = () => { if (active && !frame) frame = requestAnimationFrame(seek); };
  const decoded = () => { onFrame(element.currentTime); schedule(); };
  const unsubscribe = time.on('change', schedule);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
  });
  observer.observe(element);
  element.addEventListener('loadedmetadata', schedule);
  element.addEventListener('canplay', schedule);
  element.addEventListener('loadeddata', decoded);
  element.addEventListener('seeked', decoded);
  document.addEventListener('visibilitychange', schedule);
  schedule();
  return () => {
    active = false;
    cancelAnimationFrame(frame);
    unsubscribe();
    observer.disconnect();
    element.removeEventListener('loadedmetadata', schedule);
    element.removeEventListener('canplay', schedule);
    element.removeEventListener('loadeddata', decoded);
    element.removeEventListener('seeked', decoded);
    document.removeEventListener('visibilitychange', schedule);
  };
}
