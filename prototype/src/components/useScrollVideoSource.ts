import { useEffect, useState } from 'react';

const mobileQuery = '(max-width: 899px), (pointer: coarse)';

/** Touch devices keep the lighter decoder workload even in landscape. */
export function useScrollVideoSource(desktop: string, mobile: string) {
  const [small, setSmall] = useState(() => window.matchMedia(mobileQuery).matches);
  useEffect(() => {
    const query = window.matchMedia(mobileQuery);
    const update = () => setSmall(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return small ? mobile : desktop;
}
