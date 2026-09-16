/** Shared EN/AR language helpers for site + contact cards. */

export const normalizeLang = (value) => {
  if (!value) return null;
  const upper = String(value).trim().toUpperCase();
  return upper === 'EN' || upper === 'AR' ? upper : null;
};

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'EN';
  try {
    const fromUrl = normalizeLang(new URLSearchParams(window.location.search).get('lang'));
    if (fromUrl) return fromUrl;
    const fromStorage = normalizeLang(localStorage.getItem('language'));
    if (fromStorage) return fromStorage;
  } catch (_) {
    // Safari private mode / blocked storage
  }
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

  try {
    localStorage.setItem('language', next);
  } catch (_) {
    // Safari private mode can throw QuotaExceededError
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (replace) {
      window.history.replaceState({}, '', nextUrl);
    } else {
      window.history.pushState({}, '', nextUrl);
    }
  } catch (_) {
    // Ignore malformed URL edge cases
  }

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: next } }));
  return next;
};
