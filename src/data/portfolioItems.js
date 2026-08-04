import { SITE } from '../seo/siteConstants';

/** Shared portfolio catalog — used by Portfolio UI and SEO/JSON-LD. */
export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'KMA',
    categoryEn: 'KMA FOR GAS STATION SERVICES',
    categoryAr: 'شركة القمة لخدمات محطات الوقود',
    image: '/assets/logo/KMA.png',
    facebook: 'https://www.facebook.com/profile.php?id=61572372762233',
    website: 'https://kma-sy.com',
  },
  {
    id: 2,
    title: 'Tembix',
    categoryEn: 'Composite Decking & Flooring Solutions',
    categoryAr: 'حلول الأرضيات والترصيع المركبة',
    image: '/assets/logo/Tembix.png',
    instagram: 'https://www.instagram.com/tembix/',
    facebook: 'https://www.facebook.com/tembix',
    website: 'https://timbex-sy.com/',
  },
  {
    id: 3,
    title: 'Sabco',
    categoryEn: 'Polystyrene & Thermal Insulation',
    categoryAr: 'البوليسترين والعزل الحراري',
    image: '/assets/logo/Sabco.png',
    instagram: 'https://www.instagram.com/sabco/',
    facebook: 'https://www.facebook.com/sabco',
    website: 'https://sabco.com.sy/',
  },
  {
    id: 4,
    title: 'Global Visionary Minds',
    categoryEn: 'Empowering Change Through Community',
    categoryAr: 'تمكين التغيير من خلال المجتمع',
    image: '/assets/logo/gvm.png',
    website: 'https://globalvisionaryminds.com/',
  },
  {
    id: 5,
    title: 'Damascus Gin',
    categoryEn: 'Premium Craft Gin Distillery',
    categoryAr: 'مصنع جين حرفي فاخر',
    image: '/assets/logo/damascusgin.png',
    instagram: 'https://www.instagram.com/damascusgin/',
    facebook: 'https://www.facebook.com/damascusgin',
    website: 'https://damascusgin.com',
  },
  {
    id: 6,
    title: 'Khalil Al-Okdi',
    categoryEn: 'Trading, Industry & Contracting Establishment',
    categoryAr: 'تجارة وصناعة ومقاولات',
    image: '/assets/logo/khalil al-okadi.png',
    facebook: 'https://www.facebook.com/share/17XWzpfb6f/',
    instagram: 'https://www.instagram.com/khalilokdi/',
    website: 'https://khalilokdi.com/',
  },
  {
    id: 7,
    title: 'Luxury777',
    categoryEn: 'Luxury Car Rentals — Dubai, UAE',
    categoryAr: 'تأجير سيارات فاخرة — دبي، الإمارات',
    image: '/assets/logo/luxury777.png',
    logoVariant: 'dark',
    website: 'https://luxury777.ae/',
  },
  {
    id: 8,
    title: 'àrta',
    categoryEn: 'Creative Art House',
    categoryAr: 'دار فن إبداعي',
    image: '/assets/logo/arta.jpg',
    logoVariant: 'large',
    facebook: 'https://www.facebook.com/share/1bdNRB1ZwH/',
    instagram: 'https://www.instagram.com/arta_creative_art_house/',
    website: 'https://àrta.com',
  },
  {
    id: 9,
    title: 'Dr-Academy',
    categoryEn: 'Online Learning & Medical Workshops',
    categoryAr: 'منصة تعليم إلكترونية وورشات طبية',
    image: '/assets/logo/dr-academy.png',
    website: 'https://dr-academy.tech',
  },
];

export const PORTFOLIO_CLIENT_NAMES = PORTFOLIO_ITEMS.map((item) => item.title);

export const PORTFOLIO_META_DESCRIPTION =
  `Elyptek portfolio — web, software, and digital work for ${PORTFOLIO_CLIENT_NAMES.join(', ')}.`;

export const getPortfolioImageAlt = (item, isAr = false) => {
  const category = isAr ? item.categoryAr : item.categoryEn;
  return `${item.title} — ${category}`;
};

export const buildPortfolioItemListJsonLd = (pageUrl) => ({
  '@type': 'ItemList',
  '@id': `${pageUrl}#itemlist`,
  name: 'Elyptek Portfolio Projects',
  description: PORTFOLIO_META_DESCRIPTION,
  numberOfItems: PORTFOLIO_ITEMS.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: PORTFOLIO_ITEMS.map((item, index) => {
    const sameAs = [item.website, item.instagram, item.facebook].filter(Boolean);
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#project-${item.id}`,
        name: item.title,
        alternateName: item.categoryAr,
        description: item.categoryEn,
        url: item.website || pageUrl,
        image: `${SITE}${item.image}`,
        creator: { '@id': `${SITE}/#organization` },
        ...(sameAs.length ? { sameAs } : {}),
      },
    };
  }),
});
