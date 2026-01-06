import React, { useState, useEffect } from 'react';

const DrNaderAlmzayek = () => {
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

  const doctorInfo = {
    title: currentLanguage === 'AR' ? "د. نادر المزيك" : "Dr.Nader Almzayek",
    category: currentLanguage === 'AR' ? "استشاري جراحة العظام" : "Orthopedic Surgeon",
    image: "/assets/logo/dr-nader-almzayek.jpg",
    instagram: "https://www.instagram.com/dr.naderalmzayek/?igsh=OGd4azJtdzk1ZTNi#",
    facebook: "https://www.facebook.com/DrNaderAlmzayek?mibextid=wwXIfr&rdid=uMMSheNmjXKJUi8t&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17hyMpNfM7%2F%3Fmibextid%3DwwXIfr#",
    phone: "+963 944 610 099",
 
   };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 12px',
      minHeight: '100vh',
      background: `url('/assets/images/blog-left-dec.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '360px',
        marginBottom: '12px'
      }}>
        {/* Elyptek Logo */}
        <div>
          <a 
            href="https://elyptek.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <img 
              src="/assets/images/logo12.png" 
              alt="Elyptek"
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                objectFit: 'contain',
                transition: 'all 0.3s ease'
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

        {/* Language Switcher */}
        <button
          onClick={() => {
            const newLang = currentLanguage === 'EN' ? 'AR' : 'EN';
            setCurrentLanguage(newLang);
            localStorage.setItem('language', newLang);
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLang } }));
          }}
          style={{
            padding: '10px 18px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#cc7a00',
            border: '2px solid #ffa700',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 4px 15px rgba(255, 167, 0, 0.2)',
            minWidth: '80px',
            textAlign: 'center',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#ffa700';
            e.target.style.color = '#fff';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(255, 167, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.target.style.color = '#cc7a00';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255, 167, 0, 0.2)';
          }}
        >
          {currentLanguage === 'EN' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Main Card */}
      <div style={{
        width: '100%',
        maxWidth: '360px',
        aspectRatio: '1/1',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '28px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px'
        }}>
          {/* Profile Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
            <img
              src={doctorInfo.image}
              alt={doctorInfo.title}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '4px solid #ffa700',
                boxShadow: '0 8px 25px rgba(255, 167, 0, 0.3)',
                marginBottom: '12px',
                objectFit: 'cover'
              }}
            />
            <h2 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#cc7a00',
              margin: '4px 0 0 0',
              textAlign: 'center'
            }}>
              {doctorInfo.title}
            </h2>
         
            <span style={{
              display: 'inline-block',
              backgroundColor: '#fff3e0',
              color: '#cc7a00',
              padding: '6px 14px',
              borderRadius: '18px',
              fontSize: '13px',
              fontWeight: '700',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              {currentLanguage === 'AR' ? 'استشاري جراحة العظام' : 'Orthopedic Surgeon'}
            </span>
          </div>

          
          {/* Quick Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '16px'
          }}>
            <a 
              href={`tel:${doctorInfo.phone}`}
              style={{
                backgroundColor: '#ffa700',
                color: '#fff',
                padding: '12px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(255, 167, 0, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e69500';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(255, 167, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffa700';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 167, 0, 0.3)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.958l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.958-.45l2.064.516A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" />
              </svg>
            </a>
            <a 
  href={`mailto:${doctorInfo.email}`}
  style={{
    backgroundColor: '#ffa700',
    color: '#fff',
    padding: '12px',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(255, 167, 0, 0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px'
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = '#e69500';
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 6px 16px rgba(255, 167, 0, 0.4)';
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = '#ffa700';
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 4px 12px rgba(255, 167, 0, 0.3)';
  }}
>
  {/* Modern Classic Envelope Icon */}
  <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" 
       fill="currentColor" 
       style={{ width: '20px', height: '20px' }}>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 
             2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
             4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
</a>

            <a 
              href={`https://wa.me/963944610099`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#ffa700',
                color: '#fff',
                padding: '12px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(255, 167, 0, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e69500';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(255, 167, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffa700';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 167, 0, 0.3)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.77 11.77 0 0012.02 0C5.61 0 .25 5.35.25 11.74c0 2.07.55 4.1 1.6 5.9L0 24l6.52-1.7a11.68 11.68 0 005.49 1.4h.01c6.41 0 11.77-5.36 11.77-11.75 0-3.15-1.22-6.11-3.47-8.47zm-8.5 18.2c-1.7 0-3.39-.46-4.86-1.33l-.35-.2-3.87 1.01 1.03-3.77-.23-.39a9.72 9.72 0 01-1.46-5.1c0-5.4 4.4-9.8 9.81-9.8a9.72 9.72 0 016.94 2.87 9.63 9.63 0 012.87 6.93c0 5.4-4.4 9.8-9.8 9.8zm5.45-7.42c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.66.15-.19.3-.76.95-.93 1.14-.17.2-.34.22-.64.07a7.88 7.88 0 01-2.3-1.42 8.62 8.62 0 01-1.6-2.03c-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.19.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.57-.48-.49-.66-.5h-.57c-.2 0-.52.07-.79.35-.27.3-1.03 1-1.03 2.43s1.05 2.82 1.2 3.01c.15.19 2.06 3.16 5 4.43.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.34z"/>
              </svg>
            </a>
          </div>

          {/* Download VCF Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px'
          }}>
            <a
              href="/dr-nader-almzayek.vcf"
              download="dr-nader-almzayek.vcf"
              style={{
                backgroundColor: '#ffa700',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 167, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.5px',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e69500';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 167, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffa700';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 167, 0, 0.3)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {currentLanguage === 'AR' ? 'تحميل بطاقة الاتصال' : 'Download Contact Card'}
            </a>
          </div>

          {/* Contact Info List */}
          <div style={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '18px',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            marginTop: '12px',
            gap: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
           
            
           
            {/* Social Media Links */}
            
          
            
            {doctorInfo.facebook && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  backgroundColor: '#ffa700', 
                  padding: '8px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}>
                  <i className="fab fa-facebook" style={{ fontSize: '16px', color: '#fff' }}></i>
                </span>
                <a 
                  href={doctorInfo.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontWeight: '600', color: '#cc7a00', fontSize: '13px', textDecoration: 'underline' }}
                >
                  Dr.Nader Almzayek
                </a>
              </div>
            )}

            {doctorInfo.instagram && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  backgroundColor: '#ffa700', 
                  padding: '8px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}>
                  <i className="fab fa-instagram" style={{ fontSize: '16px', color: '#fff' }}></i>
                </span>
                <a 
                  href={doctorInfo.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontWeight: '600', color: '#cc7a00', fontSize: '13px', textDecoration: 'underline' }}
                >
                  @dr.naderalmzayek
                </a>
              </div>
            )}

            

            

            
           
          </div>

      
        </div>
      </div>
    </div>
  );
};

export default DrNaderAlmzayek; 