export function pageForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/case-studies' || path === '/work') return 'case-studies';
  if (path.startsWith('/work/')) return 'case-study';
  if (path === '/services') return 'services';
  if (path === '/testimonials') return 'testimonials';
  return 'home';
}

export function navigationHref(href: string, isHome: boolean) {
  return href.startsWith('#') && !isHome ? `/${href}` : href;
}
