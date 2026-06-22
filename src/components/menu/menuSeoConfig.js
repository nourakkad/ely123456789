const menu = (nameEn, nameAr, detailEn, logo) => ({
  nameEn,
  nameAr,
  descriptionEn: `Digital menu for ${nameEn}.${detailEn ? ` ${detailEn}.` : ''} Bilingual English and Arabic. Powered by Elyptek.`,
  logo,
});

/** SEO metadata keyed by exact menu pathname (must match App.js routes & printed QR URLs). */
export const MENU_SEO_BY_PATH = {
  '/menu/chocoswamp': menu(
    'Choco Swamp',
    'شوكو سوامب',
    'Chocolate and desserts in Damascus, Syria',
    '/assets/logo/cocoswamp.png',
  ),
  '/menu/kousa-me7shi': menu(
    'Kousa Mahshi',
    'كوسا محشي',
    'Levantine cuisine by Mazmazeh, Damascus, Syria',
    '/assets/logo/kousa-me7shi.png',
  ),
  '/menu/chimney': menu(
    'Chimney Roll',
    'تشيميني رول',
    'Desserts and snacks by Mazmazeh, Damascus, Syria',
    '/assets/logo/chimney.png',
  ),
};

export const MENU_SITEMAP_PATHS = Object.keys(MENU_SEO_BY_PATH);

export const getMenuSeo = (pathname) => {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  return MENU_SEO_BY_PATH[normalized] ?? null;
};
