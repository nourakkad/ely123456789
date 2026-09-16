import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTranslation } from '../translations';
import { SITE_SECTIONS } from '../routes/siteRoutes';
import { applySiteLanguage, getInitialLanguage } from '../utils/siteLanguage';

function isDeviceArabic() {
  const lang = navigator.language || (navigator.languages && navigator.languages[0]);
  return lang && lang.toLowerCase().startsWith('ar');
}

const NAV_ITEMS = [
  { path: SITE_SECTIONS.home, icon: 'fa fa-home', labelKey: 'home' },
  { path: SITE_SECTIONS.services, icon: 'fa fa-cogs', labelKey: 'services' },
  { path: SITE_SECTIONS.about, icon: 'fa fa-info-circle', labelKey: 'about' },
  { path: SITE_SECTIONS.team, icon: 'fa fa-users', labelKey: 'team' },
  { path: SITE_SECTIONS.portfolio, icon: 'fas fa-briefcase', labelKey: 'portfolio' },
  { path: SITE_SECTIONS.contact, icon: 'fa fa-envelope', labelKey: 'contact', isContactBtn: true },
];

const normalizePath = (pathname) => decodeURIComponent(pathname).replace(/\/+$/, '') || '/';

const isNavItemActive = (currentPath, itemPath) => {
  if (currentPath === itemPath) return true;
  if (itemPath === SITE_SECTIONS.portfolio && currentPath.startsWith(`${SITE_SECTIONS.portfolio}/`)) {
    return true;
  }
  return false;
};

const Header = () => {
  const location = useLocation();
  const currentPath = normalizePath(location.pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    // Apply after mount only — reading device/storage in useState breaks Safari
    // hydration against prerendered EN HTML and can freeze the page.
    let initialLang = getInitialLanguage();
    let inferredFromDevice = false;
    let storedLang = null;
    try {
      storedLang = localStorage.getItem('language');
    } catch (_) {
      // Safari private mode can block storage
    }
    if (
      initialLang === 'EN' &&
      isDeviceArabic() &&
      !new URLSearchParams(window.location.search).get('lang') &&
      !storedLang
    ) {
      initialLang = 'AR';
      inferredFromDevice = true;
    }
    setCurrentLanguage(initialLang);
    // Persist + notify Banner/Footer/etc. so they don't stay stuck on EN.
    if (inferredFromDevice) {
      applySiteLanguage(initialLang);
    }

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const changeLanguage = (lang) => {
    const next = applySiteLanguage(lang, { replace: false });
    setCurrentLanguage(next);
  };

  const toggleLanguage = () => {
    changeLanguage(currentLanguage === 'EN' ? 'AR' : 'EN');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setIsHeaderVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        const scrollDifference = currentScrollY - lastScrollY;
        if (scrollDifference > 5) {
          setIsHeaderVisible(false);
        } else if (scrollDifference < -5) {
          setIsHeaderVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      document.body.classList.remove('menu-open');
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    document.body.classList.toggle('menu-open', newMenuState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  return (
    <header className={`header-area header-sticky transparent-header wow slideInDown ${isScrolled ? 'show-header' : ''} ${isHeaderVisible ? 'header-visible' : 'header-hidden'}`} data-wow-duration="0.75s" data-wow-delay="0s">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <button
                type="button"
                className={`menu-trigger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Open menu"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                }}
              >
                <span>Menu</span>
              </button>

              <Link to={SITE_SECTIONS.home} className="logo site-header-logo-link" onClick={closeMenu}>
                <img
                  src="/assets/images/logo-header.webp"
                  alt="Elyptek Logo"
                  className="site-header-logo"
                  width={187}
                  height={140}
                  decoding="async"
                />
              </Link>

              <div className="language-toggle">
                <button
                  type="button"
                  className="lang-btn lang-btn-switch"
                  onClick={toggleLanguage}
                  aria-label={currentLanguage === 'EN' ? 'Switch to Arabic' : 'Switch to English'}
                >
                  <i className="fas fa-globe" aria-hidden="true" />
                  <span className="lang-btn-text">
                    {currentLanguage === 'EN' ? 'العربية' : 'English'}
                  </span>
                  <span className="lang-btn-code">
                    {currentLanguage === 'EN' ? 'AR' : 'EN'}
                  </span>
                </button>
              </div>

              <ul className={`nav ${isMenuOpen ? 'active' : ''}`}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.path} className="scroll-to-section">
                    <Link
                      to={item.path}
                      className={[
                        item.isContactBtn ? 'contact-btn' : '',
                        isNavItemActive(currentPath, item.path) ? 'active' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={closeMenu}
                    >
                      <i className={item.icon} />
                      {getTranslation(item.labelKey, currentLanguage)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
