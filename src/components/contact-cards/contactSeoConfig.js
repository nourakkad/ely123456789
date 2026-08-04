/**
 * Contact-card SEO — framed as professional network relationships with Elyptek,
 * not as portfolio clients.
 */
const relation = (nameEn, nameAr, options = {}) => {
  const {
    detailEn = '',
    entityType = 'person',
    roleEn = '',
    roleAr = '',
  } = options;

  const roleBit = roleEn ? ` (${roleEn})` : '';
  const detailBit = detailEn ? ` ${detailEn}.` : '';

  return {
    nameEn,
    nameAr,
    entityType,
    roleEn,
    roleAr,
    descriptionEn:
      `Official digital contact card for ${nameEn}${roleBit} — a professional network relation of Elyptek.${detailBit} ` +
      `Phone, email, and social links. Powered by Elyptek.`,
    descriptionAr:
      `بطاقة تواصل رقمية رسمية لـ ${nameAr}${roleAr ? ` (${roleAr})` : ''} — علاقة مهنية ضمن شبكة إيليبتك.` +
      `${detailEn ? ` ${detailEn}.` : ''} هاتف وبريد وروابط. بدعم إيليبتك.`,
  };
};

/** SEO metadata keyed by exact contact-card pathname (must match App.js routes & printed QR URLs). */
export const CONTACT_SEO_BY_PATH = {
  '/contact/dr-mohammed-jubain': relation('Dr. Mohammed Jubain', 'د. محمد جبين', {
    roleEn: 'Urological Consultant Surgeon',
    roleAr: 'استشاري جراحة المسالك البولية',
  }),
  '/contact/crazy-beeez': relation('Crazy Beeez', 'Crazy Beeez', {
    entityType: 'organization',
    roleEn: 'Creative brand',
    roleAr: 'علامة إبداعية',
  }),
  '/contact/mamon-assa': relation('Mamon Assa', 'مأمون عسه'),
  '/contact/dr-nader-almzayek': relation('Dr. Nader Almzayek', 'د. نادر المزيك', {
    roleEn: 'Medical professional',
    roleAr: 'طبيب',
  }),
  '/contact/hussam-alhamad': relation('Hussam Alhamad', 'حسام الحمد'),
  '/contact/rashid-adas': relation('Rashid Adas', 'رشيد عدس', {
    roleEn: 'KMA Co. Founder',
    roleAr: 'مؤسس شركة القمة',
  }),
  '/contact/abdalrahman-adas': relation('Abd Al Rahman Adas', 'عبد الرحمن عدس', {
    roleEn: 'Marketing and Development Manager at KMA Co.',
    roleAr: 'مدير التطوير والتسويق في شركة القمة',
  }),
  '/contact/yassen-altabakh': relation('Yassen Altabakh', 'ياسن الطباخ', {
    roleEn: 'Executive Manager at KMA Co.',
    roleAr: 'مدير تنفيذي في شركة القمة',
  }),
  '/contact/anwar-saeed-jassem': relation('Anwar Saeed Jassem', 'أنور سعيد جاسم', {
    roleEn: 'General Manager at KMA Co.',
    roleAr: 'المدير العام في شركة القمة',
  }),
  '/contact/shadi-saeed-jassem': relation('Shadi Saeed Jassem', 'شادي سعيد جاسم', {
    roleEn: 'Technical Support at KMA Co.',
    roleAr: 'قسم الدعم الفني في شركة القمة',
  }),
  '/contact/deau-cacao': relation('Deau Cacao', 'ديو الكاكو', {
    entityType: 'organization',
    roleEn: 'Chocolate brand',
    roleAr: 'علامة شوكولا',
  }),
  '/contact/chocoswamp': relation('Choco Swamp', 'شوكو سوامب', {
    entityType: 'organization',
    roleEn: 'Dessert brand',
    roleAr: 'علامة حلويات',
  }),
  '/contact/elyptek': relation('Elyptek', 'إيليبتك', {
    entityType: 'organization',
    roleEn: 'Software and digital solutions',
    roleAr: 'حلول برمجية ورقمية',
    detailEn: 'Damascus, Syria',
  }),
  '/contact/group-imdad': relation('Group Imdad', 'مجموعة إمداد', {
    entityType: 'organization',
  }),
  '/contact/group-imdadex': relation('Group Imdad', 'مجموعة إمداد', {
    entityType: 'organization',
  }),
  '/contact/maydan': relation('Maydan Creative Studio', 'مايدان كرييتيف ستوديو', {
    entityType: 'organization',
    roleEn: 'Creative studio',
    roleAr: 'استوديو إبداعي',
    detailEn: 'Damascus, Syria',
  }),
  '/contact/muhammed-aladdin-haymour': relation('Maydan Creative Studio', 'مايدان كرييتيف ستوديو', {
    entityType: 'organization',
    roleEn: 'Creative studio',
    roleAr: 'استوديو إبداعي',
    detailEn: 'Damascus, Syria',
  }),
  '/contact/dr-hadi-alhariri': relation('Dr. Hadi Nazeer Al Hariri', 'د. هادي نذير الحريري', {
    roleEn: 'Medical professional',
    roleAr: 'طبيب',
  }),
  '/contact/dr-hadi-alomari': relation('Dr. Hadi Alomari', 'د. هادي العمري', {
    roleEn: 'Medical professional',
    roleAr: 'طبيب',
  }),
  '/contact/khalil-alokdi': relation('Khalil Al-Okdi', 'خليل العقدي', {
    entityType: 'organization',
    roleEn: 'Trading, industry & contracting',
    roleAr: 'تجارة وصناعة ومقاولات',
  }),
  '/contact/arkan-ceramics': relation('Arkan Ceramics', 'الأركان للسيراميك', {
    entityType: 'organization',
    roleEn: 'Ceramics company',
    roleAr: 'شركة سيراميك',
  }),
  '/contact/jasmine-perfumes': relation('Jasmine Perfumes Company', 'شركة جاسمين للعطور', {
    entityType: 'organization',
    roleEn: 'Perfume company',
    roleAr: 'شركة عطور',
    detailEn: 'Erbil, Iraq',
  }),
  '/contact/mazmazeh': relation('Mazmazeh', 'مزمزة', {
    entityType: 'organization',
    roleEn: 'Restaurant',
    roleAr: 'مطعم',
    detailEn: 'Damascus, Syria',
  }),
  '/contact/arta': relation('àrta', 'àrta', {
    entityType: 'organization',
    roleEn: 'Creative art house',
    roleAr: 'دار فن إبداعي',
  }),
  '/contact/\u00e0rta': relation('àrta', 'àrta', {
    entityType: 'organization',
    roleEn: 'Creative art house',
    roleAr: 'دار فن إبداعي',
  }),
  '/contact/watad-agro': relation('Watad Agro Syria', 'وتد Agro سوريا', {
    entityType: 'organization',
    roleEn: 'Agriculture and agro solutions',
    roleAr: 'الزراعة والحلول الزراعية',
    detailEn: 'Syria',
  }),
  '/contact/osama-azmeh': relation('Osama Azmeh', 'أسامة أزمه', {
    roleEn: 'Videographer',
    roleAr: 'مصور فيديو',
  }),
  '/contact/hiam-clinic': relation('Hiam Clinic', 'HIAM Clinic', {
    entityType: 'organization',
    roleEn: 'Cosmetic clinic',
    roleAr: 'عيادة تجميل',
    detailEn: 'Damascus and Abu Dhabi branches',
  }),
};

