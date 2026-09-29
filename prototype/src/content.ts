/**
 * Active service, need, project and FAQ copy shortened from the live source:
 * docs/content-source-2026-09-22.txt (22 September 2026).
 * Audit and diagnosis prices apply to their stated stages; implementation is scoped separately.
 */

export type ServiceId =
  | "proof-of-product"
  | "tech-strategic-compass"
  | "built-to-last"
  | "product-rescue"
  | "ai-automation-starter"
  | "vibe-coded-app-to-production";

export interface ActionLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface ServiceLink {
  readonly id: ServiceId;
  readonly name: string;
  readonly href: string;
}

export interface SectionCopy {
  readonly eyebrow: string;
  readonly headline: string;
  readonly body: string;
  readonly note?: string;
}

export interface Hero extends SectionCopy {
  readonly primaryAction: ActionLink;
  readonly secondaryAction: ActionLink;
}

export interface Need {
  readonly id: string;
  readonly headline: string;
  readonly body: string;
  readonly services: readonly ServiceLink[];
}

export interface Service {
  readonly id: ServiceId;
  readonly name: string;
  readonly tagline: string;
  readonly price: string;
  readonly duration: string;
  readonly audience: string;
  readonly outcome: string;
  readonly scope: string;
  readonly tiers?: readonly { readonly name: string; readonly price: string }[];
}

export interface ProcessStep {
  readonly number: string;
  readonly headline: string;
  readonly body: string;
}

export interface About {
  readonly eyebrow: string;
  readonly headline: string;
  readonly paragraphs: readonly string[];
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly organisation: string;
}

export interface FAQ {
  readonly question: string;
  readonly answer: string;
}

export interface Contact extends SectionCopy {
  readonly action: ActionLink;
  readonly emailLabel: string;
  readonly emailHref: string;
  readonly bookingFallback: string;
}

export interface Footer {
  readonly line: string;
  readonly contactLink: ActionLink;
}

export const BOOKING_URL: string = "https://calendar.app.google/LD3L1YyNKn6JrBz47";

export const CONTACT_EMAIL: string = "get@boldideasconsulting.com";

export const navigation: readonly ActionLink[] = [
  {
    "label": "Services",
    "href": "#services"
  },
  {
    "label": "Our work",
    "href": "#work"
  },
  {
    "label": "How we work",
    "href": "#how-we-work"
  }
];

export const hero: Hero = {
  "eyebrow": "PRODUCT, TECH & AI PARTNER",
  "headline": "Your ambition. Our technical know-how.",
  "body": "We help you decide what to build, bring the right people together, and take your product from first idea to launch and beyond.",
  "primaryAction": {
    "label": "Book a 30-minute call",
    "href": "https://calendar.app.google/LD3L1YyNKn6JrBz47",
    "external": true
  },
  "secondaryAction": {
    "label": "See our work",
    "href": "#work"
  }
};

export const experience: Readonly<{ headline: string; body: string }> = {
  "headline": "Building global products for over 10 years.",
  "body": "Our background working with global brands such as Tesco, Microsoft, and Allwyn through previous agency roles means we have the experience to meet deadlines, keep budgets, and be flexible."
};

export const sectionCopy: Readonly<Record<"needs" | "services" | "projects" | "process" | "testimonials" | "faq", SectionCopy>> = {
  "needs": {
    "eyebrow": "START WHERE YOU ARE",
    "headline": "Where would you like to get to?",
    "body": "You might be exploring a first idea, improving an existing business or preparing to launch. Start with the support you need now."
  },
  "services": {
    "eyebrow": "OUR SERVICES",
    "headline": "The right support for your next step.",
    "body": "Six ways to work together, with scope and pricing you can explore.",
    "note": "Prices are in GBP. Ranges and starting prices depend on scope. Diagnosis and audit fees cover those stages; further implementation is agreed separately where stated."
  },
  "projects": {
    "eyebrow": "SELECTED WORK",
    "headline": "Different starting points. Work you can see.",
    "body": ""
  },
  "process": {
    "eyebrow": "HOW WE WORK",
    "headline": "A shared plan, from the first conversation.",
    "body": ""
  },
  "testimonials": {
    "eyebrow": "WORKING TOGETHER",
    "headline": "From people we have worked with.",
    "body": ""
  },
  "faq": {
    "eyebrow": "GOOD TO KNOW",
    "headline": "A few practical questions.",
    "body": ""
  }
};

