import { ArrowUpRight, Globe2, ShieldCheck, UsersRound, MoveUpRight } from 'lucide-react';
import { opticalCopy } from '../optical-content';
import { ContentReveal } from './ContentReveal';
import { TextReveal } from './TextReveal';
import { BrandJunction } from './BrandJunction';

const benefitIcons = {
  experience: Globe2,
  'responsible-ai': ShieldCheck,
  team: UsersRound,
  delivery: MoveUpRight,
} as const;

export function AboutSection() {
  return <section className="about-section wrap" id="about" aria-labelledby="about-title">
    <div className="about-section-heading">
      <TextReveal id="about-title" lines={['Your senior technical lead,', 'but without the judgement.']} />
    </div>
    <ul className="about-benefits">
      {opticalCopy.about.benefits.map((benefit, index) => {
        const Icon = benefitIcons[benefit.id];
        return <li className="about-benefit" key={benefit.id}>
          {['tl', 'tr', 'bl', 'br'].map(corner => <BrandJunction key={corner} className={`benefit-junction--${corner}`} />)}
          <ContentReveal className="about-benefit-content" delay={100 + index * 70}>
            <Icon className="about-benefit-icon" size={34} strokeWidth={1.4} aria-hidden="true" />
            <div className="about-benefit-copy"><h3>{benefit.title}</h3><p>{benefit.body}</p></div>
          </ContentReveal>
        </li>;
      })}
    </ul>
    <ContentReveal className="about-section-action"><a className="text-link" href="#contact">Get to know us<ArrowUpRight size={19} aria-hidden="true" /></a></ContentReveal>
  </section>;
}
