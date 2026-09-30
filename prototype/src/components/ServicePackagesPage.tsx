import { ArrowDown } from 'lucide-react';
import { needs, services } from '../content';
import { Disclosure } from './Disclosure';
import { TextReveal } from './TextReveal';
import { needCopy, ServiceScope, type ServiceFinderProps } from './ServiceFinder';
import { useRef } from 'react';
import { usePageEntrance } from './usePageEntrance';
import { BoldLeadsPackage } from './BoldLeadsPackage';

export function ServicePackagesPage({ openServices, onServiceToggle }: ServiceFinderProps) {
  const page = useRef<HTMLElement>(null);
  usePageEntrance(page);
  return <section ref={page} className="listing-page services-index wrap" aria-labelledby="services-index-title">
    <header className="listing-header">
      <TextReveal as="h1" id="services-index-title" lines={['Services for your', 'next bold move.']} />
      <p data-entrance="copy">From a first idea to a product in people’s hands. Find the support that fits where you are, and what you need next.</p>
    </header>
    <nav className="service-index-navigation" aria-label="Find a service by what you need">
      {needs.map(need => <a key={need.id} href={`#packages-${need.id}`}>{needCopy[need.id].label}<ArrowDown size={18} strokeWidth={1.5} aria-hidden="true" /></a>)}
    </nav>
    <div className="service-index-groups">
      {needs.map(need => <section className="service-index-group" key={need.id} id={`packages-${need.id}`} aria-labelledby={`packages-${need.id}-title`}>
        <div className="service-index-lead"><h2 data-entrance="copy" id={`packages-${need.id}-title`}>{needCopy[need.id].label}<span className="service-index-dot">.</span></h2><p data-entrance="copy">{needCopy[need.id].body}</p></div>
        <div className="service-index-offers" data-need={need.id}>
          {need.services.map(link => {
            const service = services.find(item => item.id === link.id)!;
            return <Disclosure key={service.id} id={service.id} className="package-offer" headingAs="h3" open={openServices.has(service.id)} onOpenChange={open => onServiceToggle(service.id, open)} title={<span className="package-summary">
              <span className="package-name">{service.name}</span>
              <span className="package-tagline">{service.tagline}</span>
              <span className="package-commercial"><span><span className="package-commercial-label">Investment</span>{service.price}</span><span><span className="package-commercial-label">Timing</span>{service.duration}</span></span>
            </span>}><ServiceScope service={service} headingAs="h4" outcomeMedia={service.id === 'ai-automation-starter' &&
              <video className="package-demo-video" controls playsInline preload="none" width={1920} height={1080}
                poster="/images/automation-pipeline-poster.webp" aria-label="AI automation pipeline walkthrough">
                <source src="/video/automation-pipeline-showcase.mp4" type="video/mp4" />
                <a href="/video/automation-pipeline-showcase.mp4">Watch the AI automation pipeline walkthrough</a>
              </video>
            } /></Disclosure>;
          })}
          {need.id === 'ai' && <BoldLeadsPackage headingAs="h3" open={openServices.has('bold-leads')} onOpenChange={open => onServiceToggle('bold-leads', open)} />}
          {need.id === 'finish' && <p className="package-qualification">Diagnosis and audit fees cover those stages. Further implementation is agreed separately.</p>}
        </div>
      </section>)}
    </div>
  </section>;
}
