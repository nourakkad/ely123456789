import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSiteLanguage from '../hooks/useSiteLanguage';
import { getTranslation } from '../translations';
import { SITE_SECTIONS, getPortfolioCaseStudyPath } from '../routes/siteRoutes';
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CLIENT_NAMES,
  getPortfolioImageAlt,
} from '../data/portfolioItems';

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
    const casePath = getPortfolioCaseStudyPath(item.slug);

    return (
      <article
        id={item.slug}
        className="portfolio-card"
        itemScope
        itemType="https://schema.org/CreativeWork"
      >
        <meta itemProp="name" content={item.title} />
        <meta itemProp="description" content={item.summaryEn || item.categoryEn} />
        <Link
          to={casePath}
          className="portfolio-card-main"
          aria-label={
            isAr
              ? `عرض مشروع ${item.title}`
              : `View ${item.title} project case study`
          }
        >
          <div
            className={[
              'portfolio-card-logo',
              item.logoVariant ? `portfolio-card-logo--${item.logoVariant}` : '',
            ].filter(Boolean).join(' ')}
          >
            <img
              src={item.image}
              alt={getPortfolioImageAlt(item, isAr)}
              loading="lazy"
              width={200}
              height={120}
              itemProp="image"
            />
          </div>
          <div className="portfolio-card-body">
            <h5 itemProp="name">{item.title}</h5>
            <span className="portfolio-card-category">{category}</span>
            <span className="portfolio-card-cta">
              {isAr ? 'عرض دراسة الحالة' : 'View case study'}
            </span>
          </div>
        </Link>
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
              itemProp="url"
            >
              <i className="fas fa-globe" />
            </a>
          )}
        </div>
      </article>
    );
  };

  return (
    <div
      id="portfolio"
      className={`portfolio-page ${rtlClass}`}
      dir={isAr ? 'rtl' : 'ltr'}
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <meta itemProp="name" content="Elyptek Portfolio Projects & Clients" />
      <div className="container">
        <div className="section-heading wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.2s">
          <h6>{getTranslation('portfolioTitle', lang)}</h6>
          <h4>
            {isAr ? (
              <>استكشف <em>أعمالنا</em></>
            ) : (
              <>Explore Our <em>Projects</em></>
            )}
          </h4>
          <div className="line-dec" />
          <p className="site-lead">{getTranslation('portfolioDescription', lang)}.</p>
        </div>

        {!isMobile && (
          <div className="portfolio-grid" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
            <meta itemProp="numberOfItems" content={String(PORTFOLIO_ITEMS.length)} />
            {PORTFOLIO_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-grid-item wow fadeInUp"
                data-wow-delay={`${0.1 + (index % 3) * 0.1}s`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(index + 1)} />
                <div itemProp="item">{renderCard(item)}</div>
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

        <div className="portfolio-google-stamp" aria-label={isAr ? 'عملاء ومشاريع إيليبتك' : 'Elyptek clients and projects'}>
          <span className="portfolio-google-stamp__mark" aria-hidden="true">
            {PORTFOLIO_ITEMS.length}
          </span>
          <div className="portfolio-google-stamp__copy">
            <strong>
              {isAr
                ? 'عملاء ومشاريع إيليبتك — مواقع صُنعت بواسطة إيليبتك'
                : 'Elyptek clients & projects — websites made by Elyptek'}
            </strong>
            <p>
              {PORTFOLIO_CLIENT_NAMES.join(' · ')}
            </p>
          </div>
        </div>

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
