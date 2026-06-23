import React, { useState, useEffect } from 'react';
import { getTranslation } from '../translations';
import { injectElyptekHtml } from '../utils/textWithElyptek';

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
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

  const services = [
    {
      id: 0,
      title: currentLanguage === 'AR' ? "البرمجيات" : "Software",
      icon: "fas fa-code",
      content: {
        title: currentLanguage === 'AR' ? "تطوير البرمجيات" : "Software Development",
        description: currentLanguage === 'AR' 
          ? "في إيليبتك، نخلق حلولاً مخصصة تتوافق تماماً مع احتياجاتك، من المفهوم إلى النشر. فريقنا من المطورين ذوي الخبرة متخصص في صنع برمجيات قوية لتمكين عملك."
          : "At Elyptek, we create tailored solutions that align perfectly with your needs, from concept to deployment. Our experienced team of developers specializes in crafting robust software to empower your business.",
        features: currentLanguage === 'AR' ? [
          "حلول برمجية مخصصة",
          "هندسة معمارية قابلة للتوسع",
          "تصميم يركز على المستخدم",
          "توافق عبر المنصات",
          "تحديثات ودعم مستمر",
          "تكامل تقنيات متقدمة"
        ] : [
          "Custom Software Solutions",
          "Scalable Architecture", 
          "User-Centric Design",
          "Cross-Platform Compatibility",
          "Continuous Updates & Support",
          "Advanced Technology Integration"
        ],
        quote: currentLanguage === 'AR' ? "برمجيتك، طريقتك" : "Your Software, Your Way",
        image: "assets/images/Software-Development.png"
      }
    },
    {
      id: 1,
      title: currentLanguage === 'AR' ? "التطبيقات" : "Application",
      icon: "fas fa-laptop",
      content: {
        title: currentLanguage === 'AR' ? "تطوير التطبيقات" : "Application Development",
        description: currentLanguage === 'AR'
          ? "حول فكرة تطبيقك إلى واقع مع خدمات تطوير التطبيقات لدينا. نبني تطبيقات جذابة للهواتف المحمولة وسطح المكتب تحل مشاكل العالم الحقيقي وتأسر المستخدمين بميزات مبتكرة."
          : "Transform your app idea into reality with our application development services. We build engaging mobile and desktop applications that solve real-world problems and captivate users with innovative features.",
        features: currentLanguage === 'AR' ? [
          "توافق عبر المنصات",
          "تجربة مستخدم بديهية",
          "تحديثات الميزات المنتظمة",
          "نشر سلس في متجر التطبيقات",
          "تحسين الأداء",
          "هندسة معمارية قابلة للتوسع"
        ] : [
          "Cross-Platform Compatibility",
          "Intuitive User Experience",
          "Regular Feature Updates",
          "Seamless App Store Deployment",
          "Performance Optimization",
          "Scalable App Architecture"
        ],
        quote: currentLanguage === 'AR' ? "تطبيقك، خبرتنا" : "Your App, Our Expertise",
        image: "assets/images/Application-Development.png"
      }
    },
    {
      id: 2,
      title: currentLanguage === 'AR' ? "المواقع" : "Website",
      icon: "fas fa-globe",
      content: {
        title: currentLanguage === 'AR' ? "تطوير المواقع" : "Website Development",
        description: currentLanguage === 'AR'
          ? "ارفع وجودك على الإنترنت مع خدمات تطوير الويب الخبيرة لدينا. نصمم ونبني مواقع ويب متجاوبة وجذابة، من المدونات الشخصية إلى منصات التجارة الإلكترونية المعقدة، مخصصة لتحقيق النتائج."
          : "Elevate your online presence with our expert web development services. We design and build responsive, engaging websites, from personal blogs to complex e-commerce platforms, tailored to drive results.",
        features: currentLanguage === 'AR' ? [
          "تصميم متجاوب للهواتف المحمولة",
          "واجهات تركز على المستخدم",
          "تحسين محركات البحث",
          "وظائف التجارة الإلكترونية",
          "أنظمة إدارة المحتوى",
          "ميزات أمان محسنة"
        ] : [
          "Mobile-Responsive Design",
          "User-Centric Interfaces",
          "SEO Optimization",
          "E-commerce Functionality",
          "Content Management Systems",
          "Enhanced Security Features"
        ],
        quote: currentLanguage === 'AR' ? "موقعك، هويتك الرقمية" : "Your Website, Your Online Identity",
        image: "assets/images/Website-Development.png"
      }
    },
    {
      id: 3,
      title: currentLanguage === 'AR' ? "التسويق" : "Marketing",
      icon: "fas fa-bullhorn",
      content: {
        title: currentLanguage === 'AR' ? "التسويق الرقمي" : "Digital Marketing",
        description: currentLanguage === 'AR'
          ? "عزز ظهور علامتك التجارية مع حلول التسويق الرقمي الشاملة لدينا. حملاتنا المدعومة بالبيانات والمحتوى الجذاب والاستراتيجيات الإبداعية تربطك بجمهورك وتقدم نتائج قابلة للقياس."
          : "Boost your brand's visibility with our comprehensive digital marketing solutions. Our data-driven campaigns, engaging content, and creative strategies connect you with your audience and deliver measurable results.",
        features: currentLanguage === 'AR' ? [
          "حملات وسائل التواصل الاجتماعي المستهدفة",
          "إنشاء محتوى عالي الجودة",
          "تطوير العلامة التجارية الاستراتيجي",
          "خبرة تحسين محركات البحث والإعلانات",
          "التسويق عبر البريد الإلكتروني الفعال",
          "التحليلات والتقارير المفصلة"
        ] : [
          "Targeted Social Media Campaigns",
          "High-Quality Content Creation",
          "Strategic Brand Development",
          "SEO & SEM Expertise",
          "Effective Email Marketing",
          "Detailed Analytics & Reporting"
        ],
        quote: currentLanguage === 'AR' ? "علامتك التجارية، مهمتنا" : "Your Brand, Our Mission",
        image: "assets/images/Marketing.png"
      }
    },
    {
      id: 4,
      title: currentLanguage === 'AR' ? "التصميم" : "Graphic",
      icon: "fas fa-paint-brush",
      content: {
        title: currentLanguage === 'AR' ? "التصميم الجرافيكي" : "Graphic Design",
        description: currentLanguage === 'AR'
          ? "حول الهوية البصرية لعلامتك التجارية مع خدمات التصميم الجرافيكي لدينا. نخلق تصاميم مذهلة ومُذكّرة للشعارات والمواد التسويقية والمزيد، مما يضمن أن علامتك التجارية تترك انطباعاً دائماً."
          : "Transform your brand's visual identity with our graphic design services. We create stunning, memorable designs for logos, marketing materials, and more, ensuring your brand leaves a lasting impression.",
        features: currentLanguage === 'AR' ? [
          "تصميم هوية علامة تجارية فريدة",
          "إنشاءات جرافيكية مخصصة",
          "تصميم الوسائط المطبوعة والرقمية",
          "استشارة التصميم الإبداعي",
          "دعم صيغ الملفات المتعددة",
          "عملية مراجعة متكررة"
        ] : [
          "Unique Brand Identity Design",
          "Custom Graphic Creations",
          "Print and Digital Media Design",
          "Creative Design Consultation",
          "Versatile File Format Support",
          "Iterative Revision Process"
        ],
        quote: currentLanguage === 'AR' ? "تصميم الإبداع، تقديم التأثير" : "Designing Creativity, Delivering Impact",
        image: "assets/images/Graphic-Designing.png"
      }
    }
  ];

  return (
    <>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100%',height:'60px'}}><path fill="rgba(255,167,0,0.8)" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"></path></svg>
      </div>
      <div id="services" className={`services ${currentLanguage === 'AR' ? 'rtl-services' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
                <h6>{getTranslation('servicesTitle', currentLanguage)}</h6>
                <h4>{getTranslation('servicesSubtitle', currentLanguage)} <em>{getTranslation('services', currentLanguage)}</em></h4>
                <div className="line-dec"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="naccs">
                <div className="grid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="services-menu-wrap">
                        <div className="menu services-tab-menu">
                          {services.map((service, index) => (
                            <div
                              key={service.id}
                              className={`services-tab ${index === activeTab ? 'active' : ''}`}
                              onClick={() => setActiveTab(index)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setActiveTab(index);
                                }
                              }}
                              aria-pressed={index === activeTab}
                            >
                              <div className="thumb">
                                <span className="icon"><i className={service.icon}></i></span>
                                <span className="services-tab-label">{service.title}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="service-content-wrapper">
                        <div className="service-tab-card">
                          <div className="service-tab-image">
                            <img src={services[activeTab].content.image} alt={services[activeTab].content.title} />
                          </div>
                          <div className="service-tab-content">
                            <h4>{services[activeTab].content.title}</h4>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: injectElyptekHtml(services[activeTab].content.description),
                              }}
                            />
                            <div className="ticks-list">
                              {services[activeTab].content.features.map((feature, index) => (
                                <span key={index}>
                                  <i className="fa fa-check"></i> {feature}
                                </span>
                              ))}
                            </div>
                            <p><em>"{services[activeTab].content.quote}"</em></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Services;