export const needs: readonly Need[] = [
  {
    "id": "build",
    "headline": "Avoid pouring money into the wrong things.",
    "body": "Your idea needs a real first version fast — a version that lets you onboard users or pitch to the board. But you're not sure what or how to build, what it'll cost, or whether it'll hold up. Proof of Product shows how your idea will work and what it will take to get there.",
    "services": [
      {
        "id": "proof-of-product",
        "name": "Proof of Product",
        "href": "#proof-of-product"
      },
      {
        "id": "built-to-last",
        "name": "Built to Last",
        "href": "#built-to-last"
      }
    ]
  },
  {
    "id": "leadership",
    "headline": "Avoid getting tech-confused.",
    "body": "You're building a product without a senior tech lead, so you can't tell if your decisions — especially around AI — are right or will cost you a lot. As your strategic tech partner, we make sure your bold ideas are backed by tech that fits.",
    "services": [
      {
        "id": "tech-strategic-compass",
        "name": "Tech Strategic Compass",
        "href": "#tech-strategic-compass"
      }
    ]
  },
  {
    "id": "ai",
    "headline": "Time saving, money saving, pain relieving.",
    "body": "Automation is one of the best ways to see AI make a difference in your everyday operations. AI Automation Starter gives you a first version of an AI-powered workflow, designed around how your team works and not around technology for technology's sake.",
    "services": [
      {
        "id": "ai-automation-starter",
        "name": "AI Automation Starter",
        "href": "#ai-automation-starter"
      }
    ]
  },
  {
    "id": "finish",
    "headline": "Get your product out of trouble.",
    "body": "You've got a live product that won't scale, keeps breaking, or needs constant changes. You don't know whether to lose it, fix it (and how to fix it), change course, or who you could turn to for advice. And you can't fund a full overhaul.",
    "services": [
      {
        "id": "product-rescue",
        "name": "Product Rescue",
        "href": "#product-rescue"
      },
      {
        "id": "vibe-coded-app-to-production",
        "name": "Your Vibe Coded App to Production",
        "href": "#vibe-coded-app-to-production"
      }
    ]
  }
];

export const services: readonly Service[] = [
  {
    "id": "proof-of-product",
    "name": "Proof of Product",
    "tagline": "Your idea launchpad",
    "price": "£5,000–£8,000",
    "duration": "2–4 weeks",
    "audience": "Great innovators who need to see a clear prototype and roadmap to a successful product.",
    "outcome": "Clarity within a month: a written MVP specification, a working prototype and a scope-vs-budget recommendation.",
    "scope": "A focused workshop captures your product from the user's point of view: what they click, see, and do. We hand-write the MVP specification and generate a controlled, clickable prototype, with a roadmap to a full build."
  },
  {
    "id": "tech-strategic-compass",
    "name": "Tech Strategic Compass",
    "tagline": "Your on-call tech & AI partner",
    "price": "From £800/month",
    "duration": "Monthly; cadence and hours agreed",
    "audience": "Founders and product owners who want senior technical judgment without hiring a full-time CTO.",
    "outcome": "Confident, de-risked technical and AI decisions; clear sight of whether your build, developers, and partners are on track; and a senior partner who has your back.",
    "scope": "Senior technical & AI guidance, on-call access, and decision/architecture reviews, scaled to your level. Cadence and hours by agreement. Billed monthly, no lock-in. You can scale up, down, or pause anytime.",
    "tiers": [
      {
        "name": "Sounding Board",
        "price": "£800–£1,200/month"
      },
      {
        "name": "Ongoing Guidance",
        "price": "£2,500–£3,500/month"
      },
      {
        "name": "Hands-On",
        "price": "£5,000–£8,000/month"
      }
    ]
  },
  {
    "id": "built-to-last",
    "name": "Built to Last",
    "tagline": "AI-accelerated, but responsibly",
    "price": "From £20,000",
    "duration": "Typically 3–4 months",
    "audience": "Founders and businesses ready to build the product. The goal is clear, and we can get going.",
    "outcome": "Your bold idea, ready for users. Design, development, end to end — the lot.",
    "scope": "Full UX/UI design from a known spec. AI-accelerated development under senior human control. Production deployment, handover, and post-launch support."
  },
  {
    "id": "product-rescue",
    "name": "Product Rescue",
    "tagline": "Get your product out of trouble",
    "price": "Diagnosis £1,500–£3,000",
    "duration": "Diagnosis approximately 1–2 weeks",
    "audience": "Founders and businesses with a live product in trouble: DIY-with-AI builders who hit a wall, those burned by a cheap shop, or companies whose product can't scale.",
    "outcome": "A stable, market-ready product you can launch (or re-launch). Plus an honest, no-pressure plan to grow or exit when you're ready.",
    "scope": "A fixed-scope diagnosis: assessment, recommendation and roadmap. Stabilisation is scoped from the findings, from around £5,000. Scale, when you're ready: via Built to Last, per route or from £20,000."
  },
  {
    "id": "ai-automation-starter",
    "name": "AI Automation Starter",
    "tagline": "Practical automations you'll be grateful for every day",
    "price": "£2,500–£4,000",
    "duration": "1–2 weeks",
    "audience": "Organisations that rely on people, communication, and repeatable processes, and want to use AI to work faster without losing human control.",
    "outcome": "A personalised AI strategy and workflow that fits your operations in a way that is practical, safe, and useful in your day-to-day tasks.",
    "scope": "A focused automation workshop; a written AI workflow specification; a working automation prototype; and a scope-vs-budget roadmap for scaling. We define where a human should review or approve the output."
  },
  {
    "id": "vibe-coded-app-to-production",
    "name": "Your Vibe Coded App to Production",
    "tagline": "If your vibe is a product that’s safe and sustainable",
    "price": "Audit and strategy £1,500–£3,000",
    "duration": "1–2 weeks, from audit to deployment",
    "audience": "Those who are excited about vibe coding and want to see their prototype go into production.",
    "outcome": "An audit report covering code quality, security, and scalability; fixed, tested code, ready for production; production infrastructure; and deployment.",
    "scope": "The audit and strategy stage is fixed-scope. The fix, test, and deployment work is then scoped from what the audit finds, so you see the cost before we start. Ongoing support is optional and agreed separately."
  }
];

