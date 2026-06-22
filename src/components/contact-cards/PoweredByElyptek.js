import React from 'react';

const ELYPTEK_URL = 'https://elyptek.com';
const ELYPTEK_ORANGE = '#F8A400';

const linkStyle = {
  color: ELYPTEK_ORANGE,
  fontWeight: '700',
  textDecoration: 'none',
};

const PoweredByElyptek = ({ currentLanguage = 'EN' }) => {
  const isAr = currentLanguage === 'AR';

  return (
    <footer
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        width: '100%',
        maxWidth: '360px',
        marginTop: '16px',
        textAlign: 'center',
        direction: isAr ? 'rtl' : 'ltr',
      }}
      aria-label={isAr ? 'مدعوم من إيليبتك' : 'Powered by Elyptek'}
    >
      <p
        style={{
          margin: 0,
          fontSize: '13px',
          fontWeight: '600',
          color: 'rgba(26, 26, 26, 0.72)',
          lineHeight: 1.5,
        }}
      >
        {isAr ? 'مدعوم من ' : 'Powered by '}
        <bdi>
          <a
            href={ELYPTEK_URL}
            title={isAr ? 'إيليبتك — حلول برمجية وتقنية' : 'Elyptek — Software & technology'}
            rel="noopener noreferrer"
            dir="ltr"
            style={linkStyle}
          >
            Elyptek™
          </a>
        </bdi>
      </p>
    </footer>
  );
};

export default PoweredByElyptek;
