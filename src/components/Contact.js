import React, { useState, useEffect } from 'react';
import { getTranslation, getCountryCodes } from '../translations';
import { CONTACT_EMAIL } from '../env/publicConfig';
import { sendSiteMail } from '../lib/sendSiteMail';
import {
  getGoogleMapsEmbedUrl,
  getGoogleMapsLinkUrl,
  getLocationLabel,
} from '../lib/location';

const Contact = () => {  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [countryCodes, setCountryCodes] = useState(getCountryCodes('EN'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+963',
    mobile: '',
    message: '',
  });
  const [mobileError, setMobileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const isAr = currentLanguage === 'AR';
  const t = (key) => getTranslation(key, currentLanguage);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail.language;
      setCurrentLanguage(newLanguage);
      setCountryCodes(getCountryCodes(newLanguage));
    };

    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    const langFromStorage = localStorage.getItem('language');

    if (langFromUrl && (langFromUrl === 'EN' || langFromUrl === 'AR')) {
      setCurrentLanguage(langFromUrl);
      setCountryCodes(getCountryCodes(langFromUrl));
    } else if (langFromStorage && (langFromStorage === 'EN' || langFromStorage === 'AR')) {
      setCurrentLanguage(langFromStorage);
      setCountryCodes(getCountryCodes(langFromStorage));
    }

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const validateMobile = (code, digits) => {
    if (!digits) return isAr ? 'الرقم مطلوب' : 'Mobile number is required';
    if (code === '+963') {
      return /^[0-9]{9}$/.test(digits)
        ? ''
        : isAr
          ? 'الرقم السوري 9 أرقام تماماً'
          : 'Syrian numbers must be exactly 9 digits';
    }
    return /^[0-9]{7,15}$/.test(digits)
      ? ''
      : isAr
        ? 'أدخل رقماً صالحاً (7–15 رقماً)'
        : 'Enter a valid number (7-15 digits, numbers only)';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'mobile') {
        setMobileError(validateMobile(next.countryCode, value));
      } else if (name === 'countryCode') {
        setMobileError(prev.mobile ? validateMobile(value, prev.mobile) : '');
      }
      return next;
    });
    setSubmitMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobileValidation = validateMobile(formData.countryCode, formData.mobile);
    if (mobileValidation) {
      setMobileError(mobileValidation);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await sendSiteMail('contact', {
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        mobile: formData.mobile,
        message: formData.message,
      });

      setSubmitMessage(
        isAr
          ? 'تم إرسال رسالتك بنجاح. سنعود إليك قريباً.'
          : 'Message sent successfully! We will get back to you soon.'
      );
      setFormData({
        name: '',
        email: '',
        countryCode: '+963',
        mobile: '',
        message: '',
      });
      setMobileError('');
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : isAr
            ? 'تعذّر إرسال الرسالة. يرجى المحاولة مرة أخرى.'
            : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="contact-us site-section contact-page-section">
      <div className="container">
        <div className="contact-page-inner">
          <div
            className="section-heading wow fadeIn contact-heading"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <h6 className="contact-subtitle">{t('contactTitle')}</h6>
            <h4
              className="contact-title"
              dangerouslySetInnerHTML={{ __html: t('contactDescription') }}
            />
            <div className="line-dec contact-line" />
            <p className="contact-description">{t('contactSubDescription')}</p>
          </div>

          <form
            id="contact-form"
            className="contact-form-card wow fadeInUp"
            onSubmit={handleSubmit}
            dir={isAr ? 'rtl' : 'ltr'}
            data-wow-duration="0.5s"
            data-wow-delay="0.25s"
          >
            <div className="contact-info-grid">
              <div className="info-post">
                <div className="icon">
                  <span className="contact-info-icon" aria-hidden="true">
                    <i className="fas fa-phone-alt" />
                  </span>
                  <a href="tel:+963993887774" dir="ltr">
                    +963 993 887 774
                  </a>
                </div>
              </div>
              <div className="info-post">
                <div className="icon">
                  <span className="contact-info-icon" aria-hidden="true">
                    <i className="fas fa-envelope" />
                  </span>
                  <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="row contact-page-layout">
              <div className="col-lg-5 contact-map-col">
                <div className="contact-map-card">
                  <a
                    className="contact-address-link"
                    href={getGoogleMapsLinkUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getLocationLabel(currentLanguage)}
                  </a>
                  <div id="map" className="contact-map-embed-wrap">
                    <iframe
                      src={getGoogleMapsEmbedUrl()}
                      className="contact-map-iframe"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={isAr ? 'موقع Elyptek — دمشق' : 'Elyptek location — Damascus'}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-7 contact-fields-col">
                <div className="fill-form contact-fill-form">
                  <div className="row contact-message-fields">
                    <div className="col-12 col-lg-6">
                      <fieldset>
                        <input
                          type="text"
                          name="name"
                          id="contact-name"
                          placeholder={t('name')}
                          value={formData.name}
                          onChange={handleInputChange}
                          autoComplete="name"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12 col-lg-6">
                      <fieldset>
                        <input
                          type="email"
                          name="email"
                          id="contact-email"
                          placeholder={t('email')}
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="email"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <fieldset>
                        <div className="mobile-input-group">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            aria-label={t('mobile')}
                          >
                            {countryCodes.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.label} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            name="mobile"
                            id="contact-mobile"
                            placeholder={t('mobile')}
                            value={formData.mobile}
                            onChange={handleInputChange}
                            autoComplete="tel"
                            required
                          />
                        </div>
                        {mobileError && <div className="form-error">{mobileError}</div>}
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <fieldset>
                        <textarea
                          name="message"
                          className="form-control contact-message-field"
                          id="contact-message"
                          placeholder={t('message')}
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="6"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12 contact-submit-col">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="main-button"
                          disabled={isSubmitting}
                          dir="ltr"
                        >
                          <i className={`fa ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} aria-hidden />
                          {isSubmitting ? t('sending') : t('sendMessage')}
                        </button>
                        {submitMessage && (
                          <div
                            className={`submit-message ${
                              submitMessage.includes('successfully') || submitMessage.includes('بنجاح')
                                ? 'success'
                                : 'error'
                            }`}
                          >
                            {submitMessage}
                          </div>
                        )}
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
