import { MAIL_API_ENDPOINT } from '../env/publicConfig';

/** POST to `/.netlify/functions/send-mail` (see `MAIL_API_ENDPOINT` in env/publicConfig.js). */
export async function sendSiteMail(kind, payload) {
  const res = await fetch(MAIL_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, ...payload }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON */
  }

  if (!res.ok || !data.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
}
