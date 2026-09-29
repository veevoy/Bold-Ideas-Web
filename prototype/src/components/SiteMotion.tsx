import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';

const MotionContext = createContext({ reduced: false });

export function SiteMotion({ children }: { children: ReactNode }) {
  const reduced = !!useReducedMotion();
  useEffect(() => {
    const root = document.documentElement;
    if (reduced) root.setAttribute('data-reduced-motion', 'true');
    else root.removeAttribute('data-reduced-motion');
    return () => root.removeAttribute('data-reduced-motion');
  }, [reduced]);

  return <MotionContext.Provider value={{ reduced }}>
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
  </MotionContext.Provider>;
}

export function useSiteMotion() { return useContext(MotionContext); }
