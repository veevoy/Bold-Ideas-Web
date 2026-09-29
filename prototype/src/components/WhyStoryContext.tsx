import { ArrowDown } from 'lucide-react';
import { experience } from '../content';
import { whyCopy as copy } from '../why-content';
import { BrandList } from './BrandList';

/** The short rationale accompanies each film scene. Longer delivery details
 * remain in normal flow so visitors can read them at their own pace. */
export function WhyStoryContext() {
  return <section className="why-story-context" id="why-approach" aria-labelledby="why-story-support-title">
    <div className="wrap">
      <div className="why-story-explanation">
        <h2 id="why-story-support-title">{copy.supportTitle}</h2>
        <div className="why-story-prose">
          <p>{copy.cto}</p>
          <p>{copy.shortcuts}</p>
          <BrandList className="why-story-commitments" items={copy.commitments} />
          <p>{experience.body}</p>
          <a className="text-link" href="#services">Explore our services<ArrowDown size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section>;
}
