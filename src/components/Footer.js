import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../env/publicConfig';
import { getTranslation } from '../translations';
import { SITE_SECTIONS } from '../routes/siteRoutes';
import ElyptekWord from './ElyptekWord';

const Footer = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const year = new Date().getFullYear();
  const isAr = currentLanguage === 'AR';

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    // Get initial language from URL or localStorage
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

  return (
  <footer className="footer-section modern-footer">
    <div className="footer-top">
      <div className="container">
        <div className="footer-row">
          {/* Left: Logo, Quote, Socials */}
          <div className="footer-col footer-col-left">
            <div className="footer-logo">
              <Link to={SITE_SECTIONS.home} aria-label="Back to home">
                <img src="assets/images/LOGO ELYPTEK .png" alt="Elyptek logo" />
              </Link>
            </div>
            <p className="footer-quote">
              {currentLanguage === 'AR'
                ? 'تمكين الشركات بحلول رقمية مبتكرة وتكنولوجيا متطورة.'
                : 'Empowering businesses with innovative digital solutions and cutting-edge technology.'
              }
            </p>
            <div className="footer-social-links">
              <a href="https://www.facebook.com/share/1FTGLY6bvR/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/elyptek.co" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/963956009824" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="whatsapp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Center: Quick Links */}
          <div className="footer-col footer-col-center">
            <h4 className="footer-title left-list">
              {currentLanguage === 'AR' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="footer-links-list">
              <li><Link to={SITE_SECTIONS.home}>{currentLanguage === 'AR' ? 'الرئيسية' : 'Home'}</Link></li>
              <li><Link to={SITE_SECTIONS.about}>{currentLanguage === 'AR' ? 'من نحن' : 'About Us'}</Link></li>
              <li><Link to={SITE_SECTIONS.services}>{currentLanguage === 'AR' ? 'خدماتنا' : 'Our Services'}</Link></li>
              <li><Link to={SITE_SECTIONS.portfolio}>{getTranslation('portfolio', currentLanguage)}</Link></li>
              <li><Link to={SITE_SECTIONS.team}>{currentLanguage === 'AR' ? 'فريقنا' : 'Our Team'}</Link></li>
              <li><Link to={SITE_SECTIONS.careers}>{currentLanguage === 'AR' ? 'التقديم الوظيفي' : 'Careers'}</Link></li>
              <li><Link to={SITE_SECTIONS.contact}>{currentLanguage === 'AR' ? 'اتصل بنا' : 'Contact Us'}</Link></li>
            </ul>
          </div>

          {/* Right: Contact Info */}
          <div className="footer-col footer-col-right">
            <h4 className="footer-title left-list">
              {currentLanguage === 'AR' ? 'معلومات الاتصال' : 'Contact Info'}
            </h4>
            <ul className="footer-contact-list">
              <li>
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+963993887774" className="footer-link-white">+963 993 887 774</a>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link-white">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  {currentLanguage === 'AR' ? 'شعلان، دمشق، سوريا' : 'Shaalan, Damascus, Syria'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <div className="container">
        <div className="footer-bottom-row">
          <p
            className="copyright"
            dir={isAr ? 'rtl' : 'ltr'}
            style={{ direction: isAr ? 'rtl' : 'ltr' }}
          >
            © {year}{' '}
            <bdi>
              <span className="footer-brand" dir="ltr">
                <ElyptekWord tm onDark />
              </span>
            </bdi>
            . {isAr ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}
          </p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer; 