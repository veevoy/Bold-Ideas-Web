/** The same curved four-point junction used by the hero, CTA and testimonials. */
export function BrandJunction({ className = '' }: { className?: string }) {
  return <svg className={`brand-junction ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 0C13.8 7.2 16.8 10.2 24 12C16.8 13.8 13.8 16.8 12 24C10.2 16.8 7.2 13.8 0 12C7.2 10.2 10.2 7.2 12 0Z" />
  </svg>;
}
