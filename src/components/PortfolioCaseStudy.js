import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import useSiteLanguage from '../hooks/useSiteLanguage';
import { getTranslation } from '../translations';
import { SITE_SECTIONS } from '../routes/siteRoutes';
import {
  getPortfolioItemBySlug,
  getPortfolioImageAlt,
} from '../data/portfolioItems';
import ElyptekWord from './ElyptekWord';

const PortfolioCaseStudy = () => {
  const { slug } = useParams();
  const lang = useSiteLanguage();
  const isAr = lang === 'AR';
  const item = getPortfolioItemBySlug(slug);

  if (!item) {
    return <Navigate to={SITE_SECTIONS.portfolio} replace />;
  }

  const category = isAr ? item.categoryAr : item.categoryEn;
  const summary = isAr ? item.summaryAr : item.summaryEn;
  const services = isAr ? item.servicesAr : item.servicesEn;

  return (
    <div
      className={`portfolio-case-study ${isAr ? 'rtl-site' : ''}`}
      dir={isAr ? 'rtl' : 'ltr'}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <meta itemProp="name" content={item.title} />
      <meta itemProp="description" content={item.summaryEn} />
      {item.website && <meta itemProp="url" content={item.website} />}

      <div className="container">
        <nav className="portfolio-case-study__breadcrumb" aria-label={isAr ? 'مسار التنقل' : 'Breadcrumb'}>
          <Link to={SITE_SECTIONS.home}>{getTranslation('home', lang)}</Link>
          <span aria-hidden="true">/</span>
          <Link to={SITE_SECTIONS.portfolio}>{getTranslation('portfolio', lang)}</Link>
          <span aria-hidden="true">/</span>
          <span>{item.title}</span>
        </nav>

        <header className="portfolio-case-study__header">
          <p className="portfolio-case-study__eyebrow">
            {isAr ? 'مشروع إيليبتك' : 'Elyptek project'}
          </p>
          <h1 itemProp="name">{item.title}</h1>
          <p className="portfolio-case-study__category">{category}</p>
          <p className="portfolio-case-study__attribution">
            {isAr ? (
              <>
                موقع صُمّم وطُوّر بواسطة{' '}
                <span dir="ltr">
                  <ElyptekWord tm />
                </span>
              </>
            ) : (
              <>
                Website designed and developed by <ElyptekWord tm />
              </>
            )}
          </p>
        </header>

        <div
          className={[
            'portfolio-case-study__logo',
            item.logoVariant ? `portfolio-card-logo--${item.logoVariant}` : '',
          ].filter(Boolean).join(' ')}
        >
          <img
            src={item.image}
            alt={getPortfolioImageAlt(item, isAr)}
            width={280}
            height={160}
            itemProp="image"
          />
        </div>

        <section className="portfolio-case-study__summary">
          <h2>{isAr ? 'عن المشروع' : 'About this project'}</h2>
          <p itemProp="description">{summary}</p>
        </section>

        {services?.length > 0 && (
          <section className="portfolio-case-study__services">
            <h2>{isAr ? 'ما قدّمناه' : 'What we delivered'}</h2>
            <ul>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="portfolio-case-study__actions">
          {item.website && (
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="main-button"
              itemProp="url"
            >
              {isAr ? 'زيارة الموقع' : 'Visit live website'}
            </a>
          )}
          <Link to={SITE_SECTIONS.portfolio} className="main-button site-btn-secondary">
            {isAr ? 'العودة إلى الأعمال' : 'Back to portfolio'}
          </Link>
          <Link to={SITE_SECTIONS.contact} className="main-button site-btn-secondary">
            {getTranslation('contact', lang)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCaseStudy;
