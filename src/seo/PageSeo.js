import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyPageHead, resetPageHead } from './documentHead';
import { buildPageSeoPayload } from './buildPageSeo';

const getDocumentLanguage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get('lang');
  const langFromStorage = localStorage.getItem('language');
  const lang = langFromUrl || langFromStorage || 'EN';
  return lang === 'AR' ? 'ar' : 'en';
};

const syncDocumentLanguage = () => {
  document.documentElement.lang = getDocumentLanguage();
};

const PageSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    syncDocumentLanguage();

    const onLanguageChange = () => syncDocumentLanguage();
    window.addEventListener('languageChanged', onLanguageChange);

    return () => window.removeEventListener('languageChanged', onLanguageChange);
  }, [pathname]);

  useEffect(() => {
    const payload = buildPageSeoPayload(pathname);
    applyPageHead(payload);

    return () => resetPageHead();
  }, [pathname]);

  return null;
};

export default PageSeo;
