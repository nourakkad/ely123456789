import React, { useState, useEffect } from 'react';
import { getTranslation } from '../translations';

function isDeviceArabic() {
  console.log('navigator.language:', navigator.language);
  console.log('navigator.languages:', navigator.languages);
  const lang = navigator.language || (navigator.languages && navigator.languages[0]);
  return lang && lang.toLowerCase().startsWith('ar');
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // 1. Check URL param
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    if (langFromUrl && (langFromUrl === 'EN' || langFromUrl === 'AR')) {
      return langFromUrl;
    }
    // 2. Check localStorage
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage && (langFromStorage === 'EN' || langFromStorage === 'AR')) {
      return langFromStorage;
    }
    // 3. Check device/browser language
    if (isDeviceArabic()) {
      return 'AR';
    }
    // 4. Default to English
    return 'EN';
  });
  const [activeSection, setActiveSection] = useState('top');

  // Initialize language from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    const langFromStorage = localStorage.getItem('language');
    
    let initialLang = 'EN';
    if (langFromUrl && (langFromUrl === 'EN' || langFromUrl === 'AR')) {
      initialLang = langFromUrl;
      localStorage.setItem('language', langFromUrl);
    } else if (langFromStorage && (langFromStorage === 'EN' || langFromStorage === 'AR')) {
      initialLang = langFromStorage;
    }
    
    setCurrentLanguage(initialLang);
    
    // Don't set RTL direction on document element to keep header/footer in LTR
    // RTL styling will be applied through CSS classes on specific components
  }, []);

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Don't set RTL direction on document element to keep header/footer in LTR
    // RTL styling will be applied through CSS classes on specific components
    
    // Update URL without reloading the page
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we're at the top of the page
      if (currentScrollY <= 50) {
        setIsHeaderVisible(true);
        setIsScrolled(false);
        setActiveSection('top');
      } else {
        setIsScrolled(true);
        
        // Hide header when scrolling down, show when scrolling up
        const scrollDifference = currentScrollY - lastScrollY;
        if (scrollDifference > 5) {
          setIsHeaderVisible(false);
        } else if (scrollDifference < -5) {
          setIsHeaderVisible(true);
        }
        // Keep current state if scroll position hasn't changed significantly
      }
      
      // Update active section based on scroll position
      const sections = ['top', 'services', 'about', 'team', 'portfolio', 'contact'];
      const headerHeight = 80;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerHeight + 50 && rect.bottom >= headerHeight + 50) {
            setActiveSection(section);
          }
        }
      });
      
      setLastScrollY(currentScrollY);
    };

    // Add throttling to prevent too many scroll events
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
    
    // Prevent body scroll when menu is open
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  const smoothScrollToSection = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = 80; // Adjust based on your header height
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`header-area header-sticky transparent-header wow slideInDown ${isScrolled ? 'show-header' : ''} ${isHeaderVisible ? 'header-visible' : 'header-hidden'}`} data-wow-duration="0.75s" data-wow-delay="0s">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* Mobile Menu Trigger - Left Side */}
              <button
                type="button"
                className={`menu-trigger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Open menu"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none'
                }}
              >
                <span>Menu</span>
              </button>
              
              {/* Logo Start */}
              <a href="#top" className="logo" onClick={(e) => smoothScrollToSection(e, '#top')}>
                <img src="/assets/images/p.png" alt="Elyptek Logo" className="logo-webs" />
              </a>
              {/* Logo End */}
              
              {/* Language Toggle - Right Side */}
              <div className="language-toggle">
                <button 
                  className={`lang-btn ${currentLanguage === 'EN' ? 'active' : ''}`}
                  onClick={() => changeLanguage('EN')}
                >
                  EN
                </button>
                <button 
                  className={`lang-btn ${currentLanguage === 'AR' ? 'active' : ''}`}
                  onClick={() => changeLanguage('AR')}
                >
                  AR
                </button>
              </div>
              
              {/* Menu Start */}
              <ul className={`nav ${isMenuOpen ? 'active' : ''}`}>
                <li className="scroll-to-section">
                  <a 
                    href="#top" 
                    className={activeSection === 'top' ? 'active' : ''} 
                    onClick={(e) => smoothScrollToSection(e, '#top')}
                  >
                    <i className="fa fa-home"></i>
                    {getTranslation('home', currentLanguage)}
                  </a>
                </li>
                <li className="scroll-to-section">
                  <a 
                    href="#services" 
                    className={activeSection === 'services' ? 'active' : ''} 
                    onClick={(e) => smoothScrollToSection(e, '#services')}
                  >
                    <i className="fa fa-cogs"></i>
                    {getTranslation('services', currentLanguage)}
                  </a>
                </li>
                <li className="scroll-to-section">
                  <a 
                    href="#about" 
                    className={activeSection === 'about' ? 'active' : ''} 
                    onClick={(e) => smoothScrollToSection(e, '#about')}
                  >
                    <i className="fa fa-info-circle"></i>
                    {getTranslation('about', currentLanguage)}
                  </a>
                </li>
                <li className="scroll-to-section">
                  <a 
                    href="#team" 
                    className={activeSection === 'team' ? 'active' : ''} 
                    onClick={(e) => smoothScrollToSection(e, '#team')}
                  >
                    <i className="fa fa-users"></i>
                    {getTranslation('team', currentLanguage)}
                  </a>
                </li>
                <li className="scroll-to-section">
                  <a 
                    href="#portfolio" 
                    className={activeSection === 'portfolio' ? 'active' : ''} 
                    onClick={(e) => smoothScrollToSection(e, '#portfolio')}
                  >
                    <i className="fas fa-project-diagram"></i>
                    {getTranslation('projects', currentLanguage)}
                  </a>
                </li>
                
                <li className="scroll-to-section">
                  <a 
                    href="#contact" 
                    className={`contact-btn ${activeSection === 'contact' ? 'active' : ''}`} 
                    onClick={(e) => smoothScrollToSection(e, '#contact')}
                  >
                    <i className="fa fa-envelope"></i>
                    {getTranslation('contact', currentLanguage)}
                  </a>
                </li>
                <li className="scroll-to-section desktop-hidden">
                  <a 
                    href="#contact" 
                    className="contact-btn" 
                    onClick={(e) => smoothScrollToSection(e, '#contact')}
                  >
                    <i className="fa fa-paper-plane"></i>
                    Free Quote
                  </a>
                </li>
              </ul>
              {/* Menu End */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 