import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSiteLanguage from '../hooks/useSiteLanguage';
import { getTranslation } from '../translations';
import { SITE_SECTIONS } from '../routes/siteRoutes';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'KMA',
    categoryEn: 'KMA FOR GAS STATION SERVICES',
    categoryAr: 'شركة القمة لخدمات محطات الوقود',
    image: '/assets/logo/KMA.png',
    facebook: 'https://www.facebook.com/profile.php?id=61572372762233&sk',
    website: 'https://kma-sy.com',
  },
  {
    id: 2,
    title: 'Tembix',
    categoryEn: 'Composite Decking & Flooring Solutions',
    categoryAr: 'حلول الأرضيات والترصيع المركبة',
    image: '/assets/logo/Tembix.png',
    instagram: 'https://www.instagram.com/tembix/',
    facebook: 'https://www.facebook.com/tembix',
    website: 'https://timbex-sy.com/',
  },
  {
    id: 3,
    title: 'Sabco',
    categoryEn: 'Polystyrene & Thermal Insulation',
    categoryAr: 'البوليسترين والعزل الحراري',
    image: '/assets/logo/Sabco.png',
    instagram: 'https://www.instagram.com/sabco/',
    facebook: 'https://www.facebook.com/sabco',
    website: 'https://sabco.com.sy/',
  },
  {
    id: 4,
    title: 'Global Visonery Minds',
    categoryEn: 'Empowering Change Through Community',
    categoryAr: 'تمكين التغيير من خلال المجتمع',
    image: '/assets/logo/gvm.png',
    website: 'https://globalvisionaryminds.com/',
  },
  {
    id: 5,
    title: 'Damascus Gin',
    categoryEn: 'Premium Craft Gin Distillery',
    categoryAr: 'مصنع جين حرفي فاخر',
    image: '/assets/logo/damascusgin.png',
    instagram: 'https://www.instagram.com/damascusgin/',
    facebook: 'https://www.facebook.com/damascusgin',
    website: 'https://damascusgin.com',
  },
  {
    id: 6,
    title: 'Khalil Al-Okdi',
    categoryEn: 'Trading, Industry & Contracting Establishment',
    categoryAr: 'تجارة وصناعة ومقاولات',
    image: '/assets/logo/khalil al-okadi.png',
    facebook: 'https://www.facebook.com/share/17XWzpfb6f/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/khalilokdi',
    website: 'https://khalilokdi.com/',
  },
  {
    id: 7,
    title: 'Luxury777',
    categoryEn: 'Luxury Car Rentals — Dubai, UAE',
    categoryAr: 'تأجير سيارات فاخرة — دبي، الإمارات',
    image: '/assets/logo/luxury777.png',
    logoVariant: 'dark',
    website: 'https://luxury777.ae/',
  },
  {
    id: 8,
    title: 'àrta',
    categoryEn: 'Creative Art House',
    categoryAr: 'دار فن إبداعي',
    image: '/assets/logo/arta.jpg',
    logoVariant: 'large',
    facebook: 'https://www.facebook.com/share/1bdNRB1ZwH/',
    instagram: 'https://www.instagram.com/arta_creative_art_house?igsh=bmwxMnpmYXNmZjBq',
    website: 'https://àrta.com',
  },
  {
    id: 9,
    title: 'Crazy Beeez',
    categoryEn: 'Be Crazy Be Creative',
    categoryAr: 'Be Crazy Be Creative',
    image: '/assets/logo/crazy-beeez.jpg',
    logoVariant: 'light',
    instagram: 'https://www.instagram.com/crazybeeez_?igsh=MW53dHFkdGU5NHNuNQ==',
    facebook: 'https://www.facebook.com/share/17Hvs8M6Jb/?mibextid=wwXIfr',
    website: 'https://elyptek.com/contact/crazy-beeez',
  },
  {
    id: 10,
    title: 'Maydan Creative Studio',
    categoryEn: 'Creative Studio',
    categoryAr: 'مايدان كرييتيف ستوديو',
    image: '/assets/logo/maydan.jpg',
    logoVariant: 'maydan',
    instagram: 'https://www.instagram.com/creativemaydan',
    website: 'https://elyptek.com/contact/maydan',
  },
];

