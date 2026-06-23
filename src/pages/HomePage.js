import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import useSiteLanguage from '../hooks/useSiteLanguage';
import { getTranslation } from '../translations';
import { SITE_SECTIONS } from '../routes/siteRoutes';
import ElyptekWord from '../components/ElyptekWord';
import TextWithElyptek from '../utils/textWithElyptek';

const SectionDivider = () => (
  <div className="section-divider">
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '60px' }}>
      <path fill="rgba(255,167,0,0.8)" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80,192,80,96,80,48,80L0,80Z" />
    </svg>
  </div>
);

const HomePage = () => {
  const lang = useSiteLanguage();
  const isAr = lang === 'AR';
  const rtlClass = isAr ? 'rtl-site' : '';

  const serviceHighlights = [
    {
      icon: 'fas fa-code',
      title: isAr ? 'تطوير البرمجيات' : 'Software Development',
      text: isAr
        ? 'حلول مخصصة من الفكرة إلى الإطلاق — أنظمة قابلة للتوسع لعملك.'
        : 'Tailored solutions from idea to launch — scalable systems built for your business.',
    },
    {
      icon: 'fas fa-laptop',
      title: isAr ? 'تطبيقات الويب والموبايل' : 'Web & Mobile Apps',
      text: isAr
        ? 'تطبيقات سريعة وسهلة الاستخدام تعمل على كل المنصات.'
        : 'Fast, user-friendly apps that work seamlessly across platforms.',
    },
    {
      icon: 'fas fa-globe',
      title: isAr ? 'تصميم وتطوير المواقع' : 'Website Design & Dev',
      text: isAr
        ? 'مواقع حديثة، متجاوبة، ومحسّنة لمحركات البحث.'
        : 'Modern, responsive websites optimized for search and performance.',
    },
    {
      icon: 'fas fa-bullhorn',
      title: isAr ? 'التسويق الرقمي' : 'Digital Marketing',
      text: isAr
        ? 'استراتيجيات وحملات تبني حضوراً رقمياً وتحقق نتائج.'
        : 'Strategies and campaigns that build presence and drive results.',
    },
  ];

  const stats = [
    { value: '5+', label: isAr ? 'مجالات خدمة' : 'Service areas' },
    { value: '360°', label: isAr ? 'حلول رقمية' : 'Digital solutions' },
    { value: 'SY', label: isAr ? 'دمشق، سوريا' : 'Damascus, Syria' },
    { value: 'EN / AR', label: isAr ? 'دعم ثنائي اللغة' : 'Bilingual support' },
  ];

  const exploreLinks = [
    {
      path: SITE_SECTIONS.about,
      icon: 'fa fa-info-circle',
      title: getTranslation('about', lang),
      text: isAr ? 'تعرّف على رسالتنا وقيمنا' : 'Learn about our mission and values',
    },
    {
      path: SITE_SECTIONS.team,
      icon: 'fa fa-users',
      title: getTranslation('team', lang),
      text: isAr ? 'تعرف على الفريق خلف Elyptek' : 'Meet the people behind Elyptek',
    },
    {
      path: SITE_SECTIONS.portfolio,
      icon: 'fas fa-briefcase',
      title: getTranslation('portfolio', lang),
      text: isAr ? 'استكشف مشاريعنا الأخيرة' : 'Explore our recent client work',
    },
    {
      path: SITE_SECTIONS.careers,
      icon: 'fa fa-briefcase',
      title: isAr ? 'الوظائف' : 'Careers',
      text: isAr ? 'انضم إلى فريق Elyptek' : 'Join the Elyptek team',
    },
  ];

  return (
    <>
      <Banner />

      <section className={`site-section site-section--white ${rtlClass}`} dir={isAr ? 'rtl' : 'ltr'} style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="container">
          <div className="row">
            {stats.map((stat) => (
              <div key={stat.label} className="col-6 col-md-3 site-stat-col">
                <div className="site-stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className={`site-section site-section--white ${rtlClass}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="container">
          <div className="section-heading wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.3s">
            <h6>{getTranslation('servicesTitle', lang)}</h6>
            <h4>
              {getTranslation('servicesSubtitle', lang)}{' '}
              <em>{getTranslation('services', lang)}</em>
            </h4>
            <div className="line-dec" />
            <p className="site-lead">
              {isAr
                ? 'من البرمجيات والتطبيقات إلى المواقع والتسويق — نقدّم حلولاً متكاملة تحوّل رؤيتك إلى واقع رقمي.'
                : 'From software and apps to websites and marketing — we deliver end-to-end solutions that turn your vision into digital reality.'}
            </p>
          </div>
          <div className="row site-card-grid">
            {serviceHighlights.map((item) => (
              <div key={item.title} className="col-md-6 col-lg-3">
                <div className="site-card site-card--center">
                  <span className="site-card-icon">
                    <i className={item.icon} />
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="site-actions">
            <Link to={SITE_SECTIONS.services} className="main-button">
              {isAr ? 'عرض جميع الخدمات' : 'View All Services'}
            </Link>
          </div>
        </div>
      </section>

      <section className={`site-section site-section--muted ${rtlClass}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-1 order-2">
              <div className="about-left-image wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.4s">
                <img src="assets/images/About us.png" alt={isAr ? 'About Elyptek' : 'About Elyptek'} />
              </div>
            </div>
            <div className="col-lg-6 order-lg-2 order-1 wow fadeInRight site-about-intro">
              <div className="section-heading">
                <h6>{getTranslation('aboutTitle', lang)}</h6>
                <h4>
                  {isAr ? 'من هو ' : 'Who is '}
                  <ElyptekWord />
                  {isAr ? '؟' : '?'}
                </h4>
                <div className="line-dec" />
              </div>
              <p className="site-body-text">
                {isAr ? (
                  <>
                    <ElyptekWord /> وكالة إبداعية متخصصة في التسويق الرقمي وتصميم المواقع والتطوير. نساعد العلامات التجارية على التميز والتفاعل والنمو في العالم الرقمي.
                  </>
                ) : (
                  <>
                    <ElyptekWord /> is a creative agency specializing in digital marketing, website design, and development. We help brands stand out, engage audiences, and grow online.
                  </>
                )}
              </p>
              <p className="site-body-text">
                {isAr
                  ? 'نعمل مع عملاء من قطاعات متعددة — من الشركات الناشئة إلى المؤسسات — لبناء حضور رقمي قوي يحقق نتائج.'
                  : 'We partner with clients across industries — from startups to established businesses — to build a strong digital presence that delivers results.'}
              </p>
              <div className="site-actions site-about-actions">
                <Link to={SITE_SECTIONS.about} className="main-button">
                  {isAr ? 'اقرأ المزيد عنا' : 'Read More About Us'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`site-section site-section--white ${rtlClass}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="container">
          <div className="section-heading">
            <h6>
              {isAr ? (
                <>استكشف <ElyptekWord /></>
              ) : (
                <>Explore <ElyptekWord /></>
              )}
            </h6>
            <h4>
              {isAr ? 'كل ما تحتاجه في ' : 'Everything you need in '}
              <em>{isAr ? 'مكان واحد' : 'one place'}</em>
            </h4>
            <div className="line-dec" />
          </div>
          <div className="row home-explore-grid">
            {exploreLinks.map((item) => (
              <div key={item.path} className="col-12 col-md-6 col-lg-3">
                <Link to={item.path} className="site-link-card">
                  <span className="site-link-card-icon" aria-hidden="true">
                    <i className={item.icon} />
                  </span>
                  <div className="site-link-card-content">
                    <h5>{item.title}</h5>
                    <p><TextWithElyptek text={item.text} /></p>
                  </div>
                  <span className="site-link-card-arrow" aria-hidden="true">
                    {isAr ? '‹' : '›'}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`site-cta ${rtlClass}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="container">
          <div className="site-cta-inner">
            <div>
              <h3>{isAr ? 'جاهز لبدء مشروعك؟' : 'Ready to start your project?'}</h3>
              <p>
                {isAr
                  ? 'تواصل معنا اليوم — نحن هنا لتحويل فكرتك إلى حل رقمي فعّال.'
                  : 'Get in touch today — we are here to turn your idea into a powerful digital solution.'}
              </p>
            </div>
            <div className="site-cta-actions">
              <Link to={SITE_SECTIONS.contact} className="main-button">
                {getTranslation('contact', lang)}
              </Link>
              <Link to={SITE_SECTIONS.portfolio} className="main-button site-btn-secondary">
                {getTranslation('portfolio', lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
