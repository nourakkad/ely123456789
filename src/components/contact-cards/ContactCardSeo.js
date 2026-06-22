import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getContactSeo } from './contactSeoConfig';

const SITE = 'https://elyptek.com';
const JSON_LD_ID = 'elyptek-contact-card-jsonld';
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

const ContactCardSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getContactSeo(pathname);
    if (!seo) {
      document.title = DEFAULT_TITLE;
      clearJsonLd();
      return undefined;
    }

    const canonicalPath = decodeURIComponent(pathname);
    const pageUrl = `${SITE}${canonicalPath}`;
    const title = `${seo.nameEn} | Contact Card | Elyptek`;
    const description = seo.descriptionEn;

    document.title = title;
    upsertMeta('description', description);
    upsertLink('canonical', pageUrl);

    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:url', pageUrl, 'property');
    upsertMeta('og:type', 'website', 'property');
    upsertMeta('og:site_name', 'Elyptek', 'property');

    upsertMeta('twitter:card', 'summary');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);

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

export default ContactCardSeo;
