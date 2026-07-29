import React, { useState, useEffect } from 'react';
import PoweredByElyptek from './PoweredByElyptek';
import { getWhatsAppWebUrl, handleWhatsAppClick } from './whatsappLink';

const LOGO = '/assets/logo/hiam-clinic.jpeg';

const BRANCHES = [
  {
    id: 'branch1',
    labelEn: 'Branch 1',
    labelAr: 'الفرع الأول',
    email: 'hiam.jabalee13@gmail.com',
    locationAr: 'شارع بغداد - شارع مرشد خاطر الطريق الراجع - مقابل صيدلية طارق العلبي',
    locationEn: 'Baghdad St. - Morshed Khater St. (return road) - opposite Tareq Al-Albi Pharmacy',
    landlines: [
      { display: '011 367 5011', tel: '+963113675011' },
      { display: '011 367 6011', tel: '+963113676011' },
    ],
    laser: { display: '+963 994 961 432', tel: '+963994961432', wa: '963994961432' },
    appointments: [
      { display: '+963 988 888 537', tel: '+963988888537', wa: '963988888537' },
      { display: '+963 996 266 930', tel: '+963996266930', wa: '963996266930' },
    ],
    vcf: '/assets/vcf/hiam-clinic-branch1.vcf',
    vcfFileName: 'hiam-clinic-branch1.vcf',
  },
  {
    id: 'branch2',
    labelEn: 'Branch 2',
    labelAr: 'الفرع الثاني',
    email: 'hiam.jabalee13@gmail.com',
    locationAr: 'السبع بحرات خلف بنك البركة شارع الباكستان الدخلة قبل نقابة المهندسين',
    locationEn: 'Sabaa Bahrat, behind Al Baraka Bank, Pakistan St., entrance before Engineers Syndicate',
    landlines: [
      { display: '011 559 8501', tel: '+963115598501' },
      { display: '011 554 5601', tel: '+963115545601' },
    ],
    laser: { display: '+963 994 310 484', tel: '+963994310484', wa: '963994310484' },
    appointments: [{ display: '+963 983 229 911', tel: '+963983229911', wa: '963983229911' }],
    vcf: '/assets/vcf/hiam-clinic-branch2.vcf',
    vcfFileName: 'hiam-clinic-branch2.vcf',
  },
  {
    id: 'branch3',
    labelEn: 'UAE Branch',
    labelAr: 'فرع الإمارات',
    email: 'h.jabalee@elyzee.ae',
    locationAr: 'مشفى الإليزيه - أبو ظبي - شارع الخليج العربي منطقة المشرف',
    locationEn: 'Elyzee Hospital - Abu Dhabi - Arabian Gulf St., Al Mushrif area',
    landlines: [{ display: '800 5005', tel: '8005005' }],
    laser: null,
    appointments: [{ display: '+971 50 270 8704', tel: '+971502708704', wa: '971502708704' }],
    vcf: '/assets/vcf/hiam-clinic-branch3.vcf',
    vcfFileName: 'hiam-clinic-branch3.vcf',
  },
];

const PhoneSvg = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.958l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.958-.45l2.064.516A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" />
  </svg>
);

const WaSvg = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.52 3.48A11.77 11.77 0 0012.02 0C5.61 0 .25 5.35.25 11.74c0 2.07.55 4.1 1.6 5.9L0 24l6.52-1.7a11.68 11.68 0 005.49 1.4h.01c6.41 0 11.77-5.36 11.77-11.75 0-3.15-1.22-6.11-3.47-8.47zm-8.5 18.2c-1.7 0-3.39-.46-4.86-1.33l-.35-.2-3.87 1.01 1.03-3.77-.23-.39a9.72 9.72 0 01-1.46-5.1c0-5.4 4.4-9.8 9.81-9.8a9.72 9.72 0 016.94 2.87 9.63 9.63 0 012.87 6.93c0 5.4-4.4 9.8-9.8 9.8zm5.45-7.42c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.66.15-.19.3-.76.95-.93 1.14-.17.2-.34.22-.64.07a7.88 7.88 0 01-2.3-1.42 8.62 8.62 0 01-1.6-2.03c-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.19.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.57-.48-.49-.66-.5h-.57c-.2 0-.52.07-.79.35-.27.3-1.03 1-1.03 2.43s1.05 2.82 1.2 3.01c.15.19 2.06 3.16 5 4.43.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.34z" />
  </svg>
);

