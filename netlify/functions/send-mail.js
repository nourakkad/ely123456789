const nodemailer = require('nodemailer');

function clip(v, max) {
  if (v == null || typeof v !== 'string') return '';
  return v.slice(0, max).replace(/\r\n/g, '\n');
}

function normalizeEmail(email) {
  const e = clip(email, 254).trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null;
}

function corsHeaders(origin) {
  const raw = process.env.ALLOWED_ORIGINS;
  const list = typeof raw === 'string' && raw.trim() !== '' ? raw.split(',').map((s) => s.trim()) : null;
  if (!list || !list.length) {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };
  }
  if (origin && list.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };
  }
  return {
    'Access-Control-Allow-Origin': list[0],
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

function createTransportMaybe() {
  const host = (process.env.SMTP_HOST || '').trim();
  if (!host) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1';
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user ? { user, pass } : undefined,
  });
}

const MIME_EXT = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

const ALLOWED_CV_MIMES = new Set(Object.keys(MIME_EXT));

function normalizeClientMime(raw) {
  const m = clip(raw, 160).trim().toLowerCase();
  if (m === 'image/jpg') return 'image/jpeg';
  return m;
}

/** Detect type from bytes (do not trust the browser alone). */
function detectCvBufferMime(buf) {
  if (!buf || buf.length < 12) return null;
  if (buf.subarray(0, 5).toString('latin1').startsWith('%PDF')) return 'application/pdf';
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 && buf.length > 40) return 'image/png';
  if (buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') {
    return 'image/webp';
  }
  return null;
}

function safeCvFilename(raw, mime) {
  const ext = MIME_EXT[mime] || '.dat';
  const base = clip(raw || `cv${ext}`, 140).replace(/^.*[/\\]/, '').replace(/\s+/g, '-');
  const cleaned = base.replace(/[^a-zA-Z0-9._\-\u0590-\u05FF\u0600-\u06FF]+/g, '_');
  const stem = cleaned.replace(/\.(pdf|jpe?g|png|webp)$/i, '') || 'cv';
  return `${stem}${ext}`.slice(0, 120);
}

