import { useState, useEffect } from 'react';
import { applySiteLanguage, getInitialLanguage } from '../utils/siteLanguage';

const useSiteLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    setCurrentLanguage(getInitialLanguage());

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return currentLanguage;
};

export const toggleSiteLanguage = (currentLanguage) => {
  const next = currentLanguage === 'EN' ? 'AR' : 'EN';
  return applySiteLanguage(next);
};

export default useSiteLanguage;