const HiamClinic = () => {
  const [currentLanguage, setCurrentLanguage] = useState('AR');
  const [activeBranch, setActiveBranch] = useState(0);

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

  const c = {
    gold: '#C9A227',
    goldLight: '#E5C100',
    goldDark: '#A8871F',
    cream: '#FAF9F6',
    wash: '#FFFDF5',
    ink: '#3D3428',
  };
  const prim = c.gold;
  const primHover = c.goldDark;
  const accent = c.goldLight;
  const light = c.wash;

  const branch = BRANCHES[activeBranch];
  const isAr = currentLanguage === 'AR';

  const miniBtn = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: prim,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    flexShrink: 0,
    boxShadow: '0 2px 6px rgba(201, 162, 39, 0.3)',
    transition: 'all 0.2s ease',
  };

  const onMiniOver = (e) => {
    e.currentTarget.style.backgroundColor = primHover;
    e.currentTarget.style.transform = 'scale(1.06)';
  };
  const onMiniOut = (e) => {
    e.currentTarget.style.backgroundColor = prim;
    e.currentTarget.style.transform = 'scale(1)';
  };

  const PhoneRow = ({ phone }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      padding: '8px 10px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      border: `1px solid rgba(201, 162, 39, 0.25)`,
    }}>
      <a
        href={`tel:${phone.tel}`}
        style={{
          fontWeight: '700',
          color: c.ink,
          fontSize: '13px',
          textDecoration: 'none',
          letterSpacing: '0.2px',
          direction: 'ltr',
          flex: 1,
          minWidth: 0,
        }}
      >
        {phone.display}
      </a>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        <a
          href={`tel:${phone.tel}`}
          aria-label={`Call ${phone.display}`}
          style={miniBtn}
          onMouseOver={onMiniOver}
          onMouseOut={onMiniOut}
        >
          <PhoneSvg />
        </a>
        {phone.wa && (
          <a
            href={getWhatsAppWebUrl(phone.wa)}
            onClick={handleWhatsAppClick(phone.wa)}
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${phone.display}`}
            style={miniBtn}
            onMouseOver={onMiniOver}
            onMouseOut={onMiniOut}
          >
            <WaSvg />
          </a>
        )}
      </div>
    </div>
  );

  const Section = ({ icon, title, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <p style={{
        margin: 0,
        fontSize: '11px',
        fontWeight: '700',
        color: prim,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
      }}>
        <i className={icon} style={{ fontSize: '11px', width: '12px', textAlign: 'center' }} />
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px',
      minHeight: '100vh',
      background: `linear-gradient(160deg, ${c.cream} 0%, ${c.wash} 45%, #F5EDD8 100%)`,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        maxWidth: '360px',
        marginBottom: '8px',
      }}>
        <button
          type="button"
          onClick={() => {
            const newLang = currentLanguage === 'EN' ? 'AR' : 'EN';
            setCurrentLanguage(newLang);
            localStorage.setItem('language', newLang);
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLang } }));
          }}
          style={{
            padding: '8px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: prim,
            border: `2px solid ${prim}`,
            borderRadius: '25px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '72px',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = prim;
            e.target.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.target.style.color = prim;
          }}
        >
          {currentLanguage === 'EN' ? 'العربية' : 'English'}
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${accent}`,
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(201, 162, 39, 0.16)',
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {/* Compact brand header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={LOGO}
              alt="Hiam Clinic"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: `2px solid ${prim}`,
                boxShadow: '0 4px 14px rgba(201, 162, 39, 0.28)',
                objectFit: 'cover',
                backgroundColor: c.cream,
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '800',
                color: prim,
                margin: '0 0 2px',
                fontFamily: 'Georgia, "Times New Roman", serif',
                letterSpacing: '0.5px',
                lineHeight: 1.2,
              }}>
                Hiam Clinic
              </h2>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: c.ink, opacity: 0.75 }}>
                {isAr ? BRANCHES[activeBranch].labelAr : BRANCHES[activeBranch].labelEn}
              </p>
            </div>
          </div>

          {/* Branch tabs */}
          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
            {BRANCHES.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBranch(i)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '12px',
                  border: `1.5px solid ${activeBranch === i ? prim : 'rgba(201, 162, 39, 0.35)'}`,
                  backgroundColor: activeBranch === i ? prim : '#fff',
                  color: activeBranch === i ? '#fff' : prim,
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.25,
                  textAlign: 'center',
                }}
              >
                {isAr ? b.labelAr : b.labelEn}
              </button>
            ))}
          </div>

          {/* Dense contact block */}
          <div style={{
            width: '100%',
            backgroundColor: light,
            borderRadius: '16px',
            border: `1px solid rgba(201, 162, 39, 0.3)`,
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: prim,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}>
                <i className="fas fa-map-marker-alt" style={{ fontSize: '12px' }} />
              </span>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: c.ink, lineHeight: 1.45 }}>
                {isAr ? branch.locationAr : branch.locationEn}
              </p>
            </div>

            <a
              href={`mailto:${branch.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '8px 10px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: `1px solid rgba(201, 162, 39, 0.25)`,
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <i className="fas fa-envelope" style={{ color: prim, fontSize: '13px', flexShrink: 0 }} />
                <span style={{
                  fontWeight: '600',
                  color: c.ink,
                  fontSize: '12px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {branch.email}
                </span>
              </div>
              <span style={miniBtn}>
                <i className="fas fa-paper-plane" style={{ fontSize: '11px' }} />
              </span>
            </a>

            <Section icon="fas fa-phone" title={isAr ? 'أرضي' : 'Landline'}>
              {branch.landlines.map((phone) => (
                <PhoneRow key={phone.tel} phone={phone} />
              ))}
            </Section>

            {branch.laser && (
              <Section icon="fas fa-bolt" title={isAr ? 'مواعيد الليزر' : 'Laser'}>
                <PhoneRow phone={branch.laser} />
              </Section>
            )}

            <Section icon="fas fa-calendar-alt" title={isAr ? 'المواعيد' : 'Appointments'}>
              {branch.appointments.map((phone) => (
                <PhoneRow key={phone.tel} phone={phone} />
              ))}
            </Section>
          </div>

          <a
            href={branch.vcf}
            download={branch.vcfFileName}
            style={{
              backgroundColor: prim,
              color: '#fff',
              border: 'none',
              padding: '11px 18px',
              borderRadius: '22px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 12px rgba(201, 162, 39, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none',
              width: '100%',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = primHover;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = prim;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {isAr ? 'تحميل بطاقة الاتصال' : 'Download Contact Card'}
          </a>
        </div>
      </div>
      <PoweredByElyptek currentLanguage={currentLanguage} />
    </div>
  );
};

export default HiamClinic;
