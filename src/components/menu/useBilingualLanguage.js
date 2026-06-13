import { useState, useEffect } from 'react';

const useBilingualLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    const langFromStorage = localStorage.getItem('language');

    if (langFromUrl && (langFromUrl === 'EN' || langFromUrl === 'AR')) {
      setCurrentLanguage(langFromUrl);
    } else if (langFromStorage && (langFromStorage === 'EN' || langFromStorage === 'AR')) {
      setCurrentLanguage(langFromStorage);
    }

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'EN' ? 'AR' : 'EN';
    setCurrentLanguage(newLang);
    localStorage.setItem('language', newLang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLang } }));
  };

  const t = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLanguage === 'AR' ? 'ar' : 'en'] ?? field.en ?? '';
  };

  const isArabic = currentLanguage === 'AR';

  return { currentLanguage, toggleLanguage, t, isArabic };
};

export default useBilingualLanguage;
