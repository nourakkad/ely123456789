import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getTranslation } from '../translations';

const Portfolio = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  // Mapping for contact card URLs
 
  const portfolioItems = [
   {
      id: 1,
      title: "KMA",
      category: currentLanguage === 'AR' ? "شركة القمة لخدمات محطات الوقود" : "KMA FOR GAS STATION SERVICES",
      image: "/assets/logo/KMA.png",
      //instagram: "",
      facebook: "https://www.facebook.com/profile.php?id=61572372762233&sk",
      website: "https://kma-sy.com"
    },
    {
      id: 2,
      title: "Tembix",
      category: currentLanguage === 'AR' ? "حلول الأرضيات والترصيع المركبة" : "Composite Decking & Flooring Solutions",
      image: "/assets/logo/Tembix.png",
      instagram: "https://www.instagram.com/tembix/",
      facebook: "https://www.facebook.com/tembix",
      website: "https://timbex-sy.com/"
    },
    {
      id: 3,
      title: "Sabco",
      category: currentLanguage === 'AR' ? "البوليسترين والعزل الحراري" : "Polystyrene & Thermal Insulation",
      image: "/assets/logo/Sabco.png",
      instagram: "https://www.instagram.com/sabco/",
      facebook: "https://www.facebook.com/sabco",
      website: "https://sabco.com.sy/"
    },
    {
      id: 4,
      title: "Global Visonery Minds",
      category: currentLanguage === 'AR' ? "تمكين التغيير من خلال المجتمع" : "Empowering Change Through Community",
      image: "/assets/logo/gvm.png",
      //instagram: "https://www.instagram.com/damascusgin/",
      //facebook: "https://www.facebook.com/damascusgin",
      website: "https://globalvisionaryminds.com/"
    },
    {
      id: 5,
      title: "GAAU",
      category: currentLanguage === 'AR' ? "الجمعية العربية الألمانية لجراحي المسالك البولية" : "Arab German Urological Surgeons",
      image: "/assets/logo/AGUS.png",
      instagram: "https://www.instagram.com/geraraburology?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebook: "https://www.facebook.com/profile.php?id=61575541529070",
      website: "https://gaau.blog"
    },
    {
      id: 6,
      title: "Damascus Gin",
      category: currentLanguage === 'AR' ? "مصنع جين حرفي فاخر" : "Premium Craft Gin Distillery",
      image: "/assets/logo/damascusgin.png",
      instagram: "https://www.instagram.com/damascusgin/",
      facebook: "https://www.facebook.com/damascusgin",
      website: "https://damascusgin.com"
    },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const totalItems = portfolioItems.length;

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalItems);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch and mouse event handlers for mobile only
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !isDragging) return;
    e.preventDefault();
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const handleMouseDown = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isMobile || !isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isMobile || !isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Calculate transform for mobile only
  const getTransform = () => {
    return `translateX(-${currentIndex * 100}%)`;
  };

  // Render portfolio item
  const renderPortfolioItem = (item) => (
    <div className="portfolio-item-wrapper">
      <div className="portfolio-item" style={{ 
        height: isMobile ? '500px' : '450px', 
        width: isMobile ? '100%' : '100%',
        maxWidth: isMobile ? '100%' : '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        margin: '0 auto',
        transition: 'all 0.3s ease',
        minHeight: isMobile ? '500px' : '500px',
        flexShrink: 0
      }}>
        <div className="thumb" style={{ 
          height: isMobile ? '350px' : '350px', 
          width: isMobile ? '100%' : '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          padding: isMobile ? '20px' : '20px',
          backgroundColor: '#fff',
          flexShrink: 0
        }}>
          <img 
            src={item.image} 
            alt={item.title} 
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              backgroundColor: '#fff',
              borderRadius: '18px 18px 0 0',
              display: 'block',
              margin: '0 auto',
              padding: '10px'
            }}
          />

        </div>
        <div className="down-content" style={{
          width: '100%',
          padding: isMobile ? '15px 12px 12px 12px' : '18px 12px 16px 12px',
          textAlign: 'center',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ 
              fontSize: isMobile ? '18px' : '20px', 
              fontWeight: '700', 
              color: '#2a2a2a', 
              marginBottom: '8px' 
            }}>{item.title}</h4>
            <span style={{ 
              fontSize: isMobile ? '14px' : '15px', 
              color: '#afafaf' 
            }}>{item.category}</span>
          </div>
          <div className="portfolio-social-buttons" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '12px' : '15px',
            marginTop: isMobile ? '15px' : '20px',
            padding: '0 20px'
          }}>
            {item.instagram && (
              <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="social-btn instagram-btn" style={{
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: isMobile ? '14px' : '16px',
                color: '#fff',
                border: '2px solid transparent',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
              }}>
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {item.facebook && (
              <a href={item.facebook} target="_blank" rel="noopener noreferrer" className="social-btn facebook-btn" style={{
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: isMobile ? '14px' : '16px',
                color: '#fff',
                border: '2px solid transparent',
                background: '#1877f2'
              }}>
                <i className="fab fa-facebook"></i>
              </a>
            )}
            <a href={item.website} target="_blank" rel="noopener noreferrer" className="social-btn website-btn" style={{
              width: isMobile ? '35px' : '40px',
              height: isMobile ? '35px' : '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: isMobile ? '14px' : '16px',
              color: '#fff',
              border: '2px solid transparent',
              background: '#ffa700'
            }}>
              <i className="fas fa-globe"></i>
            </a>
          </div>
          
         
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100%',height:'60px'}}>
          <path fill="rgba(255,167,0,0.8)" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"></path>
        </svg>
      </div>
    <div id="portfolio" className="our-portfolio">
    
      <div className="container-fluid">
    
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h6>{getTranslation('portfolioTitle', currentLanguage)}</h6>
              <h4>
                {currentLanguage === 'AR' 
                  ? 'اطلع على بعض مشاريع عملائنا'
                  : 'Check Out Some of Our Clients Projects'
                }
              </h4>
              <p>
                {currentLanguage === 'AR'
                  ? 'اكتشف أحدث مشاريعنا التي تعرض حلول التصميم والتطوير المبتكرة عبر مختلف الصناعات.'
                  : 'Discover our latest projects showcasing innovative design and development solutions across various industries.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Grid Layout */}
        {!isMobile && (
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-item-wrapper">
                {renderPortfolioItem(item)}
              </div>
            ))}
          </div>
        )}

        {/* Mobile Carousel */}
        {isMobile && (
          <div className="custom-carousel" ref={carouselRef}>
            <div className="carousel-container">
              <div 
                className="carousel-track"
                ref={trackRef}
                style={{
                  transform: getTransform(),
                  transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {portfolioItems.map((item, index) => (
                  <div key={item.id} className="carousel-slide">
                    {renderPortfolioItem(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Carousel Dots */}
        {isMobile && (
          <div className="carousel-dots">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Portfolio; 