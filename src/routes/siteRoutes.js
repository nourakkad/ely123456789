/** Main site section paths (must not overlap /contact/* cards or /menu/*). */
export const SITE_SECTIONS = {
  home: '/',
  services: '/services',
  about: '/about',
  team: '/team',
  portfolio: '/portfolio',
  contact: '/contact',
  careers: '/form',
};

export const isSiteSectionPath = (pathname) => {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  return Object.values(SITE_SECTIONS).includes(normalized);
};
