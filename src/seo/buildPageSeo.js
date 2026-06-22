import { getContactSeo } from '../components/contact-cards/contactSeoConfig';
import { getMenuSeo } from '../components/menu/menuSeoConfig';
import { getSiteSeo } from './siteSeoConfig';
import {
  DEFAULT_DESCRIPTION,
  ELYPTEK_ORGANIZATION,
  ELYPTEK_WEBSITE,
  OG_IMAGE,
  SITE,
  SITE_NAME,
} from './siteConstants';

const normalizePath = (pathname) => decodeURIComponent(pathname).replace(/\/+$/, '') || '/';

const webPageNode = (pageUrl, title, description) => ({
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: title,
  description,
  inLanguage: ['en', 'ar'],
  isPartOf: { '@id': `${SITE}/#website` },
});

export const buildPageSeoPayload = (pathname) => {
  const path = normalizePath(pathname);
  const pageUrl = `${SITE}${path}`;

  const contact = getContactSeo(path);
  if (contact) {
    const title = `${contact.nameEn} | Contact Card | ${SITE_NAME}`;
    const description = contact.descriptionEn;
    return {
      title,
      description,
      canonicalUrl: pageUrl,
      imageUrl: OG_IMAGE,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [webPageNode(pageUrl, title, description), ELYPTEK_ORGANIZATION, ELYPTEK_WEBSITE],
      },
    };
  }

  const menu = getMenuSeo(path);
  if (menu) {
    const title = `${menu.nameEn} | Menu | ${SITE_NAME}`;
    const description = menu.descriptionEn;
    const imageUrl = menu.logo ? `${SITE}${menu.logo}` : OG_IMAGE;
    return {
      title,
      description,
      canonicalUrl: pageUrl,
      imageUrl,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          webPageNode(pageUrl, title, description),
          {
            '@type': 'Restaurant',
            '@id': `${pageUrl}#restaurant`,
            name: menu.nameEn,
            alternateName: menu.nameAr,
            url: pageUrl,
            image: imageUrl,
            hasMenu: {
              '@type': 'Menu',
              '@id': `${pageUrl}#menu`,
              name: `${menu.nameEn} Menu`,
              url: pageUrl,
              inLanguage: ['en', 'ar'],
            },
          },
          ELYPTEK_ORGANIZATION,
          ELYPTEK_WEBSITE,
        ],
      },
    };
  }

  const site = getSiteSeo(path);
  if (site) {
    if (site.jsonLdType === 'home') {
      return {
        title: site.title,
        description: site.description,
        canonicalUrl: pageUrl,
        imageUrl: OG_IMAGE,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            ELYPTEK_WEBSITE,
            ELYPTEK_ORGANIZATION,
            {
              ...webPageNode(pageUrl, site.title, site.description),
              about: { '@id': `${SITE}/#organization` },
            },
            {
              '@type': 'ProfessionalService',
              '@id': `${SITE}/#service`,
              name: SITE_NAME,
              url: SITE,
              image: OG_IMAGE,
              description: site.description,
              areaServed: { '@type': 'Country', name: 'Syria' },
              provider: { '@id': `${SITE}/#organization` },
            },
          ],
        },
      };
    }

    return {
      title: site.title,
      description: site.description,
      canonicalUrl: pageUrl,
      imageUrl: OG_IMAGE,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          webPageNode(pageUrl, site.title, site.description),
          ELYPTEK_ORGANIZATION,
          ELYPTEK_WEBSITE,
        ],
      },
    };
  }

  return {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    canonicalUrl: pageUrl,
    imageUrl: OG_IMAGE,
    jsonLd: null,
  };
};
