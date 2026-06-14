import React, { useState } from 'react';
import useBilingualLanguage from './useBilingualLanguage';

/**
 * @typedef {Object} BilingualText
 * @property {string} en
 * @property {string} ar
 */

/**
 * @typedef {Object} MenuItem
 * @property {BilingualText} name
 * @property {BilingualText} [description]
 * @property {number|string} price
 * @property {string} [image]
 * @property {string[]} [tags]
 */

/**
 * @typedef {Object} MenuCategory
 * @property {string} id
 * @property {BilingualText} title
 * @property {MenuItem[]} items
 */

/**
 * @typedef {Object} RestaurantConfig
 * @property {BilingualText} name
 * @property {BilingualText} [tagline]
 * @property {string} logo
 * @property {BilingualText} [location]
 * @property {string} [phone]
 * @property {string} [whatsapp]
 * @property {string} [instagram]
 * @property {string} [facebook]
 * @property {BilingualText} [currency]
 */

/**
 * @typedef {Object} BrandColors
 * @property {string} primary
 * @property {string} primaryHover
 * @property {string} secondary
 * @property {string} wash
 * @property {string} ink
 */

const formatPrice = (price, currencyLabel) => {
  if (price === undefined || price === null || price === '') return '';
  if (typeof price === 'string') return price;
  return `${price.toLocaleString()} ${currencyLabel}`.trim();
};

const RestaurantMenuBase = ({ restaurant, colors, categories = [] }) => {
  const { toggleLanguage, t, isArabic, currentLanguage } = useBilingualLanguage();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '');

  const c = {
    primary: colors.primary,
    primaryHover: colors.primaryHover ?? colors.primary,
    secondary: colors.secondary,
    wash: colors.wash,
    ink: colors.ink,
  };

  const currencyLabel = t(restaurant.currency) || (isArabic ? 'ل.س' : 'SYP');
  const visibleCategories = categories.length > 0 ? categories : [];
  const activeItems = visibleCategories.find((cat) => cat.id === activeCategory)?.items ?? [];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 12px 32px',
        minHeight: '100vh',
        background: "url('/assets/images/blog-left-dec.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        dir="ltr"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '420px',
          marginBottom: '12px',
        }}
      >
        <a href="https://elyptek.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <img
            src="/assets/images/logo12.png"
            alt="Elyptek"
            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          />
        </a>

        <button
          type="button"
          onClick={toggleLanguage}
          style={{
            padding: '10px 18px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: c.secondary,
            border: `2px solid ${c.primary}`,
            boxShadow: `0 0 0 1px ${c.wash}, 0 2px 0 0 ${c.ink}`,
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(15px)',
            minWidth: '80px',
            textAlign: 'center',
            letterSpacing: '0.5px',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = c.primary;
            e.target.style.color = '#fff';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.target.style.color = c.secondary;
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {currentLanguage === 'EN' ? 'العربية' : 'English'}
        </button>
      </div>

      <div dir={isArabic ? 'rtl' : 'ltr'} style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            border: `2px solid ${c.primary}`,
            borderRadius: '28px',
            boxShadow: `6px 6px 0 0 ${c.ink}, 0 20px 40px ${c.secondary}1f`,
            padding: '16px',
            marginBottom: '16px',
            overflow: 'hidden',
          }}
        >
          <img
            src={restaurant.logo}
            alt={t(restaurant.name)}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              maxHeight: '160px',
              borderRadius: '16px',
              border: `2px solid ${c.primary}`,
              boxShadow: `4px 4px 0 0 ${c.ink}`,
              objectFit: 'contain',
              backgroundColor: c.wash,
            }}
          />
        </div>

        {visibleCategories.length > 0 && (
          <>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '12px',
                justifyContent: 'center',
              }}
            >
              {visibleCategories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '20px',
                      border: `2px solid ${isActive ? c.primary : c.secondary}44`,
                      backgroundColor: isActive ? c.primary : 'rgba(255, 255, 255, 0.92)',
                      color: isActive ? '#fff' : c.secondary,
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: isActive ? `0 2px 0 0 ${c.ink}` : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {t(category.title)}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${c.primary}`,
                borderRadius: '24px',
                boxShadow: `4px 4px 0 0 ${c.ink}`,
                overflow: 'hidden',
              }}
            >
              {activeItems.length === 0 ? (
                <p style={{ padding: '24px', textAlign: 'center', color: c.secondary, margin: 0 }}>
                  {isArabic ? 'لا توجد عناصر في هذه الفئة' : 'No items in this category yet'}
                </p>
              ) : (
                activeItems.map((item, index) => (
                  <div
                    key={`${activeCategory}-${index}`}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '16px',
                      borderBottom: index < activeItems.length - 1 ? `1px solid ${c.secondary}22` : 'none',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '12px',
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontSize: '15px',
                            fontWeight: '700',
                            color: c.secondary,
                            lineHeight: 1.3,
                          }}
                        >
                          {t(item.name)}
                        </h3>
                        {formatPrice(item.price, currencyLabel) && (
                          <span
                            style={{
                              flexShrink: 0,
                              fontWeight: '800',
                              color: c.primary,
                              fontSize: '14px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {formatPrice(item.price, currencyLabel)}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p
                          style={{
                            margin: '6px 0 0',
                            fontSize: '12px',
                            color: c.secondary,
                            opacity: 0.75,
                            lineHeight: 1.45,
                          }}
                        >
                          {t(item.description)}
                        </p>
                      )}
                      {item.tags?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: '10px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.4px',
                                padding: '3px 8px',
                                borderRadius: '10px',
                                backgroundColor: c.wash,
                                color: c.secondary,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={t(item.name)}
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          flexShrink: 0,
                          border: `1px solid ${c.secondary}33`,
                          boxShadow: `2px 2px 0 0 ${c.secondary}22`,
                        }}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {(restaurant.instagram || restaurant.facebook) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '20px',
              flexWrap: 'wrap',
            }}
          >
            {restaurant.instagram && (
              <a
                href={restaurant.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: c.secondary, fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
              >
                Instagram
              </a>
            )}
            {restaurant.facebook && (
              <a
                href={restaurant.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: c.secondary, fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
              >
                Facebook
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuBase;
