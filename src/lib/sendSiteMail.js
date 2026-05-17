import { MAIL_API_ENDPOINT } from '../env/publicConfig';

/** POST to `/api/send-mail`, rewritten by Netlify to the `send-mail` serverless function. */
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
