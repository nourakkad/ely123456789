import React, { useState, useEffect } from 'react';

const BRANCHES = [
  {
    nameAR: 'صالة زملكا مقابل فرن زملكا',
    nameEN: 'Zamalka hall — opposite Zamalka bakery',
    tel: '+963945000707',
    display: '+963 945 000 707',
  },
  {
    nameAR: 'صالة النعيم جديدة الشيباني',
    nameEN: 'Al-Naeem hall — Jedidet al-Shibaniyah',
    tel: '+963940050057',
    display: '+963 940 050 057',
  },
  {
    nameAR: 'صالة الصبورة',
    nameEN: 'Al-Sabboura hall',
    tel: '+963944271428',
    display: '+963 944 271 428',
  },
];

/** Engineering supervision — shown after branch list */
const ENGINEERING_SERVICE = {
  nameAR: 'إشراف هندسي',
  nameEN: 'Engineering supervision',
  tel: '+963941963141',
  display: '+963 941 963 141',
};

const GroupImdad = () => {
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

  /** Imdad logo identity; layout / shadows aligned with Deau Cacao card */
  const prim = '#4d4d4d'; // charcoal — fills same role as Deau burgundy
  const primHover = '#5c5c5c';
  const softText = '#5a5a5a'; // Deau secondary #6b3d4d → neutral analogue
  const accentYellow = '#ffcc00';
  /** Same yellow halo as tel/badge chips; reused for heading drop-shadow */
  const accentGlowOuter = '0 4px 12px rgba(255, 204, 0, 0.2)';
  const accentGlowInsetStack = `0 2px 0 rgba(0, 0, 0, 0.05), ${accentGlowOuter}, inset 0 1px 0 rgba(255, 255, 255, 0.9)`;

  const sectionTitle = currentLanguage === 'AR' ? 'مواقع الصالات (التواصل)' : 'Branch locations';

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
            color: softText,
            border: `2px solid ${prim}`,
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 4px 15px rgba(77, 77, 77, 0.2)',
            minWidth: '80px',
            textAlign: 'center',
            letterSpacing: '0.5px',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = prim;
            e.target.style.color = '#fff';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(77, 77, 77, 0.35)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.target.style.color = softText;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(77, 77, 77, 0.2)';
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
            justifyContent: 'flex-start',
            gap: '0',
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
                boxShadow: '0 8px 25px rgba(77, 77, 77, 0.3)',
                marginBottom: '12px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            >
              <img src="/assets/logo/imdad.png" alt="Imdad" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
              {currentLanguage === 'AR' ? 'مجموعة إمداد' : 'Group Imdad'}
            </h2>

            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(180deg, #fffef8 0%, #fff4c9 100%)',
                color: softText,
                padding: '6px 14px',
                borderRadius: '18px',
                fontSize: '13px',
                fontWeight: '700',
                marginTop: '8px',
                marginBottom: '12px',
                textAlign: 'center',
                border: `1px solid ${accentYellow}`,
                boxShadow: accentGlowInsetStack,
              }}
            >
              {currentLanguage === 'AR' ? 'Group Imdad' : 'مجموعة إمداد'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', width: '100%' }}>
            <a
              href="/assets/vcf/group-imdad.vcf"
              download="group-imdad.vcf"
              style={{
                  backgroundColor: prim,
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(77, 77, 77, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = primHover;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(92, 92, 92, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = prim;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(77, 77, 77, 0.3)';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {currentLanguage === 'AR' ? 'تحميل بطاقة الاتصال' : 'Download Contact Card'}
              </a>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '10px',
              }}
            >
              <a
                href="https://www.facebook.com/Groupimdadex"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  currentLanguage === 'AR' ? 'صفحة مجموعة إمداد على فيسبوك' : 'Group Imdad on Facebook'
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: prim,
                  border: `1px solid ${accentYellow}`,
                  boxShadow: accentGlowInsetStack,
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.96)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden style={{ width: '20px', height: '20px' }} fill="#fff">
                  <path d="M22 12.06C22 6.54 17.53 2 12 2S2 6.54 2 12.06c0 4.93 3.61 9.06 9.05 9.94v-7.04H7.9v-2.91h3.09V9.74c0-3.04 1.83-4.71 4.57-4.71 1.32 0 2.7.23 2.7.23v3.06h-1.52c-1.51 0-1.97.93-1.97 1.89v2.37h3.43l-.55 3.04h-2.88v7.06C18.4 21.12 22 16.99 22 12.06z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/imdadgroupex"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  currentLanguage === 'AR' ? 'صفحة مجموعة إمداد على إنستغرام' : 'Group Imdad on Instagram'
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: prim,
                  border: `1px solid ${accentYellow}`,
                  boxShadow: accentGlowInsetStack,
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.96)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                  <rect width="18" height="18" x="3" y="3" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
                </svg>
              </a>
            </div>
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
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: accentYellow,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '4px',
                  textAlign: currentLanguage === 'AR' ? 'right' : 'left',
                  filter: `drop-shadow(${accentGlowOuter})`,
                }}
              >
                {sectionTitle}
              </div>
              {BRANCHES.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    paddingTop: i > 0 ? '10px' : 0,
                    borderTop: i > 0 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: prim,
                      padding: '8px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      flexShrink: 0,
                    }}
                  >
                    <svg style={{ width: '16px', height: '16px', color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: '0 0 6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: prim,
                        lineHeight: 1.45,
                        textAlign: currentLanguage === 'AR' ? 'right' : 'left',
                        direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                      }}
                    >
                      {currentLanguage === 'AR' ? b.nameAR : b.nameEN}
                    </p>
                    <a
                      href={`tel:${b.tel}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '6px',
                        padding: '7px 12px',
                        borderRadius: '10px',
                        width: '100%',
                        boxSizing: 'border-box',
                        flexDirection: currentLanguage === 'AR' ? 'row-reverse' : 'row',
                        background: 'linear-gradient(180deg, #fffef8 0%, #fff4c9 100%)',
                        border: `1px solid ${accentYellow}`,
                        boxShadow: accentGlowInsetStack,
                        textDecoration: 'none',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.98)';
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: prim,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${accentYellow}`,
                          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: '15px', height: '15px' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={accentYellow}
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.958l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.958-.45l2.064.516A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z"
                          />
                        </svg>
                      </span>
                      <span
                        style={{
                          flex: 1,
                          minWidth: 0,
                          fontWeight: '800',
                          fontSize: '14px',
                          color: prim,
                          letterSpacing: '0.03em',
                          textAlign: currentLanguage === 'AR' ? 'right' : 'left',
                          lineHeight: 1.3,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {b.display}
                      </span>
                    </a>
                  </div>
                </div>
              ))}

              <div
                style={{
                  paddingTop: '12px',
                  marginTop: '4px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: prim,
                      padding: '8px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      flexShrink: 0,
                      boxSizing: 'border-box',
                    }}
                  >
                    <svg
                      style={{ width: '16px', height: '16px', color: '#fff' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                    </svg>
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: '0 0 6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: prim,
                        lineHeight: 1.45,
                        textAlign: currentLanguage === 'AR' ? 'right' : 'left',
                        direction: currentLanguage === 'AR' ? 'rtl' : 'ltr',
                      }}
                    >
                      {currentLanguage === 'AR' ? ENGINEERING_SERVICE.nameAR : ENGINEERING_SERVICE.nameEN}
                    </p>
                    <a
                      href={`tel:${ENGINEERING_SERVICE.tel}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '6px',
                        padding: '7px 12px',
                        borderRadius: '10px',
                        width: '100%',
                        boxSizing: 'border-box',
                        flexDirection: currentLanguage === 'AR' ? 'row-reverse' : 'row',
                        background: 'linear-gradient(180deg, #fffef8 0%, #fff4c9 100%)',
                        border: `1px solid ${accentYellow}`,
                        boxShadow: accentGlowInsetStack,
                        textDecoration: 'none',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.98)';
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: prim,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${accentYellow}`,
                          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: '15px', height: '15px' }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={accentYellow}
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.958l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.958-.45l2.064.516A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z"
                          />
                        </svg>
                      </span>
                      <span
                        style={{
                          flex: 1,
                          minWidth: 0,
                          fontWeight: '800',
                          fontSize: '14px',
                          color: prim,
                          letterSpacing: '0.03em',
                          textAlign: currentLanguage === 'AR' ? 'right' : 'left',
                          lineHeight: 1.3,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {ENGINEERING_SERVICE.display}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GroupImdad;
