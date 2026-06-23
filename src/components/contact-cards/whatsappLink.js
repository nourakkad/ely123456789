/** Digits only, no + or spaces — required for WhatsApp click-to-chat URLs. */
export const normalizeWhatsAppPhone = (phone) => String(phone).replace(/\D/g, '');

/** Standard web URL (works on iOS, desktop, and as Android fallback). */
export const getWhatsAppWebUrl = (phone, text) => {
  const digits = normalizeWhatsAppPhone(phone);
  const base = `https://api.whatsapp.com/send?phone=${digits}`;
  return text ? `${base}&text=${encodeURIComponent(text)}` : base;
};

const isAndroid = () =>
  typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

/**
 * Open a WhatsApp chat. On Android, prefer regular WhatsApp (com.whatsapp) so visitors
 * who only have personal WhatsApp are not sent to WhatsApp Business by default.
 */
export const openWhatsAppChat = (phone, text) => {
  const digits = normalizeWhatsAppPhone(phone);
  const fallback = getWhatsAppWebUrl(digits, text);

  if (isAndroid()) {
    const query = text
      ? `?phone=${digits}&text=${encodeURIComponent(text)}`
      : `?phone=${digits}`;
    const intent = `intent://send${query}#Intent;scheme=whatsapp;package=com.whatsapp;S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
    window.location.assign(intent);
    return;
  }

  window.open(fallback, '_blank', 'noopener,noreferrer');
};

/** Use on WhatsApp anchor: onClick={handleWhatsAppClick(phone)} */
export const handleWhatsAppClick = (phone, text) => (event) => {
  event.preventDefault();
  openWhatsAppChat(phone, text);
};