export const CONTACT_SITEMAP_PATHS = Object.keys(CONTACT_SEO_BY_PATH);

export const getContactSeo = (pathname) => {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  return CONTACT_SEO_BY_PATH[normalized] ?? null;
};

/** JSON-LD ProfilePage + Person/Organization framing a network relation of Elyptek. */
export const buildContactRelationJsonLd = (pageUrl, contact) => {
  const isOrg = contact.entityType === 'organization';
  const entityId = `${pageUrl}#${isOrg ? 'organization' : 'person'}`;

  const entity = {
    '@type': isOrg ? 'Organization' : 'Person',
    '@id': entityId,
    name: contact.nameEn,
    alternateName: contact.nameAr,
    url: pageUrl,
    ...(contact.roleEn
      ? isOrg
        ? { description: contact.roleEn }
        : { jobTitle: contact.roleEn }
      : {}),
    ...(isOrg
      ? { memberOf: { '@id': 'https://elyptek.com/#organization' } }
      : { affiliation: { '@id': 'https://elyptek.com/#organization' } }),
  };

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${contact.nameEn} | Network Contact | Elyptek`,
    description: contact.descriptionEn,
    inLanguage: ['en', 'ar'],
    isPartOf: { '@id': 'https://elyptek.com/#website' },
    about: { '@id': entityId },
    mainEntity: { '@id': entityId },
    publisher: { '@id': 'https://elyptek.com/#organization' },
    relatedLink: 'https://elyptek.com/',
  };

  return { profilePage, entity };
};