const SWIPE_THRESHOLD = 50;

const Portfolio = () => {
  const lang = useSiteLanguage();
  const isAr = lang === 'AR';
  const rtlClass = isAr ? 'rtl-site' : '';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 991);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalItems = PORTFOLIO_ITEMS.length;

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % totalItems);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);

  const finishSwipe = () => {
    const diff = startX - currentX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

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
    finishSwipe();
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
    finishSwipe();
  };

  const renderCard = (item) => {
    const category = isAr ? item.categoryAr : item.categoryEn;

    return (
      <article className="portfolio-card">
        <div
          className={[
            'portfolio-card-logo',
            item.logoVariant ? `portfolio-card-logo--${item.logoVariant}` : '',
          ].filter(Boolean).join(' ')}
        >
          <img src={item.image} alt={item.title} loading="lazy" />
        </div>
        <div className="portfolio-card-body">
          <h5>{item.title}</h5>
          <span className="portfolio-card-category">{category}</span>
          <div className="portfolio-card-links">
            {item.instagram && (
              <a
                href={item.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link portfolio-link--instagram"
                aria-label={`${item.title} Instagram`}
              >
                <i className="fab fa-instagram" />
              </a>
            )}
            {item.facebook && (
              <a
                href={item.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link portfolio-link--facebook"
                aria-label={`${item.title} Facebook`}
              >
                <i className="fab fa-facebook-f" />
              </a>
            )}
            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link portfolio-link--website"
                aria-label={`${item.title} website`}
              >
                <i className="fas fa-globe" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div
      id="portfolio"
      className={`portfolio-page ${rtlClass}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="container">
        <div className="section-heading wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.2s">
          <h6>{getTranslation('portfolioTitle', lang)}</h6>
          <h4>
            {isAr ? (
              <>استكشف <em>أعمالنا</em></>
            ) : (
              <>Explore Our <em>Portfolio</em></>
            )}
          </h4>
          <div className="line-dec" />
          <p className="site-lead">{getTranslation('portfolioDescription', lang)}.</p>
        </div>

        {!isMobile && (
          <div className="portfolio-grid">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-grid-item wow fadeInUp"
                data-wow-delay={`${0.1 + (index % 3) * 0.1}s`}
              >
                {renderCard(item)}
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <>
            <div className="portfolio-carousel" ref={carouselRef}>
              <div className="portfolio-carousel-viewport">
                <div
                  className="portfolio-carousel-track"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isDragging ? 'none' : 'transform 0.45s ease',
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {PORTFOLIO_ITEMS.map((item) => (
                    <div key={item.id} className="portfolio-carousel-slide">
                      {renderCard(item)}
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="portfolio-carousel-nav portfolio-carousel-nav--prev"
                onClick={goToPrev}
                aria-label={isAr ? 'السابق' : 'Previous'}
              >
                <i className={`fas fa-chevron-${isAr ? 'right' : 'left'}`} />
              </button>
              <button
                type="button"
                className="portfolio-carousel-nav portfolio-carousel-nav--next"
                onClick={goToNext}
                aria-label={isAr ? 'التالي' : 'Next'}
              >
                <i className={`fas fa-chevron-${isAr ? 'left' : 'right'}`} />
              </button>
            </div>
            <div className="portfolio-carousel-dots">
              {PORTFOLIO_ITEMS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`portfolio-carousel-dot${index === currentIndex ? ' is-active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`${isAr ? 'الشريحة' : 'Slide'} ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="portfolio-page-cta wow fadeInUp">
          <div className="site-cta-inner">
            <div>
              <h3>{isAr ? 'لديك مشروع في ذهنك؟' : 'Have a project in mind?'}</h3>
              <p>
                {isAr
                  ? 'تواصل معنا لنناقش كيف يمكننا بناء حضور رقمي قوي لعلامتك التجارية.'
                  : 'Get in touch and let us discuss how we can build a strong digital presence for your brand.'}
              </p>
            </div>
            <div className="site-cta-actions">
              <Link to={SITE_SECTIONS.contact} className="main-button">
                {getTranslation('contact', lang)}
              </Link>
              <Link to={SITE_SECTIONS.services} className="main-button site-btn-secondary">
                {getTranslation('services', lang)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
