import { ArrowUpRight } from 'lucide-react';
import { BOOKING_URL, CONTACT_EMAIL } from '../content';
import { opticalCopy } from '../optical-content';
import { ContentReveal } from './ContentReveal';
import { TextReveal } from './TextReveal';
import type { ProjectCaseStudy } from '../case-study-model';

export function ContactSection({ copy }: { copy?: ProjectCaseStudy['callToAction'] }) {
  return <section className="contact-section" id="contact" aria-labelledby="contact-title">
    <div className="contact-rules"><div className="wrap">
      <div className="contact-frame">
        <div className="contact-message">
          <TextReveal id="contact-title" lines={[copy?.title ?? 'Ready to turn your vision into reality?']} />
        </div>
        <div className="contact-invitation">
          {['top', 'bottom'].map(edge => <svg key={edge} className={`contact-junction contact-junction--${edge}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z" /></svg>)}
          <ContentReveal className="contact-invitation-content" delay={280} stagger={100}>
            <p className="contact-description">{copy?.body ?? opticalCopy.contact.body}</p>
            <a className="contact-booking" href={BOOKING_URL}>
              <span className="contact-brand-mark" aria-hidden="true" />
              <span className="contact-booking-label">{copy?.label ?? 'Book Strategy Session'}<ArrowUpRight size={26} strokeWidth={1.5} aria-hidden="true" /></span>
            </a>
            <a className="contact-email-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </ContentReveal>
        </div>
      </div>
    </div></div>
  </section>;
}
