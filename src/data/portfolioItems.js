import { getPortfolioCaseStudyPath } from '../routes/siteRoutes';
import { SITE } from '../seo/siteConstants';

export { getPortfolioCaseStudyPath };

/** Shared portfolio catalog — used by Portfolio UI, case studies, and SEO/JSON-LD. */
export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    slug: 'kma',
    title: 'KMA',
    categoryEn: 'KMA FOR GAS STATION SERVICES',
    categoryAr: 'شركة القمة لخدمات محطات الوقود',
    image: '/assets/logo/KMA.png',
    facebook: 'https://www.facebook.com/profile.php?id=61572372762233',
    website: 'https://kma-sy.com/',
    summaryEn:
      'Elyptek designed and developed the KMA website for gas station services in Syria. The project gives KMA a clear digital presence for their fuel-station offering and company identity online.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع شركة القمة (KMA) لخدمات محطات الوقود في سوريا. يمنح المشروع الشركة حضوراً رقمياً واضحاً لخدماتها وهويتها على الإنترنت.',
    servicesEn: ['Web design', 'Web development', 'Brand presence'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع', 'حضور العلامة التجارية'],
  },
  {
    id: 2,
    slug: 'tembix',
    title: 'Tembix',
    categoryEn: 'Composite Decking & Flooring Solutions',
    categoryAr: 'حلول الأرضيات والترصيع المركبة',
    image: '/assets/logo/Tembix.png',
    instagram: 'https://www.instagram.com/tembix/',
    facebook: 'https://www.facebook.com/tembix',
    website: 'https://timbex-sy.com/',
    summaryEn:
      'Elyptek designed and developed the Tembix website for composite decking and flooring solutions. The site presents their products and brand to customers looking for durable outdoor and interior flooring.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع تيمبكس لحلول الأرضيات والترصيع المركبة. يعرض الموقع منتجاتهم وعلامتهم للعملاء الباحثين عن أرضيات متينة للداخل والخارج.',
    servicesEn: ['Web design', 'Web development'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع'],
  },
  {
    id: 3,
    slug: 'sabco',
    title: 'Sabco',
    categoryEn: 'Polystyrene & Thermal Insulation',
    categoryAr: 'البوليسترين والعزل الحراري',
    image: '/assets/logo/Sabco.png',
    instagram: 'https://www.instagram.com/sabco/',
    facebook: 'https://www.facebook.com/sabco',
    website: 'https://sabco.com.sy/',
    summaryEn:
      'Elyptek designed and developed the Sabco website for polystyrene and thermal insulation. The project showcases Sabco’s industrial offering with a professional online presence built by Elyptek.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع سابكو للبوليسترين والعزل الحراري. يعرض المشروع عرض الشركة الصناعي بحضور مهني على الإنترنت من إعداد إيليبتك.',
    servicesEn: ['Web design', 'Web development'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع'],
  },
  {
    id: 4,
    slug: 'global-visionary-minds',
    title: 'Global Visionary Minds',
    categoryEn: 'Empowering Change Through Community',
    categoryAr: 'تمكين التغيير من خلال المجتمع',
    image: '/assets/logo/gvm.png',
    website: 'https://globalvisionaryminds.com/',
    summaryEn:
      'Elyptek designed and developed the Global Visionary Minds website to support a community-focused organization. The site communicates their mission and makes their work easier to discover online.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع Global Visionary Minds لدعم منظمة تركّز على المجتمع. يوضّح الموقع رسالتهم ويسهّل اكتشاف أعمالهم عبر الإنترنت.',
    servicesEn: ['Web design', 'Web development'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع'],
  },
  {
    id: 5,
    slug: 'damascus-gin',
    title: 'Damascus Gin',
    categoryEn: 'Premium Craft Gin Distillery',
    categoryAr: 'مصنع جين حرفي فاخر',
    image: '/assets/logo/damascusgin.png',
    instagram: 'https://www.instagram.com/damascusgin/',
    facebook: 'https://www.facebook.com/damascusgin',
    website: 'https://damascusgin.com/',
    summaryEn:
      'Elyptek designed and developed the Damascus Gin website for a premium craft gin distillery. The project presents the brand story and product presence with a polished digital experience made by Elyptek.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع دمشق جين لمصنع جين حرفي فاخر. يعرض المشروع قصة العلامة ومنتجاتها بتجربة رقمية أنيقة من إعداد إيليبتك.',
    servicesEn: ['Web design', 'Web development', 'Brand presence'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع', 'حضور العلامة التجارية'],
  },
  {
    id: 6,
    slug: 'khalil-al-okdi',
    title: 'Khalil Al-Okdi',
    categoryEn: 'Trading, Industry & Contracting Establishment',
    categoryAr: 'تجارة وصناعة ومقاولات',
    image: '/assets/logo/khalil al-okadi.png',
    facebook: 'https://www.facebook.com/share/17XWzpfb6f/',
    instagram: 'https://www.instagram.com/khalilokdi/',
    website: 'https://khalilokdi.com/',
    summaryEn:
      'Elyptek designed and developed the Khalil Al-Okdi website for a trading, industry, and contracting establishment. The site gives the company a clear corporate presence and online entry point for clients.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع خليل العقدي لمؤسسة تعمل في التجارة والصناعة والمقاولات. يمنح الموقع الشركة حضوراً مؤسسياً واضحاً ونقطة تواصل عبر الإنترنت.',
    servicesEn: ['Web design', 'Web development'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع'],
  },
  {
    id: 7,
    slug: 'luxury777',
    title: 'Luxury777',
    categoryEn: 'Luxury Car Rentals — Dubai, UAE',
    categoryAr: 'تأجير سيارات فاخرة — دبي، الإمارات',
    image: '/assets/logo/luxury777.png',
    logoVariant: 'dark',
    instagram: 'https://www.instagram.com/luxury777carrental/',
    facebook: 'https://www.facebook.com/0luxury777',
    website: 'https://luxury777.ae/',
    summaryEn:
      'Elyptek designed and developed the Luxury777 website for luxury car rentals in Dubai. The project highlights their fleet and brand for customers seeking premium vehicle rental in the UAE.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع Luxury777 لتأجير السيارات الفاخرة في دبي. يبرز المشروع أسطولهم وعلامتهم للعملاء الباحثين عن تأجير فاخر في الإمارات.',
    servicesEn: ['Web design', 'Web development'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع'],
  },
  {
    id: 8,
    slug: 'arta',
    title: 'àrta',
    categoryEn: 'Creative Art House',
    categoryAr: 'دار فن إبداعي',
    image: '/assets/logo/arta.jpg',
    logoVariant: 'large',
    facebook: 'https://www.facebook.com/share/1bdNRB1ZwH/',
    instagram: 'https://www.instagram.com/arta_creative_art_house/',
    website: 'https://àrta.com/',
    summaryEn:
      'Elyptek designed and developed the àrta website for a creative art house. The site presents their artistic identity and makes the studio easier to find and explore online.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع àrta لدار فن إبداعي. يعرض الموقع هويتهم الفنية ويسهّل اكتشاف الاستوديو عبر الإنترنت.',
    servicesEn: ['Web design', 'Web development', 'Brand presence'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع', 'حضور العلامة التجارية'],
  },
  {
    id: 9,
    slug: 'dr-academy',
    title: 'Dr-Academy',
    categoryEn: 'Online Learning & Medical Workshops',
    categoryAr: 'منصة تعليم إلكترونية وورشات طبية',
    image: '/assets/logo/dr-academy.png',
    website: 'https://dr-academy.tech/',
    summaryEn:
      'Elyptek designed and developed the Dr-Academy website for online learning and medical workshops. The project supports their education offering with a clear, accessible digital platform.',
    summaryAr:
      'صمّمت وطوّرت إيليبتك موقع Dr-Academy للتعليم الإلكتروني والورشات الطبية. يدعم المشروع عرضهم التعليمي بمنصة رقمية واضحة وسهلة الوصول.',
    servicesEn: ['Web design', 'Web development'],
    servicesAr: ['تصميم مواقع', 'تطوير مواقع'],
  },
];

export const PORTFOLIO_CLIENT_NAMES = PORTFOLIO_ITEMS.map((item) => item.title);

export const PORTFOLIO_META_DESCRIPTION =
  `Elyptek projects and clients — websites designed and developed by Elyptek for ${PORTFOLIO_CLIENT_NAMES.join(', ')}. Explore our portfolio of customer work.`;

export const getPortfolioItemBySlug = (slug) =>
  PORTFOLIO_ITEMS.find((item) => item.slug === slug) ?? null;

export const getPortfolioImageAlt = (item, isAr = false) => {
  const category = isAr ? item.categoryAr : item.categoryEn;
  return `${item.title} — ${category}`;
};

export const getPortfolioCaseStudyMeta = (item) => ({
  title: `${item.title} | Elyptek Project`,
  description:
    `${item.title} — website designed and developed by Elyptek. ${item.categoryEn}. View this Elyptek client project and visit the live site.`,
});

const itemSameAs = (item) =>
  [item.website, item.instagram, item.facebook].filter(Boolean);

export const buildPortfolioItemListJsonLd = (pageUrl) => ({
  '@type': 'ItemList',
  '@id': `${pageUrl}#itemlist`,
  name: 'Elyptek Portfolio Projects',
  description: PORTFOLIO_META_DESCRIPTION,
  numberOfItems: PORTFOLIO_ITEMS.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: PORTFOLIO_ITEMS.map((item, index) => {
    const caseUrl = `${SITE}${getPortfolioCaseStudyPath(item.slug)}`;
    const sameAs = itemSameAs(item);
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: caseUrl,
      item: {
        '@type': 'CreativeWork',
        '@id': `${caseUrl}#project`,
        name: item.title,
        alternateName: item.categoryAr,
        description: item.summaryEn,
        url: caseUrl,
        image: `${SITE}${encodeURI(item.image)}`,
        creator: { '@id': `${SITE}/#organization` },
        ...(sameAs.length ? { sameAs } : {}),
      },
    };
  }),
});

export const buildPortfolioCaseStudyJsonLd = (item, pageUrl) => {
  const sameAs = itemSameAs(item);

  return {
    '@type': 'CreativeWork',
    '@id': `${pageUrl}#project`,
    name: item.title,
    alternateName: item.categoryAr,
    description: item.summaryEn,
    url: pageUrl,
    image: `${SITE}${encodeURI(item.image)}`,
    creator: { '@id': `${SITE}/#organization` },
    provider: { '@id': `${SITE}/#organization` },
    about: item.categoryEn,
    ...(item.website
      ? {
          mainEntity: {
            '@type': 'WebSite',
            name: item.title,
            url: item.website,
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `${SITE}/portfolio#webpage`,
      name: 'Elyptek Portfolio',
      url: `${SITE}/portfolio`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Portfolio',
          item: `${SITE}/portfolio`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: item.title,
          item: pageUrl,
        },
      ],
    },
  };
};
