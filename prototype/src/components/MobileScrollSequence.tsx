import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'motion/react';
import { attachScrollSequence, type ScrollSequence } from '../scroll-sequence';

export function MobileScrollSequence({ sequence, poster, time, onFrame, onError }: {
  sequence: ScrollSequence; poster: string; time: MotionValue<number>;
  onFrame: (time: number) => void; onError: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [painted, setPainted] = useState(false);
  const callbacks = useRef({ onFrame, onError });
  callbacks.current = { onFrame, onError };
  useEffect(() => {
    if (!canvas.current) return;
    return attachScrollSequence(canvas.current, sequence, time,
      value => { setPainted(true); callbacks.current.onFrame(value); }, () => callbacks.current.onError());
  }, [sequence, time]);
  return <div className="scroll-frame-sequence" aria-hidden="true">
    <img src={poster} width={sequence.width} height={sequence.height} alt="" loading="lazy" decoding="async" style={{ visibility: painted ? 'hidden' : 'visible' }} />
    <canvas ref={canvas} width={sequence.width} height={sequence.height} />
  </div>;
}
