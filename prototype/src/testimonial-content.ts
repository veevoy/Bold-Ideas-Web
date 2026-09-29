import { testimonials, type Testimonial } from './content';

export type ClientTestimonial = Testimonial & { readonly image: string };

// Stable IDs keep quotes and company marks paired when the client reorders entries.
const companyMarks: Readonly<Record<string, string>> = {
  kinable: '/images/testimonials/kinable-icon.svg',
  mapwhizz: '/images/testimonials/mapwhizz-icon.png',
  'big-brand-love': '/images/testimonials/big-brand-love-logo.jpg',
  'fx-digital': '/images/testimonials/fx-digital-icon.png',
  konexis: '/images/testimonials/konexis-icon.png',
  zellebrate: '/images/testimonials/zellebrate-icon.png',
};

export const testimonialSlides: readonly ClientTestimonial[] = testimonials.map(testimonial => {
  const image = companyMarks[testimonial.id];
  if (!image) throw new Error(`Missing company mark for testimonial: ${testimonial.id}`);
  return { ...testimonial, image };
});

// The homepage shows the selected client references; the full page retains every quote.
const homepageIds = ['kinable', 'mapwhizz', 'big-brand-love'];
export const homepageTestimonials = homepageIds.map(id => {
  const testimonial = testimonialSlides.find(item => item.id === id);
  if (!testimonial) throw new Error(`Missing homepage testimonial: ${id}`);
  return testimonial;
});
