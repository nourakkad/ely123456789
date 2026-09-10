/** Shared EN/AR language helpers for site + contact cards. */

export const normalizeLang = (value) => {
  if (!value) return null;
  const upper = String(value).trim().toUpperCase();
  return upper === 'EN' || upper === 'AR' ? upper : null;
};

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'EN';
  const fromUrl = normalizeLang(new URLSearchParams(window.location.search).get('lang'));
  if (fromUrl) return fromUrl;
  const fromStorage = normalizeLang(localStorage.getItem('language'));
  if (fromStorage) return fromStorage;
  return 'EN';
};

/**
 * Persist language to localStorage + URL (?lang=) and notify listeners.
 * URL sync prevents contact cards from snapping back to AR after remount
 * when the page was opened with ?lang=AR.
 */
export const applySiteLanguage = (lang, { replace = true } = {}) => {
  const next = normalizeLang(lang) || 'EN';
  if (typeof window === 'undefined') return next;

  localStorage.setItem('language', next);

  const url = new URL(window.location.href);
  url.searchParams.set('lang', next);
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  if (replace) {
    window.history.replaceState({}, '', nextUrl);
  } else {
    window.history.pushState({}, '', nextUrl);
  }

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: next } }));
  return next;
};
