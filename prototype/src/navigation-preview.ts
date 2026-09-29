export type NavigationVariant = 'classic' | 'glass' | 'expanding';

// The chosen expanding navigation is the default; review variants remain explicit.
export function navigationVariant(search: string): NavigationVariant {
  const requested = new URLSearchParams(search).get('nav');
  return requested === 'glass' || requested === 'classic' ? requested : 'expanding';
}

export function withNavigationPreview(href: string, variant: NavigationVariant): string {
  if ((!href.startsWith('/') && !href.startsWith('#')) || href.startsWith('//')) return href;
  const separator = href.indexOf('#');
  const path = separator < 0 ? href : href.slice(0, separator);
  const hash = separator < 0 ? '' : href.slice(separator);
  const [pathname, search = ''] = path.split('?');
  const parameters = new URLSearchParams(search);
  if (variant === 'expanding') parameters.delete('nav');
  else parameters.set('nav', variant);
  const query = parameters.toString();
  return `${pathname}${query ? `?${query}` : ''}${hash}`;
}