export const processSteps: readonly ProcessStep[] = [
  {
    "number": "01",
    "headline": "Understand the task.",
    "body": "We start with what you want to achieve, who the product is for and what is already in place. Your business knowledge helps shape a workable brief."
  },
  {
    "number": "02",
    "headline": "Decide what comes next.",
    "body": "Together, we define the next useful step, the people involved and the scope, budget and timing. You can see the trade-offs before agreeing to the work."
  },
  {
    "number": "03",
    "headline": "Bring the work together.",
    "body": "We coordinate product and technical delivery, whether guiding your existing team or taking on design and development. Regular conversations keep decisions connected to your priorities."
  },
  {
    "number": "04",
    "headline": "Launch and look ahead.",
    "body": "For delivery projects, we work towards deployment and handover, with support agreed for what follows. For advisory work, we help your team plan its next stage."
  }
];

export const about: About = {
  "eyebrow": "A SENIOR PARTNER",
  "headline": "Close to your team. Clear on what matters.",
  "paragraphs": [
    "A useful technical partner understands the business behind the brief. We explain the implications in plain English and bring the right people into the conversation.",
    "That can mean a regular sounding board, close involvement with your developers or responsibility for a defined delivery project."
  ]
};

export const testimonials: readonly Testimonial[] = [
{
  "id": "kinable",
  "quote": "Radek, Pavel and the team at Bold Ideas Consulting have been instrumental in shaping our MVP for Kinable. Their advanced technical knowledge, precision, and ability to translate our brief into high‑quality prototypes has been consistently impressive. They work with clarity, discipline, and genuine understanding of our mission. They’re a partner we trust and intend to keep with us as we move toward commercial launch and investment.",
  "name": "Callum Arneil",
  "role": "Founder",
  "organisation": "Kinable"
},
{
  "id": "mapwhizz",
  "quote": "We engaged Radek and his team to rescue the development of our tech platform following the challenges we experienced with our previous developer. They quickly assessed the existing platform, understood our objectives, and worked collaboratively with us to successfully deliver our launch.\n\nThroughout the project, they were proactive, responsive, and solution-focused, offering creative ideas and practical advice that not only improved the platform but also supported our wider business goals and helped reduce costs.\n\nRadek and his team became a trusted partner rather than just a development team, and we would highly recommend them to any business looking for a knowledgeable, reliable, and commercially focused technology partner.",
  "name": "Suzanna Dumitrescu",
  "role": "Co-founder",
  "organisation": "Mapwhizz"
},
  {
    "quote": "I have had the privilege to work with Pavel & Radek on major digital product creation and transformation projects. They combine outstanding technical excellence and expertise with a straightforward delivery of solution options. Both take a collaborative and people-first approach that creates progress quickly. Having a tech person who can excite and inspire people is magic dust in the pursuit of positive transformation and growth. I'll always recommend working with or having an insightful conversation.",
    "id": "big-brand-love",
    "name": "Rebecca Hamilton",
    "role": "ex-CMO, Artisanal Spirits · Founder",
    "organisation": "The Big Brand Love"
  },
  {
    "quote": "Pavel & Radek are committed, resolute, and patient human beings. Over the many years of us working together to deliver exceptional work for some of the leading media and sports companies in the world, we've built a close friendship that has enabled us to move through challenges always in the knowledge that we will do what's best for one another, our shared interests, and our clients. To top things off, both are among the nicest people to work with in the technology industry!",
    "id": "fx-digital",
    "name": "Matthew Duhig",
    "role": "Co-founder & CEO",
    "organisation": "FX Digital"
  },
  {
    "quote": "Working with Radek and Pavel on the Konexis SaaS product was a fantastic experience. Their commitment to the project meant they took the time to understand our vision, and were always guided by our best interests and not for personal gain. Being down to earth, highly knowledgeable guys with top experience in Tech, makes both brilliant partners in any software/AI endeavour. I highly recommend them for their professionalism, selflessness, and the outstanding results their team consistently delivers.",
    "id": "konexis",
    "name": "Mohamed Abdel-Gadir",
    "role": "Product Owner",
    "organisation": "Konexis"
  },
  {
    "quote": "I've never encountered such a professional and talented app-building team. They've made the creation of our enormously complex retail app for the global marketplace look so easy it's a joy to behold. On time, on budget, aiming to please at all times … I can't speak highly enough of Radek and crew.",
    "id": "zellebrate",
    "name": "Chris Russell",
    "role": "CEO & Co-founder",
    "organisation": "zellebrate"
  }
];

