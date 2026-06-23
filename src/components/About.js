import React from 'react';
import { Link } from 'react-router-dom';
import useSiteLanguage from '../hooks/useSiteLanguage';
import { getTranslation } from '../translations';
import { SITE_SECTIONS } from '../routes/siteRoutes';
import ElyptekWord from './ElyptekWord';

const About = () => {
  const lang = useSiteLanguage();
  const isAr = lang === 'AR';
  const rtlClass = isAr ? 'rtl-site' : '';

  const values = [
    {
      icon: 'fas fa-lightbulb',
      title: isAr ? 'الابتكار' : 'Innovation',
      text: isAr
        ? 'نستكشف أفكاراً جديدة ونبني حلولاً تسبق توقعات السوق.'
        : 'We explore fresh ideas and build solutions that stay ahead of expectations.',
    },
    {
      icon: 'fas fa-gem',
      title: isAr ? 'الجودة' : 'Quality',
      text: isAr
        ? 'كل تفصيلة مهمة — من التصميم إلى الكود وخدمة ما بعد الإطلاق.'
        : 'Every detail matters — from design and code to post-launch support.',
    },
    {
      icon: 'fas fa-handshake',
      title: isAr ? 'الشراكة' : 'Partnership',
      text: isAr
        ? 'نعمل معك كفريق واحد، بشفافية وتواصل مستمر.'
        : 'We work with you as one team, with transparency and open communication.',
    },
    {
      icon: 'fas fa-chart-line',
      title: isAr ? 'النتائج' : 'Impact',
      text: isAr
        ? 'نقيس النجاح بما يحققه مشروعك من نمو وظهور وعائد.'
        : 'We measure success by the growth, visibility, and ROI your project delivers.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: isAr ? 'اكتشاف' : 'Discover',
      text: isAr
        ? 'نفهم أهدافك، جمهورك، وتحدياتك الحالية.'
        : 'We learn your goals, audience, and current challenges.',
    },
    {
      step: '02',
      title: isAr ? 'تخطيط' : 'Plan',
      text: isAr
        ? 'نضع استراتيجية واضحة، جدولاً زمنياً، ونطاق عمل محدداً.'
        : 'We define a clear strategy, timeline, and scope of work.',
    },
    {
      step: '03',
      title: isAr ? 'تنفيذ' : 'Build',
      text: isAr
        ? 'نصمم، نطور، ونختبر — مع تحديثات منتظمة لك.'
        : 'We design, develop, and test — with regular updates for you.',
    },
    {
      step: '04',
      title: isAr ? 'إطلاق ودعم' : 'Launch & Support',
      text: isAr
        ? 'نطلق المشروع ونبقى بجانبك للتحسين والنمو.'
        : 'We launch and stay with you for optimization and growth.',
    },
  ];

  const differentiators = [
    {
      icon: 'fas fa-layer-group',
      title: isAr ? 'حلول متكاملة' : 'End-to-end delivery',
      text: isAr
        ? 'من الهوية البصرية إلى البرمجيات والتسويق — تحت سقف واحد.'
        : 'From branding to software and marketing — under one roof.',
    },
    {
      icon: 'fas fa-language',
      title: isAr ? 'ثنائي اللغة' : 'Bilingual by design',
      text: isAr
        ? 'محتوى وواجهات بالعربية والإنجليزية لجمهور أوسع.'
        : 'Arabic and English content and interfaces for a wider reach.',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: isAr ? 'جذور محلية' : 'Local roots',
      text: isAr
        ? 'مقرنا في دمشق — نفهم السوق ونبني حلولاً مناسبة له.'
        : 'Based in Damascus — we understand the market and build for it.',
    },
  ];

  return (
    <div id="about" className={`about-page ${rtlClass} ${isAr ? 'rtl-about' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className="section-heading wow fadeInDown about-page-hero" data-wow-duration="1s" data-wow-delay="0.2s">
          <h6>{getTranslation('aboutTitle', lang)}</h6>
          <h4>
            {isAr ? (
              <>
                قصة <ElyptekWord /> ورؤيتنا
              </>
            ) : (
              <>
                The <ElyptekWord /> Story & Vision
              </>
            )}
          </h4>
          <div className="line-dec" />
          <p className="site-lead">
            {isAr
              ? 'وكالة دمشقية للحلول الرقمية — نحوّل الأفكار إلى منتجات وتجارب تُحدث فرقاً.'
              : 'A Damascus-based digital agency — turning ideas into products and experiences that make a difference.'}
          </p>
        </div>

        <div className="row about-mission-row">
          <div className="col-md-6">
            <div className="site-card about-mission-card wow fadeInUp" data-wow-delay="0.2s">
              <span className="site-card-icon">
                <i className="fas fa-bullseye" />
              </span>
              <h5>{isAr ? 'مهمتنا' : 'Our Mission'}</h5>
              <p>
                {isAr
                  ? 'تمكين الشركات والعلامات من النمو الرقمي عبر استراتيجيات ذكية وتنفيذ تقني احترافي — من أول فكرة حتى إطلاق ناجح.'
                  : 'Empower businesses and brands to grow digitally through smart strategy and expert execution — from first idea to successful launch.'}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="site-card about-mission-card wow fadeInUp" data-wow-delay="0.35s">
              <span className="site-card-icon">
                <i className="fas fa-eye" />
              </span>
              <h5>{isAr ? 'رؤيتنا' : 'Our Vision'}</h5>
              <p>
                {isAr
                  ? 'أن نكون الشريك الرقمي الأول للشركات في سوريا والمنطقة — معروفين بالإبداع، الموثوقية، والنتائج القابلة للقياس.'
                  : 'To be the go-to digital partner for businesses in Syria and the region — known for creativity, reliability, and measurable results.'}
              </p>
            </div>
          </div>
        </div>

        <div className="about-page-block">
          <div className="section-heading">
            <h6>{isAr ? 'قيمنا' : 'Our Values'}</h6>
            <h4>
              {isAr ? 'ما ' : 'What '}
              <em>{isAr ? 'نؤمن به' : 'We Stand For'}</em>
            </h4>
            <div className="line-dec" />
          </div>
          <div className="row site-card-grid">
            {values.map((item) => (
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
        </div>

        <div className="about-page-block about-page-block--muted">
          <div className="section-heading">
            <h6>{isAr ? 'كيف نعمل' : 'How We Work'}</h6>
            <h4>
              {isAr ? 'من الفكرة إلى ' : 'From Idea to '}
              <em>{isAr ? 'الإطلاق' : 'Launch'}</em>
            </h4>
            <div className="line-dec" />
          </div>
          <div className="about-process-grid">
            {processSteps.map((item) => (
              <div key={item.step} className="about-process-step wow fadeInUp">
                <span className="about-process-number">{item.step}</span>
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-page-block">
          <div className="section-heading">
            <h6>
              {isAr ? (
                <>
                  لماذا <ElyptekWord />؟
                </>
              ) : (
                <>
                  Why <ElyptekWord />?
                </>
              )}
            </h6>
            <h4>
              {isAr ? 'ما ' : 'What Sets Us '}
              <em>{isAr ? 'يميزنا' : 'Apart'}</em>
            </h4>
            <div className="line-dec" />
          </div>
          <div className="row site-card-grid">
            {differentiators.map((item) => (
              <div key={item.title} className="col-md-4">
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
        </div>

        <div className="about-page-cta wow fadeInUp">
          <div className="site-cta-inner">
            <div>
              <h3>
                {isAr ? (
                  'تعرّف على الفريق'
                ) : (
                  <>
                    Meet the people behind <ElyptekWord onDark />
                  </>
                )}
              </h3>
              <p>
                {isAr
                  ? 'اكتشف من يقود المشاريع، أو تواصل معنا لبدء مشروعك القادم.'
                  : 'Discover who leads our projects, or get in touch to start your next one.'}
              </p>
            </div>
            <div className="site-cta-actions">
              <Link to={SITE_SECTIONS.team} className="main-button">
                {getTranslation('team', lang)}
              </Link>
              <Link to={SITE_SECTIONS.services} className="main-button site-btn-secondary">
                {getTranslation('services', lang)}
              </Link>
              <Link to={SITE_SECTIONS.contact} className="main-button site-btn-dark">
                {getTranslation('contact', lang)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
