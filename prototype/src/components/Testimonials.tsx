import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { testimonialSlides, homepageTestimonials, type ClientTestimonial } from '../testimonial-content';
import { useSiteMotion } from './SiteMotion';
import { ContentReveal } from './ContentReveal';
import { TextReveal } from './TextReveal';

export function FrameJunctions() {
  return <div className="testimonial-junctions" aria-hidden="true">
    {['tl', 'tr', 'bl', 'br'].map(corner => <svg key={corner} className={`testimonial-star testimonial-star--${corner}`} viewBox="0 0 24 24" focusable="false"><path d="M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z" /></svg>)}
  </div>;
}

export function TestimonialAuthor({ testimonial }: { testimonial: ClientTestimonial }) {
  return <figcaption className="testimonial-author">
    <span className={`testimonial-company-icon testimonial-company-icon--${testimonial.id}`}><img src={testimonial.image} alt="" width="36" height="36" loading="lazy" /></span>
    <div><span className="testimonial-name">{testimonial.name}</span><span className="testimonial-role">{testimonial.role}, {testimonial.organisation}</span></div>
  </figcaption>;
}

export function TestimonialQuote({ quote }: { quote: string }) {
  const paragraphs = quote.split(/\n\n+/);
  return <blockquote>{paragraphs.map((paragraph, index) => <p key={index}>{index === 0 && '“'}{paragraph}{index === paragraphs.length - 1 && '”'}</p>)}</blockquote>;
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const { reduced } = useSiteMotion();
  const slide = homepageTestimonials[active];
  const select = (index: number) => setActive((index + homepageTestimonials.length) % homepageTestimonials.length);

  function moveFocus(event: KeyboardEvent<HTMLDivElement>) {
    const focused = controls.current.findIndex(button => button === event.target);
    if (focused < 0) return;
    const destination = event.key === 'ArrowRight' ? (focused + 1) % homepageTestimonials.length
      : event.key === 'ArrowLeft' ? (focused + homepageTestimonials.length - 1) % homepageTestimonials.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? homepageTestimonials.length - 1 : undefined;
    if (destination === undefined) return;
    event.preventDefault(); select(destination); controls.current[destination]?.focus();
  }

  return <section className="testimonials" id="testimonials" aria-labelledby="testimonials-heading">
    <div className="wrap">
      <ContentReveal><h2 className="testimonials-heading" id="testimonials-heading">What our partners say.</h2></ContentReveal>
      <div className="testimonial-frame">
        <FrameJunctions />
        <div className="testimonial-controls" role="group" aria-label="Choose a testimonial" onKeyDown={moveFocus}>
          {homepageTestimonials.map((item, index) => <button key={item.id} ref={element => { controls.current[index] = element; }} type="button" aria-pressed={active === index} aria-controls="testimonial-active" aria-label={`${index + 1} of ${homepageTestimonials.length}: ${item.name}`} onClick={() => select(index)}><span /></button>)}
        </div>
        <div className="testimonial-stage" id="testimonial-active">
          <motion.figure key={slide.id} className="testimonial-slide" initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .3 }}>
            <TestimonialQuote quote={slide.quote} /><TestimonialAuthor testimonial={slide} />
          </motion.figure>
        </div>
        <p className="testimonial-announcement" role="status" aria-live="polite" aria-atomic="true">Testimonial {active + 1} of {homepageTestimonials.length}: {slide.name}.</p>
        <div className="testimonial-bottom">
          <div className="testimonial-arrows"><button type="button" aria-label="Previous testimonial" onClick={() => select(active - 1)}><ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" /></button><span aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(homepageTestimonials.length).padStart(2, '0')}</span><button type="button" aria-label="Next testimonial" onClick={() => select(active + 1)}><ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" /></button></div>
          <a href="/testimonials" className="text-link">All testimonials<ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section>;
}

export function TestimonialsPage() {
  return <section className="testimonials-page wrap" aria-labelledby="testimonials-page-title">
    <a className="text-link testimonial-back" href="/#testimonials"><ArrowLeft size={18} aria-hidden="true" />Back to home</a>
    <div className="testimonials-page-heading"><TextReveal as="h1" id="testimonials-page-title" lines={['From people', 'we’ve worked with.']} /><ContentReveal as="p" delay={220}>In their own words.</ContentReveal></div>
    <div className="testimonial-stories">
      {testimonialSlides.map((slide, index) => <article key={slide.id} className="testimonial-story" aria-label={`Testimonial from ${slide.name}`}>
        <FrameJunctions /><span className="testimonial-story-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <ContentReveal as="figure"><TestimonialQuote quote={slide.quote} /><TestimonialAuthor testimonial={slide} /></ContentReveal>
      </article>)}
    </div>
  </section>;
}