function parseOptionalCv(body) {
  const raw = body.cvAttachment;
  if (raw == null || raw === false) return { attachment: null };
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    return { error: 'Invalid CV attachment.' };
  }

  const cap = Math.floor(Number(process.env.MAIL_CV_MAX_BYTES || 3 * 1024 * 1024));
  const maxBytes = Number.isFinite(cap) && cap > 0 ? Math.min(cap, 5 * 1024 * 1024) : 3 * 1024 * 1024;

  const clientMime = normalizeClientMime(raw.mimeType);
  if (clientMime && !ALLOWED_CV_MIMES.has(clientMime)) {
    return { error: 'CV attachment must be a PDF or image (JPEG, PNG, or WEBP).' };
  }

  const b64Raw = typeof raw.contentBase64 === 'string' ? raw.contentBase64.replace(/\s/g, '') : '';
  if (!b64Raw) {
    return { error: 'CV attachment is empty.' };
  }

  let buf;
  try {
    buf = Buffer.from(b64Raw, 'base64');
  } catch {
    return { error: 'CV attachment encoding is invalid.' };
  }

  if (buf.length < 24) {
    return { error: 'CV file is too small.' };
  }
  if (buf.length > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    return {
      error: `CV exceeds max size (${mb} MB). Upload a smaller file or paste a link above.`,
    };
  }

  const detected = detectCvBufferMime(buf);
  if (!detected || !ALLOWED_CV_MIMES.has(detected)) {
    return { error: 'Invalid or unsupported file. Use PDF, JPG, PNG, or WEBP.' };
  }
  if (clientMime && clientMime !== detected) {
    return { error: 'File contents do not match the selected type.' };
  }

  const filename = safeCvFilename(typeof raw.filename === 'string' ? raw.filename : undefined, detected);

  return {
    attachment: {
      filename,
      content: buf,
      contentType: detected,
      contentDisposition: 'attachment',
    },
  };
}

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const cors = corsHeaders(origin);
  const baseHeaders = {
    ...cors,
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: baseHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: baseHeaders, body: JSON.stringify({ ok: false, message: 'Method not allowed.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: baseHeaders, body: JSON.stringify({ ok: false, message: 'Invalid JSON.' }) };
  }

  const transport = createTransportMaybe();
  if (!transport) {
    return {
      statusCode: 503,
      headers: baseHeaders,
      body: JSON.stringify({
        ok: false,
        message:
          'Mail is not configured. In Netlify: Site configuration → Environment variables → set SMTP_HOST, MAIL_TO, etc.',
      }),
    };
  }

  const kind = body.kind;
  if (kind !== 'contact' && kind !== 'job') {
    return { statusCode: 400, headers: baseHeaders, body: JSON.stringify({ ok: false, message: 'Invalid request kind.' }) };
  }

  const mailTo = (process.env.MAIL_TO || 'info@elyptek.com').trim();
  const mailFrom = (process.env.MAIL_FROM || mailTo).trim();

  const name = clip(body.name, 120);
  const email = normalizeEmail(body.email);
  if (!name || !email) {
    return { statusCode: 400, headers: baseHeaders, body: JSON.stringify({ ok: false, message: 'Name and a valid email are required.' }) };
  }

  const countryCode = clip(body.countryCode, 8);
  const mobile = clip(body.mobile, 24).replace(/\s+/g, '');
  const phone = `${countryCode} ${mobile}`.trim();
  if (!mobile) {
    return { statusCode: 400, headers: baseHeaders, body: JSON.stringify({ ok: false, message: 'Phone is required.' }) };
  }

  let subject;
  let text;
  let attachments;

  if (kind === 'contact') {
    const message = clip(body.message, 8000);
    if (!message) {
      return { statusCode: 400, headers: baseHeaders, body: JSON.stringify({ ok: false, message: 'Message is required.' }) };
    }
    subject = `[Elyptek website] Contact — ${name}`;
    text = ['Contact form submission', '', `Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, '', 'Message:', message].join('\n');
  } else {
    const position = clip(body.position, 200);
    const rawExp = clip(body.experience, 48);
    const experienceLabel =
      {
        graduate: 'Student / Recent graduate',
        '1-2': '1–2 years',
        '3-5': '3–5 years',
        '5plus': '5+ years',
      }[rawExp] || rawExp || '—';
    const linkedin = clip(body.linkedin, 512);
    const cvLink = clip(body.cvLink, 512);
    const coverLetter = clip(body.coverLetter, 12000);

    if (!position) {
      return {
        statusCode: 400,
        headers: baseHeaders,
        body: JSON.stringify({ ok: false, message: 'Role / position is required.' }),
      };
    }
    if (coverLetter.length < 20) {
      return {
        statusCode: 400,
        headers: baseHeaders,
        body: JSON.stringify({ ok: false, message: 'Cover letter is too short.' }),
      };
    }

    const parsedCv = parseOptionalCv(body);
    if (parsedCv.error) {
      return {
        statusCode: 400,
        headers: baseHeaders,
        body: JSON.stringify({ ok: false, message: parsedCv.error }),
      };
    }

    attachments = parsedCv.attachment ? [parsedCv.attachment] : undefined;
    const fileAtt = parsedCv.attachment;
    const cvAttachNote = fileAtt
      ? `CV file attached: ${fileAtt.filename} (${fileAtt.contentType}, ~${Math.max(1, Math.round(fileAtt.content.length / 1024))} KB)`
      : 'CV file attached: none (optional link above if any)';

    subject = `[Elyptek website] Job application — ${position} — ${name}`;
    text = [
      '[Job application — elyptek.com/form]',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Position: ${position}`,
      `Experience band: ${experienceLabel}`,
      `LinkedIn: ${linkedin || '—'}`,
      `CV / portfolio link: ${cvLink || '—'}`,
      cvAttachNote,
      '',
      'Cover letter:',
      coverLetter,
    ].join('\n');
  }

  try {
    const mailOpts = {
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject,
      text,
    };
    if (attachments && attachments.length) {
      mailOpts.attachments = attachments;
    }
    await transport.sendMail(mailOpts);
    return { statusCode: 200, headers: baseHeaders, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('[send-mail]', err.message);
    return {
      statusCode: 500,
      headers: baseHeaders,
      body: JSON.stringify({ ok: false, message: 'Could not send email. Try again later.' }),
    };
  }
};
