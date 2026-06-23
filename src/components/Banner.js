import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTranslation } from '../translations';
import { SITE_SECTIONS } from '../routes/siteRoutes';

const Banner = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
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

  useEffect(() => {
    const words = currentLanguage === 'AR' ? [
      ' نبتكر <i class="fa-regular fa-pen-to-square"></i> ',
      ' نبرمج <i class="fa-solid fa-code"></i> ',
      ' نتحكم <i class="fa-solid fa-sliders"></i> '
    ] : [
      ' Create <i class="fa-regular fa-pen-to-square"></i> ',
      ' Code <i class="fa-solid fa-code"></i> ',
      ' Control <i class="fa-solid fa-sliders"></i> '
    ];
    let currentWord = 0;
    const animateWord = document.getElementById("animateWord");
    function cycleWords() {
      if (!animateWord) return;
      animateWord.style.opacity = 0;
      setTimeout(() => {
        currentWord = (currentWord + 1) % words.length;
        animateWord.innerHTML = words[currentWord];
        animateWord.style.opacity = 1;
      }, 400);
    }
    const interval = setInterval(cycleWords, 1800);
    return () => clearInterval(interval);
  }, [currentLanguage]);

  return (
    <div
      className={`main-banner ${currentLanguage === 'AR' ? 'rtl-banner' : ''}`}
      id="top"
      data-wow-duration="1s"
      data-wow-delay="0.5s"
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: "url('assets/images/img.jpg') center center / cover no-repeat",
        direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
        textAlign: currentLanguage === 'AR' ? 'right' : 'left'
      }}
    >
      <div className="img-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.8)' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-hero-text" style={{ 
              direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
              textAlign: currentLanguage === 'AR' ? 'right' : 'left'
            }}>
              <div className="custom-underline-group" style={{ 
                direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                textAlign: currentLanguage === 'AR' ? 'right' : 'left'
              }}>
                <div className="custom-title-group" style={{ 
                  direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                  textAlign: currentLanguage === 'AR' ? 'right' : 'left'
                }}>
                  <span className="custom-title-stack" style={{ 
                    direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                    textAlign: currentLanguage === 'AR' ? 'right' : 'left'
                  }}>
                    <span className="custom-title digital-marketing" style={{ 
                      direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                      textAlign: currentLanguage === 'AR' ? 'right' : 'left'
                    }}>
                      {currentLanguage === 'AR' ? 'التسويق' : 'Marketing'}
                    </span>
                    <span className="custom-underline black-underline"></span>
                  </span>
                  <span className="custom-title and" style={{ 
                    direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                    textAlign: currentLanguage === 'AR' ? 'right' : 'left'
                  }}> &amp; </span>
                  <span className="custom-title-stack" style={{ 
                    direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                    textAlign: currentLanguage === 'AR' ? 'right' : 'left'
                  }}>
                    <span className="custom-title software" style={{ 
                      direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                      textAlign: currentLanguage === 'AR' ? 'right' : 'left'
                    }}>
                      {currentLanguage === 'AR' ? 'الحلول' : 'Software'}
                    </span>
                    <span className="custom-underline orange-underline"></span>
                  </span>
                </div>
                <div className="custom-title solutions" style={{ 
                  direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                  textAlign: currentLanguage === 'AR' ? 'right' : 'left'
                }}>
                  {currentLanguage === 'AR' ? (
                    <span dangerouslySetInnerHTML={{ __html: '<em>البرمجية</em>' }} />
                  ) : (
                    'Solutions'
                  )}
                </div>
              </div>
              <div
                className="custom-subtitle"
                style={{
                  direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                  textAlign: currentLanguage === 'AR' ? 'right' : 'left',
                }}
              >
                {currentLanguage === 'AR' ? 'رؤيتك، نحن' : 'Your Vision, Our'}
                <span
                  className="custom-animate-black"
                  id="animateWord"
                  style={{
                    direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                    textAlign: currentLanguage === 'AR' ? 'right' : 'left',
                  }}
                >
                  {currentLanguage === 'AR' ? ' نبتكر' : 'Create'}
                </span>
              </div>
              <div className="site-hero-actions">
                <Link to={SITE_SECTIONS.services} className="main-button">
                  {getTranslation('learnMore', currentLanguage)}
                </Link>
                <Link to={SITE_SECTIONS.contact} className="main-button site-btn-dark">
                  {getTranslation('getStarted', currentLanguage)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner; 