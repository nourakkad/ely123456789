export const ELYPTEK_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Elyptek/@33.519666,36.289447,20z/data=!4m6!3m5!1s0x1518e70064e43493:0x90be20b3c4bbb421!8m2!3d33.5196005!4d36.2893432!16s%2Fg%2F11z9bj29hb?hl=en&entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D';

const ELYPTEK_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d414.37!2d36.287155!3d33.5196005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e70064e43493%3A0x90be20b3c4bbb421!2sElyptek!5e0!3m2!1sen!2ssy!4v1740000000000!5m2!1sen!2ssy';

export const ELYPTEK_LOCATION = {
  name: 'Elyptek',
  en: 'Shaalan, Damascus, Syria',
  ar: 'شعلان، دمشق، سوريا',
  lat: 33.5196005,
  lng: 36.2893432,
  zoom: 20,
};

export function getGoogleMapsEmbedUrl() {
  return ELYPTEK_MAPS_EMBED_URL;
}

export function getGoogleMapsLinkUrl() {
  return ELYPTEK_GOOGLE_MAPS_URL;
}

export function getLocationLabel(language) {
  return language === 'AR' ? ELYPTEK_LOCATION.ar : ELYPTEK_LOCATION.en;
}
