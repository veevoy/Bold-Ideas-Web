import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSiteMotion } from './SiteMotion';
import { Plus } from 'lucide-react';

// Interaction reference: Julien Thibeaut's Disclosure on 21st.dev.
// Independently implemented for this site; no locked source was copied.
export type DisclosureProps = {
  id?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExitComplete?: () => void;
  headingAs?: 'h3' | 'h4';
};

export function Disclosure({ id, title, children, className = '', defaultOpen = false, open, onOpenChange, onExitComplete, headingAs: Heading = 'h3' }: DisclosureProps) {
  const generatedId = useId();
  const contentId = `${id || generatedId}-content`;
  const triggerId = `${id || generatedId}-trigger`;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const { reduced: reduceMotion } = useSiteMotion();

  function toggle() {
    const next = !expanded;
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <div id={id} className={`disclosure ${expanded ? 'is-open' : ''} ${className}`}>
      <Heading className="disclosure-heading">
        <button type="button" id={triggerId} className="disclosure-trigger" aria-expanded={expanded} aria-controls={contentId} onClick={toggle}>
          <span>{title}</span>
          <Plus className="disclosure-icon" size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </Heading>
      <div id={contentId} inert={!expanded}>
        <AnimatePresence initial={false} onExitComplete={onExitComplete}>
          {expanded && (
            <motion.div key="content" className="disclosure-motion" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}>
              <div className="disclosure-content" role="region" aria-labelledby={triggerId}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
