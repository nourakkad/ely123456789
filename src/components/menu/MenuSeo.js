import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMenuSeo } from './menuSeoConfig';

const SITE = 'https://elyptek.com';
const JSON_LD_ID = 'elyptek-menu-jsonld';
const DEFAULT_TITLE = 'Elyptek';

const upsertMeta = (key, content, attr = 'name') => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const setJsonLd = (data) => {
  let el = document.getElementById(JSON_LD_ID);
  if (!el) {
    el = document.createElement('script');
    el.id = JSON_LD_ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const clearJsonLd = () => {
  document.getElementById(JSON_LD_ID)?.remove();
};

const MenuSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getMenuSeo(pathname);
    if (!seo) {
      document.title = DEFAULT_TITLE;
      clearJsonLd();
      return undefined;
    }

    const canonicalPath = decodeURIComponent(pathname);
    const pageUrl = `${SITE}${canonicalPath}`;
    const title = `${seo.nameEn} | Menu | Elyptek`;
    const description = seo.descriptionEn;
    const imageUrl = seo.logo ? `${SITE}${seo.logo}` : undefined;

    document.title = title;
    upsertMeta('description', description);
    upsertLink('canonical', pageUrl);

    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:url', pageUrl, 'property');
    upsertMeta('og:type', 'website', 'property');
    upsertMeta('og:site_name', 'Elyptek', 'property');
    if (imageUrl) upsertMeta('og:image', imageUrl, 'property');

    upsertMeta('twitter:card', imageUrl ? 'summary_large_image' : 'summary');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    if (imageUrl) upsertMeta('twitter:image', imageUrl);

    setJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: ['en', 'ar'],
          isPartOf: {
            '@type': 'WebSite',
            '@id': `${SITE}/#website`,
            name: 'Elyptek',
            url: SITE,
          },
        },
        {
          '@type': 'Restaurant',
          '@id': `${pageUrl}#restaurant`,
          name: seo.nameEn,
          alternateName: seo.nameAr,
          url: pageUrl,
          ...(imageUrl ? { image: imageUrl } : {}),
          hasMenu: {
            '@type': 'Menu',
            '@id': `${pageUrl}#menu`,
            name: `${seo.nameEn} Menu`,
            url: pageUrl,
            inLanguage: ['en', 'ar'],
          },
        },
        {
          '@type': 'Organization',
          '@id': `${SITE}/#organization`,
          name: 'Elyptek',
          url: SITE,
          description: 'Software and technology solutions.',
        },
      ],
    });

    return () => {
      document.title = DEFAULT_TITLE;
      clearJsonLd();
    };
  }, [pathname]);

  return null;
};

export default MenuSeo;
