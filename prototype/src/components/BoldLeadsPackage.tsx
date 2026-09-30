import { ArrowUpRight } from 'lucide-react';
import { Disclosure, type DisclosureProps } from './Disclosure';

/** Product offer shared by the homepage AI card and the services index. */
export function BoldLeadsPackage({ headingAs = 'h4', ...disclosure }: Pick<DisclosureProps, 'headingAs' | 'open' | 'onOpenChange' | 'onExitComplete'>) {
  return <Disclosure {...disclosure} headingAs={headingAs} className="package-offer bold-leads-package" id="bold-leads" title={
    <span className="package-summary">
      <img className="bold-leads-logo" src="/brand/boldleads-dark-color.svg" width="1060" height="189" alt="BoldLeads.ai" />
      <span className="bold-leads-attribution">A Bold Ideas Consulting product</span>
      <span className="package-tagline">Smart Automation. Human Judgement. Qualified Leads.</span>
    </span>
  }>
    <div className="package-scope">
      <div className="bold-leads-copy">
        <p className="bold-leads-promise">Imagine waking up to <span>20, 30, 40</span> qualified leads.</p>
        <p>While you sleep, build and do the work that matters, we will find the right clients for your business.</p>
      </div>
      <a className="package-booking" href="https://www.boldleads.ai/" target="_blank" rel="noopener noreferrer">
        Explore BoldLeads.ai<ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" />
      </a>
    </div>
  </Disclosure>;
}
