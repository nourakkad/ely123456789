import { DEFAULT_TITLE, OG_IMAGE, SITE_NAME } from './siteConstants';

export const JSON_LD_ID = 'elyptek-page-jsonld';

export const upsertMeta = (key, content, attr = 'name') => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const upsertLink = (rel, href) => {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export const setJsonLd = (data) => {
  let el = document.getElementById(JSON_LD_ID);
  if (!el) {
    el = document.createElement('script');
    el.id = JSON_LD_ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

export const clearJsonLd = () => {
  document.getElementById(JSON_LD_ID)?.remove();
};

export const applyPageHead = ({
  title = DEFAULT_TITLE,
  description,
  canonicalUrl,
  imageUrl = OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  robots = 'index, follow',
  jsonLd,
}) => {
  document.title = title;

  if (description) upsertMeta('description', description);
  if (robots) upsertMeta('robots', robots);
  if (canonicalUrl) upsertLink('canonical', canonicalUrl);

  upsertMeta('og:title', title, 'property');
  upsertMeta('og:description', description, 'property');
  upsertMeta('og:url', canonicalUrl, 'property');
  upsertMeta('og:type', ogType, 'property');
  upsertMeta('og:site_name', SITE_NAME, 'property');
  if (imageUrl) upsertMeta('og:image', imageUrl, 'property');

  upsertMeta('twitter:card', twitterCard);
  upsertMeta('twitter:title', title);
  upsertMeta('twitter:description', description);
  if (imageUrl) upsertMeta('twitter:image', imageUrl);

  if (jsonLd) setJsonLd(jsonLd);
  else clearJsonLd();
};

export const resetPageHead = () => {
  document.title = DEFAULT_TITLE;
  clearJsonLd();
};
