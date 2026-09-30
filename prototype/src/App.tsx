import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Disclosure } from './components/Disclosure';
import { ServiceFinder } from './components/ServiceFinder';
import { SiteMotion, useSiteMotion } from './components/SiteMotion';
import { HeroVideo } from './components/HeroVideo';
import { ExperienceMarquee } from './components/ExperienceMarquee';
import { TextReveal } from './components/TextReveal';
import { ContentReveal } from './components/ContentReveal';
import { BoldScrollStory } from './components/BoldScrollStory';
import { WhyStoryContext } from './components/WhyStoryContext';
import { CaseStudies } from './components/CaseStudies';
import { CaseStudyPage, CaseStudyNotFound } from './components/CaseStudyPage';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { ServicePackagesPage } from './components/ServicePackagesPage';
import { pageForPath, navigationHref } from './site-routes';
import { projectCaseStudies } from './case-studies';
import { findCaseStudy, relatedCaseStudies } from './case-study-model';
import { Testimonials, TestimonialsPage } from './components/Testimonials';
import { SiteFooter } from './components/SiteFooter';
import { ContactSection } from './components/ContactSection';
import { Audiences } from './components/Audiences';
import { HomeJourney } from './components/HomeJourney';
import { BOOKING_URL, services, faqs } from './content';
import { opticalCopy as copy } from './optical-content';
import { navigationVariant, withNavigationPreview } from './navigation-preview';
import { useNavigationSurface } from './components/useNavigationSurface';

