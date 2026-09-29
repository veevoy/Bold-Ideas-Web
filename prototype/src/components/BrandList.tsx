import { BrandJunction } from './BrandJunction';

/** One bullet treatment for editorial copy and service inclusions. */
export function BrandList({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return <ul className={`brand-list ${className}`} role="list">
    {items.map((item, index) => <li key={index}>
      <BrandJunction className="brand-list-marker" />
      <span>{item}</span>
    </li>)}
  </ul>;
}
