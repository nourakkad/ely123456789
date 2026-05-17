/**
 * CRA exposes env vars prefixed with REACT_APP_.
 * Restart the dev server after changing .env files.
 */
function envString(key, fallback) {
  const raw = process.env[key];
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed !== '') return trimmed;
  }
  return fallback;
}

/** Public inbox for mailto: links — must match MAIL_TO on the mail server unless you override */
export const CONTACT_EMAIL = envString('REACT_APP_CONTACT_EMAIL', 'info@elyptek.com');

/** Netlify Function name `send-mail` → this path always (no SPA redirect ambiguity). */
const MAIL_FN_PATH = '/.netlify/functions/send-mail';

/**
 * POST targets the serverless handler directly. Local dev: `npm run functions` + `npm start`,
 * or `npm run dev`. Optional base when the SPA is on another origin.
 */
export const MAIL_API_ENDPOINT = (() => {
  const base = envString('REACT_APP_MAIL_API_URL', '');
  if (!base) return MAIL_FN_PATH;
  return `${base.replace(/\/+$/, '')}${MAIL_FN_PATH}`;
})();