function Booking({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  return <a href={BOOKING_URL} className={`primary-link ${className}`}><span>{compact ? copy.navigationAction.label : copy.hero.primaryAction.label}</span><ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" /></a>;
}

function OpticalHero() {
  return <section className="optical-hero photographic-hero" data-nav-tone="dark" aria-labelledby="hero-title">
    <HeroVideo />
    <div className="hero-copy wrap">
      <TextReveal as="h1" id="hero-title" className="hero-title-faithful" lines={copy.hero.lines} delay={100} />
      <div className="hero-introduction">
        <svg className="hero-junction hero-junction-top" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z" /></svg>
        <svg className="hero-junction hero-junction-bottom" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z" /></svg>
        <ContentReveal className="hero-introduction-content" delay={420} stagger={110}>
          <p className="hero-positioning">{copy.hero.positioning}</p>
          <p className="hero-description">{copy.hero.body}</p>
          <div className="hero-actions"><Booking /><a className="text-link" href={copy.hero.secondaryAction.href}>{copy.hero.secondaryAction.label}<ArrowDown size={19} aria-hidden="true" /></a></div>
        </ContentReveal>
      </div>
    </div>
    <ExperienceMarquee />
  </section>;
}

export function App() { return <SiteMotion><OpticalHome /></SiteMotion>; }

function OpticalHome() {
  const pathname = window.location.pathname;
  const page = pageForPath(pathname);
  const variant = navigationVariant(window.location.search);
  const navigation = useNavigationSurface(variant, page === 'home');
  const previewHref = (href: string) => withNavigationPreview(href, variant);
  const isTestimonialsPage = page === 'testimonials';
  const isCaseStudyPage = page === 'case-study';
  const study = findCaseStudy(pathname, projectCaseStudies);
  const homePrefix = page === 'home' ? '' : '/';
  const navHref = (href: string) => previewHref(navigationHref(href, page === 'home'));
  const currentNav = isCaseStudyPage || page === 'case-studies' ? '/case-studies' : page === 'services' ? '/services' : undefined;
  useEffect(() => {
    const titles = { home: 'Bold Ideas Consulting — Product & AI consultancy for good-doers', 'case-studies': 'Case studies — Bold Ideas Consulting', services: 'Services — Bold Ideas Consulting', testimonials: 'Testimonials — Bold Ideas Consulting', 'case-study': 'Case study not found — Bold Ideas Consulting' };
    document.title = study ? `${study.name} — Case study — Bold Ideas Consulting` : titles[page];
    const description = page === 'case-studies' ? 'Explore the challenges, decisions and products behind our client projects.' : page === 'services' ? 'Product strategy, technical leadership, responsible AI and development. Explore our service packages, scope, pricing and timing.' : 'You have the bold ideas, we have the tech sorted. Product & AI consultancy for good-doers.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', study?.summary ?? description);
  }, [study, page]);
  useEffect(() => {
    const section = window.location.hash.slice(1);
    if (!['top', 'main', 'why-bold', 'perspective', 'why-approach', 'who-we-work-with', 'work', 'services', 'about', 'testimonials', 'how-we-work', 'contact', 'case-challenge', 'case-approach', 'case-timeline', 'case-testimonial', 'case-outcome', 'packages-build', 'packages-leadership', 'packages-ai', 'packages-finish'].includes(section)) return;
    let cancelled = false;
    // A link from a detail page can arrive before React mounts its hash target.
    void document.fonts.ready.then(() => {
      if (!cancelled) document.getElementById(section)?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    return () => { cancelled = true; };
  }, [pathname]);
  const { reduced } = useSiteMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openServices, setOpenServices] = useState<Set<string>>(new Set());
  const [activeServiceId, setActiveServiceId] = useState<string>();
  const menuButton = useRef<HTMLButtonElement>(null);
  const reducedRef = useRef(reduced);
  const scrollTimer = useRef<ReturnType<typeof window.setTimeout> | undefined>(undefined);
  useEffect(() => { reducedRef.current = reduced; }, [reduced]);
  const revealService = useCallback((id: string) => {
    if (id !== 'bold-leads' && !services.some(service => service.id === id)) return;
    setActiveServiceId(id);
    setOpenServices(current => new Set([...current, id]));
    window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: reducedRef.current ? 'instant' : 'smooth' });
      document.getElementById(`${id}-trigger`)?.focus({ preventScroll: true });
      setActiveServiceId(undefined);
    }, reducedRef.current ? 20 : 310);
  }, []);
  useEffect(() => {
    const onHashChange = () => { try { revealService(decodeURIComponent(window.location.hash.slice(1))); } catch { /* Ignore malformed fragment. */ } };
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => { window.removeEventListener('hashchange', onHashChange); window.clearTimeout(scrollTimer.current); };
  }, [revealService]);
  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [menuOpen]);
  const toggleService = (id: string, open: boolean) => setOpenServices(current => { const next = new Set(current); if (open) next.add(id); else next.delete(id); return next; });

  const lightNavigation = !menuOpen && ((variant === 'glass' && navigation.dark) || (variant === 'expanding' && navigation.expanded));

  return <div className="optical-page" data-navigation={variant}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header ref={navigation.header} className={`floating-header navigation--${variant} ${menuOpen ? 'menu-is-open' : ''}`} data-tone={lightNavigation ? 'dark' : 'light'} data-expanded={variant === 'expanding' && navigation.expanded && !menuOpen}>
      <div className="nav-row"><a className="site-logo" href={previewHref(`${homePrefix}#top`)} aria-label="Bold Ideas home"><img src={lightNavigation ? '/brand/logo-navigation-light.svg' : '/brand/logo-navigation.svg'} width="150" height="42" alt="Bold Ideas" /></a>
        <nav className="desktop-nav" aria-label="Main navigation">{copy.navigation.map(link => <a key={link.href} href={navHref(link.href)} aria-current={link.href === currentNav ? 'page' : undefined}>{link.label}</a>)}</nav>
        <Booking compact className="nav-booking" />
        <button className="menu-toggle" type="button" ref={menuButton} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}><span className="menu-icon" aria-hidden="true"><span /><span /><span /></span></button>
      </div>
      <div className="mobile-menu-panel" inert={!menuOpen} aria-hidden={!menuOpen}><div className="mobile-menu-clip"><nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{copy.navigation.map(link => <a key={link.href} href={navHref(link.href)} aria-current={link.href === currentNav ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={23} aria-hidden="true" /></a>)}<a className="primary-link mobile-booking" href={BOOKING_URL}>Book Strategy Session<ArrowUpRight size={20} aria-hidden="true" /></a></nav></div></div>
    </header>
    <main id="main" tabIndex={-1}><div id="top" />
      {page === 'case-studies' ? <CaseStudiesPage /> : page === 'services' ? <ServicePackagesPage openServices={openServices} onServiceToggle={toggleService} /> : isCaseStudyPage ? study ? <CaseStudyPage study={study} related={relatedCaseStudies(study, projectCaseStudies)} /> : <CaseStudyNotFound /> : isTestimonialsPage ? <TestimonialsPage /> : <>
      <OpticalHero />
      <BoldScrollStory />
      <WhyStoryContext />
      <Audiences />
      <CaseStudies />
      <HomeJourney services={<section className="optical-services wrap" id="services" aria-labelledby="services-title"><div className="section-heading section-heading-with-link"><TextReveal id="services-title" lines={['Let your bold idea', 'stand on its own.']} /><a className="text-link" href="/services">Explore all services<ArrowUpRight size={19} aria-hidden="true" /></a></div><ServiceFinder openServices={openServices} onServiceToggle={toggleService} activeServiceId={activeServiceId} /></section>} />
      <section className="optical-faq wrap" aria-labelledby="faq-title"><TextReveal id="faq-title" lines={['The questions', 'we get asked most.']} /><ContentReveal delay={180}>{faqs.map((faq, index) => <Disclosure key={faq.question} id={`faq-${index + 1}`} title={faq.question}><p>{faq.answer}</p></Disclosure>)}</ContentReveal></section>
      </>}
      <ContactSection copy={study?.callToAction} />
    </main>
    <SiteFooter homePrefix={homePrefix} />
  </div>;
}
