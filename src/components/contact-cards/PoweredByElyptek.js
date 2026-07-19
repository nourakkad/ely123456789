import React from 'react';
import ElyptekWord from '../ElyptekWord';

const ELYPTEK_URL = 'https://elyptek.com';

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
        background: 'transparent',
        boxShadow: 'none',
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
          background: 'transparent',
        }}
      >
        {isAr ? 'مدعوم من ' : 'Powered by '}
        <bdi>
          <a
            href={ELYPTEK_URL}
            title={isAr ? 'إيليبتك — حلول برمجية وتقنية' : 'Elyptek — Software & technology'}
            rel="noopener noreferrer"
            dir="ltr"
            className="elyptek-word-link"
            style={{
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <ElyptekWord tm />
          </a>
        </bdi>
      </p>
    </footer>
  );
};

export default PoweredByElyptek;
