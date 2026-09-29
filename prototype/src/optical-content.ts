import { BOOKING_URL, CONTACT_EMAIL } from './content';

/** Faithful abridgement of the live site captured in docs/content-source-2026-09-22.txt.
 * Retain original voice and phrases; shorten repetition, do not reposition the brand.
 * Collaboration copy was reframed with the user on 24 September 2026.
 * Commercial facts remain in content.ts.
 */
export const opticalCopy = {
  navigation: [
    { label: 'Case studies', href: '/case-studies' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '#about' },
  ],
  navigationAction: { label: 'Book a session', href: BOOKING_URL, external: true },
  hero: {
    lines: ['You have the bold ideas, we have the tech sorted.'],
    positioning: 'Product & AI consultancy for good-doers.',
    body: 'We work with purpose-led businesses where the goal is clear, but the tech and AI support is not.',
    primaryAction: { label: 'Book Strategy Session', href: BOOKING_URL, external: true },
    secondaryAction: { label: 'Our services', href: '#services' },
  },
  intro: {
    body: 'Your bold ideas are on their way to make a difference. The last thing you want is the tech to trip you up along the way.',
  },
  work: {
    projects: [
      {
        id: 'love-peace-harmony',
        category: 'Product definition & prototyping',
        title: 'A clear idea with a messy tech spec',
        body: 'Love Peace Harmony is a global non-profit charity foundation. After 20 years of community and charity work, they needed a new member platform. They knew their goals inside out, yet couldn’t judge the technical build.',
      },
      {
        id: 'mapwhizz',
        category: 'Product rescue & delivery',
        title: 'Rescuing a stalled launch',
        body: 'Mapwhizz is a location-intelligence and travel-time analysis platform for businesses and property professionals. Stuck with an unreleased, broken system, they needed a partner to cut through the chaos and salvage a path to market.',
      },
    ],
  },
  process: {
    title: 'How do we work together?',
    intro: 'Start with where you are. Find the right way forward.',
    steps: [
      {
        number: '01',
        title: 'Understand the real challenge',
        body: 'We start with your goals, your product and what’s getting in the way — whether you’re exploring an idea or improving something already live.',
      },
      {
        number: '02',
        title: 'Agree the way forward',
        body: 'Together, we define the priorities, the scope and the support you need, so you understand what comes next and why.',
      },
      {
        number: '03',
        title: 'Get the right support',
        body: 'That might mean senior technical guidance, a focused intervention or a complete build. The work follows what your product needs.',
      },
    ],
  },
  about: {
    benefits: [
      {
        id: 'experience',
        title: 'Building global products for over 10 years',
        body: "We've got extensive experience in creating products for global companies. Scalable and robust, built for the masses.",
      },
      {
        id: 'responsible-ai',
        title: 'AI done right and proper',
        body: "AI is used, but where it's needed and where it can be made sustainable. With human implementation and control and, most importantly, securely.",
      },
      {
        id: 'team',
        title: 'Team-focused and attentive',
        body: 'We become part of your team and align with your goals from the beginning. An extension of your brand who shares ideas that will help you now and in the future.',
      },
      {
        id: 'delivery',
        title: 'Getting down to business',
        body: 'We prioritise quick turnarounds to get you to market as fast as possible. Your bold ideas will be ready to be shared with the world in line with your timeframe.',
      },
    ],
  },
  contact: {
    body: 'Contact us today to schedule your 30-min complimentary strategic session.',
    action: { label: 'Book Strategy Session', href: BOOKING_URL, external: true },
    email: CONTACT_EMAIL,
    emailHref: `mailto:${CONTACT_EMAIL}`,
  },
} as const;
