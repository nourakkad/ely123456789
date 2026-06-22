const card = (nameEn, nameAr, detailEn = '') => ({
  nameEn,
  nameAr,
  descriptionEn: `Digital contact card for ${nameEn}.${detailEn ? ` ${detailEn}.` : ''} Phone, links, and location. Powered by Elyptek.`,
});

/** SEO metadata keyed by exact contact-card pathname (must match App.js routes & printed QR URLs). */
export const CONTACT_SEO_BY_PATH = {
  '/contact/dr-mohammed-jubain': card('Dr. Mohammed Jubain', 'د. محمد جبين'),
  '/contact/crazy-beeez': card('Crazy Beeez', 'Crazy Beeez'),
  '/contact/mamon-assa': card('Mamon Assa', 'مأمون عسه'),
  '/contact/dr-nader-almzayek': card('Dr. Nader Almzayek', 'د. نادر المزيك'),
  '/contact/hussam-alhamad': card('Hussam Alhamad', 'حسام الحمد'),
  '/contact/rashid-adas': card('Rashid Adas', 'رشيد عدس'),
  '/contact/abdalrahman-adas': card('Abd Al Rahman Adas', 'عبد الرحمن عدس'),
  '/contact/yassen-altabakh': card('Yassen Altabakh', 'ياسن الطباخ'),
  '/contact/anwar-saeed-jassem': card('Anwar Saeed Jassem', 'أنور سعيد جاسم'),
  '/contact/shadi-saeed-jassem': card('Shadi Saeed Jassem', 'شادي سعيد جاسم'),
  '/contact/deau-cacao': card('Deau Cacao', 'ديو الكاكو'),
  '/contact/chocoswamp': card('Choco Swamp', 'شوكو سوامب'),
  '/contact/elyptek': card('Elyptek', 'إيليبتك', 'Software and technology solutions in Damascus, Syria.'),
  '/contact/group-imdad': card('Group Imdad', 'مجموعة إمداد'),
  '/contact/group-imdadex': card('Group Imdad', 'مجموعة إمداد'),
  '/contact/maydan': card('Maydan Creative Studio', 'مايدان كرييتيف ستوديو', 'Damascus, Syria.'),
  '/contact/muhammed-aladdin-haymour': card('Maydan Creative Studio', 'مايدان كرييتيف ستوديو', 'Damascus, Syria.'),
  '/contact/dr-hadi-alhariri': card('Dr. Hadi Nazeer Al Hariri', 'د. هادي نذير الحريري'),
  '/contact/dr-hadi-alomari': card('Dr. Hadi Alomari', 'د. هادي العمري'),
  '/contact/khalil-alokdi': card('Khalil Al-Okdi', 'خليل العقدي'),
  '/contact/arkan-ceramics': card('Arkan Ceramics', 'الأركان للسيراميك'),
  '/contact/jasmine-perfumes': card('Jasmine Perfumes Company', 'شركة جاسمين للعطور', 'Erbil, Iraq.'),
  '/contact/mazmazeh': card('Mazmazeh', 'مزمزة', 'Restaurant in Damascus, Syria.'),
  '/contact/arta': card('àrta', 'àrta', 'Creative art house.'),
  '/contact/\u00e0rta': card('àrta', 'àrta', 'Creative art house.'),
};

export const CONTACT_SITEMAP_PATHS = Object.keys(CONTACT_SEO_BY_PATH);

export const getContactSeo = (pathname) => {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  return CONTACT_SEO_BY_PATH[normalized] ?? null;
};
