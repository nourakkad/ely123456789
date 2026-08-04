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

export const getPortfolioCaseStudyPath = (slug) => `/portfolio/${slug}`;

export const isSiteSectionPath = (pathname) => {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  if (Object.values(SITE_SECTIONS).includes(normalized)) return true;
  return /^\/portfolio\/[^/]+$/.test(normalized);
};
