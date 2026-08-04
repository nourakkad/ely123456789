import { CONTACT_EMAIL } from '../env/publicConfig';

export const SITE = 'https://elyptek.com';
export const SITE_NAME = 'Elyptek';
export const DEFAULT_TITLE = 'Elyptek';
export const DEFAULT_DESCRIPTION =
  'Elyptek delivers digital marketing, web development, and custom software solutions for businesses in Syria and beyond.';
export const OG_IMAGE = `${SITE}/assets/images/logo13.png`;
export const ELYPTEK_PHONE = '+963993887774';

export const ELYPTEK_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Shaalan',
  addressLocality: 'Damascus',
  addressCountry: 'SY',
};

export const ELYPTEK_ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: SITE_NAME,
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
  },
  image: OG_IMAGE,
  email: CONTACT_EMAIL,
  telephone: ELYPTEK_PHONE,
  description: DEFAULT_DESCRIPTION,
  address: ELYPTEK_ADDRESS,
  sameAs: [
    'https://www.facebook.com/share/1FTGLY6bvR/',
    'https://www.instagram.com/elyptek.co',
  ],
};

export const ELYPTEK_PROFESSIONAL_SERVICE = {
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#service`,
  name: SITE_NAME,
  url: SITE,
  image: OG_IMAGE,
  telephone: ELYPTEK_PHONE,
  priceRange: '$$',
  description: DEFAULT_DESCRIPTION,
  address: ELYPTEK_ADDRESS,
  areaServed: { '@type': 'Country', name: 'Syria' },
  provider: { '@id': `${SITE}/#organization` },
};

export const ELYPTEK_WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: SITE_NAME,
  url: SITE,
  inLanguage: ['en', 'ar'],
  publisher: { '@id': `${SITE}/#organization` },
};
