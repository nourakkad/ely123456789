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

/**
 * Posted to `/api/send-mail`; production Netlify rewrites to `.netlify/functions/send-mail`.
 * For local email tests use `npm run dev` (`npx netlify dev`) so redirects + functions run.
 *
 * Absolute base override when the SPA is hosted on another origin:
 * Example: REACT_APP_MAIL_API_URL=https://main-site.netlify.app
 */
export const MAIL_API_ENDPOINT = (() => {
  const base = envString('REACT_APP_MAIL_API_URL', '');
  const path = '/api/send-mail';
  if (!base) return path;
  return `${base.replace(/\/+$/, '')}${path}`;
})();
