import React, { useState, useEffect } from 'react';

const ArkanCeramics = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

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

  // Logo identity: navy + red
  const prim = '#1D2D4D';
  const primHover = '#2A3D63';
  const accent = '#E31E24';
  const softBg = '#FDECEB';

  const info = {
    title: currentLanguage === 'AR' ? 'الأركان للسيراميك' : 'Arkan Ceramics',
    category: currentLanguage === 'AR' ? 'سيراميك ومواد الكسوة' : 'Ceramics and Cladding Materials.',
    image: '/assets/logo/Arkan-Ceramics.png',
    phone: '+963 944 400 788',
    phone1: '+963 944 538 563',
    phone2: '+963 995 070 007',
    email: '3mmarhakim@gmail.com',
    email1: 'tarek.nabeel@outlook.com',
    facebook: 'https://www.facebook.com/share/1BJBpqqDRf/',
    instagram: 'https://www.instagram.com/arkan.ceramics',
    app: 'https://arkanceramics.com/app',
    website: '',
    location: '',
  };

  const btnStyle = {
    backgroundColor: prim,
    color: '#fff',
    padding: '12px',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(29, 45, 77, 0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
  };

  const onBtnOver = (e) => {
    e.currentTarget.style.backgroundColor = primHover;
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(29, 45, 77, 0.4)';
  };

  const onBtnOut = (e) => {
    e.currentTarget.style.backgroundColor = prim;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(29, 45, 77, 0.3)';
  };

  const downloadBtnStyle = {
    backgroundColor: prim,
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(29, 45, 77, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '0.5px',
    textDecoration: 'none',
  };

  const onDownloadOver = (e) => {
    e.currentTarget.style.backgroundColor = primHover;
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 6px 20px rgba(29, 45, 77, 0.4)';
  };

  const onDownloadOut = (e) => {
    e.currentTarget.style.backgroundColor = prim;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 45, 77, 0.3)';
  };

  const detailLinkStyle = {
    fontWeight: '600',
    color: prim,
    fontSize: '13px',
    textDecoration: 'underline',
    lineHeight: 1.45,
  };

  const iconBadgeStyle = {
    backgroundColor: prim,
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    flexShrink: 0,
  };

  const detailActionBtnStyle = {
    backgroundColor: prim,
    color: '#fff',
    padding: '8px',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(29, 45, 77, 0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    flexShrink: 0,
    textDecoration: 'none',
  };

  const toWhatsApp = (phone) => `https://wa.me/${phone.replace(/\D/g, '')}`;

  const phoneIcon = (
    <svg style={{ width: '16px', height: '16px', color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.958l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.958-.45l2.064.516A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" />
    </svg>
  );

  const whatsAppIcon = (
    <svg style={{ width: '16px', height: '16px', color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.77 11.77 0 0012.02 0C5.61 0 .25 5.35.25 11.74c0 2.07.55 4.1 1.6 5.9L0 24l6.52-1.7a11.68 11.68 0 005.49 1.4h.01c6.41 0 11.77-5.36 11.77-11.75 0-3.15-1.22-6.11-3.47-8.47zm-8.5 18.2c-1.7 0-3.39-.46-4.86-1.33l-.35-.2-3.87 1.01 1.03-3.77-.23-.39a9.72 9.72 0 01-1.46-5.1c0-5.4 4.4-9.8 9.81-9.8a9.72 9.72 0 016.94 2.87 9.63 9.63 0 012.87 6.93c0 5.4-4.4 9.8-9.8 9.8zm5.45-7.42c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.66.15-.19.3-.76.95-.93 1.14-.17.2-.34.22-.64.07a7.88 7.88 0 01-2.3-1.42 8.62 8.62 0 01-1.6-2.03c-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.19.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.57-.48-.49-.66-.5h-.57c-.2 0-.52.07-.79.35-.27.3-1.03 1-1.03 2.43s1.05 2.82 1.2 3.01c.15.19 2.06 3.16 5 4.43.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.34z" />
    </svg>
  );

  const appBtnStyle = {
    ...btnStyle,
    backgroundColor: accent,
    boxShadow: '0 4px 12px rgba(227, 30, 36, 0.35)',
  };

  const onAppBtnOver = (e) => {
    e.currentTarget.style.backgroundColor = '#C41920';
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(227, 30, 36, 0.45)';
  };

  const onAppBtnOut = (e) => {
    e.currentTarget.style.backgroundColor = accent;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(227, 30, 36, 0.35)';
  };

  const appIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '22px', height: '22px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 9v4m0 0l-2-2m2 2l2-2" />
    </svg>
  );

  const phoneNumbers = [info.phone, info.phone1, info.phone2].filter(Boolean);
  const emails = [info.email, info.email1].filter(Boolean);

  const hasQuickActions = emails.length > 0 || info.instagram || info.facebook || info.app;
  const hasContactDetails =
    info.phone || info.phone1 || info.phone2 || info.website || info.location;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 12px',
        minHeight: '100vh',
        background: `url('/assets/images/blog-left-dec.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '360px',
          marginBottom: '12px',
        }}
      >
        <div>
          <a href="https://elyptek.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <img
              src="/assets/images/logo12.png"
              alt="Elyptek"
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                objectFit: 'contain',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            const newLang = currentLanguage === 'EN' ? 'AR' : 'EN';
            setCurrentLanguage(newLang);
            localStorage.setItem('language', newLang);
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLang } }));
          }}
          style={{
            padding: '10px 18px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: prim,
            border: `2px solid ${prim}`,
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 4px 15px rgba(29, 45, 77, 0.2)',
            minWidth: '80px',
            textAlign: 'center',
            letterSpacing: '0.5px',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = prim;
            e.target.style.color = '#fff';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(29, 45, 77, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.target.style.color = prim;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(29, 45, 77, 0.2)';
          }}
        >
          {currentLanguage === 'EN' ? 'العربية' : 'English'}
        </button>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            minHeight: '360px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '28px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: `4px solid ${prim}`,
                boxShadow: '0 8px 25px rgba(29, 45, 77, 0.3)',
                marginBottom: '12px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={info.image}
                alt={info.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: '800',
                color: prim,
                margin: '4px 0 0 0',
                textAlign: 'center',
              }}
            >
              {info.title}
            </h2>

            <span
              style={{
                display: 'inline-block',
                backgroundColor: softBg,
                color: prim,
                padding: '6px 14px',
                borderRadius: '18px',
                fontSize: '13px',
                fontWeight: '700',
                marginBottom: '12px',
                textAlign: 'center',
                border: `1px solid ${accent}`,
              }}
            >
              {info.category}
            </span>
          </div>

          {hasQuickActions && (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
              {emails.map((address) => (
                <a
                  key={address}
                  href={`mailto:${address}`}
                  style={btnStyle}
                  aria-label={`Email ${address}`}
                  onMouseOver={onBtnOver}
                  onMouseOut={onBtnOut}
                >
                  <i className="fas fa-envelope" style={{ fontSize: '18px' }} />
                </a>
              ))}
              {info.facebook && (
                <a
                  href={info.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={btnStyle}
                  aria-label="Facebook"
                  onMouseOver={onBtnOver}
                  onMouseOut={onBtnOut}
                >
                  <i className="fab fa-facebook-f" style={{ fontSize: '20px' }} />
                </a>
              )}
              {info.instagram && (
                <a
                  href={info.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={btnStyle}
                  aria-label="Instagram"
                  onMouseOver={onBtnOver}
                  onMouseOut={onBtnOut}
                >
                  <i className="fab fa-instagram" style={{ fontSize: '20px' }} />
                </a>
              )}
              {info.app && (
                <a
                  href={info.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={appBtnStyle}
                  aria-label={currentLanguage === 'AR' ? 'تحميل تطبيق أركان' : 'Download Arkan App'}
                  title={currentLanguage === 'AR' ? 'تحميل التطبيق' : 'Download App'}
                  onMouseOver={onAppBtnOver}
                  onMouseOut={onAppBtnOut}
                >
                  {appIcon}
                </a>
              )}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              marginTop: '16px',
              width: '100%',
            }}
          >
            <a
              href="/assets/vcf/arkan-ceramics.vcf"
              download="arkan-ceramics.vcf"
              style={downloadBtnStyle}
              onMouseOver={onDownloadOver}
              onMouseOut={onDownloadOut}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {currentLanguage === 'AR' ? 'تحميل بطاقة الاتصال' : 'Download Contact Card'}
            </a>
            <a
              href="/assets/pdf/arkan-catalog.pdf"
              download="arkan-catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={downloadBtnStyle}
              onMouseOver={onDownloadOver}
              onMouseOut={onDownloadOut}
            >
              <i className="fas fa-file-pdf-o" style={{ fontSize: '16px' }} />
              {currentLanguage === 'AR' ? 'تحميل الكتالوج' : 'Download Catalog'}
            </a>
          </div>

          {hasContactDetails && (
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '18px',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                marginTop: '12px',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {phoneNumbers.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  {phoneNumbers.map((phone) => (
                    <div
                      key={phone}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        width: '100%',
                      }}
                    >
                      <a
                        href={`tel:${phone}`}
                        style={detailActionBtnStyle}
                        aria-label={`Call ${phone}`}
                        onMouseOver={onBtnOver}
                        onMouseOut={onBtnOut}
                        onMouseDown={onBtnOver}
                        onMouseUp={onBtnOut}
                        onTouchStart={onBtnOver}
                        onTouchEnd={onBtnOut}
                      >
                        {phoneIcon}
                      </a>
                      <a
                        href={`tel:${phone}`}
                        style={{
                          ...detailLinkStyle,
                          flex: 1,
                          textAlign: 'center',
                          textDecoration: 'none',
                        }}
                      >
                        {phone}
                      </a>
                      <a
                        href={toWhatsApp(phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={detailActionBtnStyle}
                        aria-label={`WhatsApp ${phone}`}
                        onMouseOver={onBtnOver}
                        onMouseOut={onBtnOut}
                        onMouseDown={onBtnOver}
                        onMouseUp={onBtnOut}
                        onTouchStart={onBtnOver}
                        onTouchEnd={onBtnOut}
                      >
                        {whatsAppIcon}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {info.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={iconBadgeStyle}>
                    <i className="fas fa-link" style={{ fontSize: '12px', color: accent }} />
                  </span>
                  <a href={info.website} target="_blank" rel="noopener noreferrer" style={detailLinkStyle}>
                    {info.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </div>
              )}

              {info.location && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={iconBadgeStyle}>
                    <i className="fas fa-map-marker-alt" style={{ fontSize: '16px', color: accent }} />
                  </span>
                  <span style={{ ...detailLinkStyle, textDecoration: 'none' }}>{info.location}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArkanCeramics;
