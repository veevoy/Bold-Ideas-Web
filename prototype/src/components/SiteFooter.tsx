import { useRef } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BOOKING_URL, CONTACT_EMAIL } from '../content';
import { useSiteMotion } from './SiteMotion';
import { FooterFilm } from './FooterFilm';

export function SiteFooter({ homePrefix = '' }: { homePrefix?: string }) {
  const footer = useRef<HTMLElement>(null);
  const mediaWindow = useRef<HTMLDivElement>(null);
  const { reduced } = useSiteMotion();
  const { scrollYProgress } = useScroll({ target: footer, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return <footer className="site-footer" ref={footer} id="footer">
    <div className="footer-underlay" aria-hidden="true"><div className="footer-photo">
      <motion.div className="footer-film" style={{ scale: reduced ? 1 : scale }}><FooterFilm exposure={mediaWindow} /></motion.div>
    </div></div>
    <div className="footer-panel">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand"><a href={`${homePrefix}#top`} aria-label="Bold Ideas home"><img src="/brand/logo-color.svg" width="200" height="56" alt="Bold Ideas Consulting" /></a><p>Your bold ideas,<br />backed by bold tech.</p></div>
          <nav className="footer-navigation" aria-labelledby="footer-navigation-title"><h2 id="footer-navigation-title">Explore</h2>
            <a href="/case-studies">Case studies</a><a href="/services">Services</a><a href={`${homePrefix}#about`}>About</a><a href="/testimonials">Testimonials</a>
          </nav>
          <div className="footer-studio">
            <p className="footer-company">Bold Ideas Consulting is the brand of the Inspiring Visionaries Studio, s.r.o.</p>
            <address>Korunní 2569/108, Vinohrady<br />101 00 Prague 10<br />Czech Republic</address>
          </div>
          <div className="footer-contact"><h2>Let’s talk.</h2><a className="footer-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a className="primary-link" href={BOOKING_URL}>Book Strategy Session<ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></a><p>A 30-min complimentary strategic session.</p></div>
        </div>
        <div className="footer-utility"><nav aria-label="Legal"><a href="https://www.boldideasconsulting.com/privacy">Privacy</a><a href="https://www.boldideasconsulting.com/terms">Terms</a></nav>
          <div><a className="footer-back-top" href="#top">Back to top<ArrowUp size={16} aria-hidden="true" /></a></div>
        </div>
      </div>
    </div>
    <div className="footer-image-window" ref={mediaWindow}><div className="footer-photo-signoff wrap"><span>© {new Date().getFullYear()} Bold Ideas Consulting</span><img src="/brand/logo-light.svg" alt="" width="220" height="62" loading="lazy" /></div></div>
  </footer>;
}