export const faqs: readonly FAQ[] = [
  {
    "question": "What is Bold Ideas Consulting?",
    "answer": "Bold Ideas Consulting is your senior product, tech, and AI consulting partner. As an extension of your team, we provide honest strategy, plans, and implementation."
  },
  {
    "question": "What is a CTO (Chief Technical Officer)?",
    "answer": "A CTO leads your technical strategy and development. Many companies don't want to hire a full-time CTO and therefore choose fractional CTOs or tech consultants (like us!)."
  },
  {
    "question": "Why responsible AI?",
    "answer": "If you don't take a step back and look at your choices or AI routes, it comes with big risks. When we work with AI, we only choose the tools and solutions that make sense for the build but also for scale."
  },
  {
    "question": "Why do we work with non-profits and charities?",
    "answer": "We want to be the technical guidance for those with amazing and kind ideas that help people. To be proud of what we do."
  },
  {
    "question": "What AI tools do businesses use to develop products?",
    "answer": "Some of the AI tools used to develop are Lovable, Claude, GitHub Copilot, and Replit."
  },
  {
    "question": "What is the difference between vibe coding a product and a product ready for production?",
    "answer": "Vibe coding is great for rapid prototyping and internal tools with limited risk. For production, code needs review, testing, and a security audit. What matters isn't how the code was created, but whether it went through this process before being deployed with live data into a live environment."
  }
];

export const contact: Contact = {
  "eyebrow": "LET’S TALK",
  "headline": "Tell us what you are working towards.",
  "body": "An idea, an unfinished product or a decision you need help making: start there. Use a 30-minute conversation to explore a sensible next step.",
  "action": {
    "label": "Book a 30-minute call",
    "href": "https://calendar.app.google/LD3L1YyNKn6JrBz47",
    "external": true
  },
  "emailLabel": "Prefer email?",
  "emailHref": "mailto:get@boldideasconsulting.com",
  "bookingFallback": "If the calendar does not open, email us at get@boldideasconsulting.com."
};

export const footer: Footer = {
  "line": "Product decisions. People brought together. Ideas put to work.",
  "contactLink": {
    "label": "Contact",
    "href": "#contact"
  }
};


export const humanStory = {
  headline: ["For the people", "who’ll use it."],
  body: "Your members, your customers, the people doing the work. We help you shape a product around what they need — and bring the technical judgement and delivery team to build it with you.",
  bridge: "For one team, that meant working out a new member platform. For another, it meant getting an unfinished product live.",
  lphHeadline: "Love Peace Harmony. A community to bring together.",
  lphBody: "Love Peace Harmony brings people and communities together. Within a month, we helped define its new member platform’s first version, create a controlled working prototype and map the scope and budget for the full build.",
  mapHeadline: "A product the team could finally release.",
  mapBody: "Mapwhizz had a product to launch, but its existing application was not ready. We stabilised the backend and built a new frontend to get it live. The full backend rebuild became a subsequent phase.",
  relationshipHeadline: "Bring us the part you know best.",
  relationshipLead: "The people. The work. The reason it needs to change.",
  relationshipBody: "We’ll work through the technical decisions with you: what the product should do, what to build first and who needs to be involved. Then we can lead the delivery, work alongside your developers or help finish what is already there.",
  contactHeadline: "You can bring the unfinished version.",
  contactBody: "An early idea, a question you cannot yet answer, an app that is nearly there. Tell us what you have and who it is for. We can start from that.",
} as const;
