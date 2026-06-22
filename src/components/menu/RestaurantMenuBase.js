import React, { useState, useEffect } from 'react';
import PoweredByElyptek from '../contact-cards/PoweredByElyptek';
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
 * @property {BilingualText} [promo]
 * @property {string} logo
 * @property {BilingualText} [location]
 * @property {string} [phone]
 * @property {string} [whatsapp]
 * @property {string} [instagram]
 * @property {string} [facebook]
 * @property {BilingualText} [currency]
 * @property {string} [logoBackground]
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
  const [expandedDish, setExpandedDish] = useState(null);

  useEffect(() => {
    if (!expandedDish) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setExpandedDish(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [expandedDish]);

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
      <style>{`
        @keyframes menu-dish-pulse {
          0%, 100% { box-shadow: 0 0 0 0 ${c.primary}55, 2px 2px 0 0 ${c.secondary}22; }
          50% { box-shadow: 0 0 0 5px ${c.primary}33, 2px 2px 0 0 ${c.secondary}22; }
        }
        .menu-dish-thumb {
          animation: menu-dish-pulse 2.2s ease-in-out infinite;
        }
        .menu-dish-thumb:active img {
          transform: scale(0.95);
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          maxWidth: '420px',
          marginBottom: '12px',
        }}
      >
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
          <div
            style={{
              borderRadius: '16px',
              border: `2px solid ${c.primary}`,
              boxShadow: `4px 4px 0 0 ${c.ink}`,
              backgroundColor: restaurant.logoBackground ?? '#FFFFFF',
              padding: '12px',
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
                maxHeight: '140px',
                objectFit: 'contain',
              }}
            />
          </div>
          {restaurant.tagline && (
            <p
              style={{
                margin: '12px 0 0',
                padding: '10px 12px',
                backgroundColor: c.wash,
                borderRadius: '14px',
                border: `1px solid ${c.primary}44`,
                color: c.secondary,
                fontSize: '13px',
                fontWeight: '600',
                lineHeight: 1.55,
                textAlign: 'center',
              }}
            >
              {t(restaurant.tagline)}
            </p>
          )}
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
                      <button
                        type="button"
                        className="menu-dish-thumb"
                        onClick={() => setExpandedDish({ src: item.image, name: t(item.name) })}
                        aria-label={isArabic ? `اضغط لتكبير ${t(item.name)}` : `Tap to enlarge ${t(item.name)}`}
                        style={{
                          position: 'relative',
                          padding: 0,
                          border: `2px solid ${c.primary}`,
                          borderRadius: '14px',
                          background: 'none',
                          cursor: 'pointer',
                          flexShrink: 0,
                          overflow: 'hidden',
                          lineHeight: 0,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={t(item.name)}
                          style={{
                            display: 'block',
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
                            pointerEvents: 'none',
                          }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            backgroundColor: c.primary,
                            color: '#fff',
                            fontSize: '9px',
                            fontWeight: '700',
                            padding: '3px 7px',
                            borderRadius: '10px',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            boxShadow: `0 1px 0 0 ${c.ink}`,
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14zM11 8v6M8 11h6" />
                          </svg>
                          {isArabic ? 'اضغط' : 'Tap'}
                        </span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {restaurant.promo && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: c.wash,
              borderRadius: '18px',
              border: `2px solid ${c.primary}`,
              boxShadow: `3px 3px 0 0 ${c.ink}`,
            }}
          >
            {t(restaurant.promo)
              .split('\n\n')
              .map((paragraph, index, paragraphs) => (
                <p
                  key={paragraph.slice(0, 24)}
                  style={{
                    margin: index < paragraphs.length - 1 ? '0 0 10px' : 0,
                    color: index === paragraphs.length - 1 ? c.secondary : c.ink,
                    fontSize: index === paragraphs.length - 1 ? '14px' : '13px',
                    fontWeight: index === paragraphs.length - 1 ? '800' : '600',
                    lineHeight: 1.6,
                    textAlign: 'center',
                  }}
                >
                  {paragraph}
                </p>
              ))}
          </div>
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

      <PoweredByElyptek currentLanguage={currentLanguage} />

      {expandedDish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={expandedDish.name}
          onClick={() => setExpandedDish(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(6px)',
          }}
        >
          <button
            type="button"
            onClick={() => setExpandedDish(null)}
            aria-label={isArabic ? 'إغلاق' : 'Close'}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: c.secondary,
              fontSize: '22px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 2px 0 0 ${c.ink}`,
            }}
          >
            ×
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '360px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <img
              src={expandedDish.src}
              alt={expandedDish.name}
              style={{
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '20px',
                border: `3px solid ${c.primary}`,
                boxShadow: `6px 6px 0 0 ${c.ink}`,
                backgroundColor: '#fff',
              }}
            />
            <p
              style={{
                margin: 0,
                color: '#fff',
                fontSize: '18px',
                fontWeight: '800',
                textAlign: 'center',
              }}
            >
              {expandedDish.name}
            </p>
            <p
              style={{
                margin: 0,
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {isArabic ? 'اضغط خارج الصورة للإغلاق' : 'Tap outside to close'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuBase;
