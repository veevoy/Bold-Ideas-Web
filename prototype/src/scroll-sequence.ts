export interface ScrollSequence {
  width: number;
  height: number;
  fps: number;
  columns: number;
  framesPerSheet: number;
  frameCount: number;
  sheets: string[];
}

/** Mobile scroll rendering uses ordinary decoded images, not a seeking video
 * layer. Never clear the canvas: the last good frame stays until its replacement
 * is ready. At most two sheets download at once and three stay decoded. */
export function attachScrollSequence(
  canvas: HTMLCanvasElement,
  sequence: ScrollSequence,
  time: { get(): number; on(event: 'change', callback: () => void): () => void },
  onFrame: (time: number) => void,
  onError: () => void,
) {
  const context = canvas.getContext('2d');
  if (!context) { onError(); return () => {}; }
  const cache = new Map<number, HTMLImageElement>();
  const pending = new Map<number, HTMLImageElement>();
  const failed = new Set<number>();
  let alive = true, visible = false, raf = 0, painted = -1, previousSheet = 0, direction = 1;
  const targetFrame = () => Math.max(0, Math.min(sequence.frameCount - 1, Math.round(time.get() * sequence.fps)));
  const targetSheet = () => Math.floor(targetFrame() / sequence.framesPerSheet);
  const schedule = () => { if (alive && !raf) raf = requestAnimationFrame(paint); };

  function request(index: number) {
    if (index < 0 || index >= sequence.sheets.length || cache.has(index) || pending.has(index) || failed.has(index) || pending.size >= 2) return;
    const image = new Image();
    pending.set(index, image);
    image.onload = async () => {
      try { await image.decode(); } catch { fail(); return; }
      if (!alive) return;
      pending.delete(index);
      cache.set(index, image);
      const wanted = targetSheet();
      // Keep neighbouring sheets for smooth reverse scrolling, with bounded RAM.
      const farthest = [...cache.keys()].sort((a, b) => Math.abs(b - wanted) - Math.abs(a - wanted));
      while (cache.size > 3) cache.delete(farthest.shift()!);
      schedule();
    };
    const fail = () => {
      if (!alive) return;
      pending.delete(index);
      failed.add(index);
      if (index === targetSheet()) onError(); else schedule();
    };
    image.onerror = fail;
    image.src = sequence.sheets[index];
  }

  function paint() {
    raf = 0;
    if (!alive || !visible || document.hidden) return;
    const frame = targetFrame();
    const sheet = Math.floor(frame / sequence.framesPerSheet);
    if (sheet !== previousSheet) direction = Math.sign(sheet - previousSheet);
    previousSheet = sheet;
    if (failed.has(sheet)) { onError(); return; }
    const image = cache.get(sheet);
    if (!image) { request(sheet); return; }
    if (frame !== painted) {
      const slot = frame % sequence.framesPerSheet;
      context!.drawImage(image,
        (slot % sequence.columns) * sequence.width, Math.floor(slot / sequence.columns) * sequence.height,
        sequence.width, sequence.height, 0, 0, canvas.width, canvas.height);
      painted = frame;
      onFrame(frame / sequence.fps);
    }
    request(sheet + direction);
  }

  const unsubscribe = time.on('change', schedule);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
  }, { rootMargin: '600px' });
  observer.observe(canvas);
  document.addEventListener('visibilitychange', schedule);
  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    unsubscribe();
    observer.disconnect();
    document.removeEventListener('visibilitychange', schedule);
    for (const image of pending.values()) { image.onload = null; image.onerror = null; image.src = ''; }
    pending.clear();
    cache.clear();
  };
}
