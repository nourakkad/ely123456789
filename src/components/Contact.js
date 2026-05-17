import React, { useState, useEffect } from 'react';
import { getTranslation, getCountryCodes } from '../translations';
import { CONTACT_EMAIL } from '../env/publicConfig';
import { sendSiteMail } from '../lib/sendSiteMail';

const Contact = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [countryCodes, setCountryCodes] = useState(getCountryCodes('EN'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+963',
    mobile: '',
    message: ''
  });
  const [mobileError, setMobileError] = useState('');

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail.language;
      setCurrentLanguage(newLanguage);
      setCountryCodes(getCountryCodes(newLanguage));
    };

    // Get initial language from URL or localStorage
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'mobile') {
      // Check if it's Syrian number (+963)
      if (formData.countryCode === '+963') {
        if (!/^[0-9]{9}$/.test(value)) {
          setMobileError('Syrian numbers must be exactly 9 digits');
        } else {
          setMobileError('');
        }
      } else {
        // For other countries, use the general validation
        if (!/^[0-9]{7,15}$/.test(value)) {
          setMobileError('Enter a valid number (7-15 digits, numbers only)');
        } else {
          setMobileError('');
        }
      }
    }
    if (name === 'countryCode') {
      setFormData(prev => ({ ...prev, countryCode: value }));
      // Re-validate mobile number when country code changes
      if (formData.mobile) {
        if (value === '+963') {
          if (!/^[0-9]{9}$/.test(formData.mobile)) {
            setMobileError('Syrian numbers must be exactly 9 digits');
          } else {
            setMobileError('');
          }
        } else {
          if (!/^[0-9]{7,15}$/.test(formData.mobile)) {
            setMobileError('Enter a valid number (7-15 digits, numbers only)');
          } else {
            setMobileError('');
          }
        }
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobileError || !formData.mobile) return;
    
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

      setSubmitMessage('Message sent successfully! We will get back to you soon.');
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
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100%',height:'60px'}}>
          <path fill="rgba(255,167,0,0.8)" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"></path>
        </svg>
      </div>
      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading wow fadeIn contact-heading" data-wow-duration="1s" data-wow-delay="0.5s">
                <h6 className="contact-subtitle">{getTranslation('contactTitle', currentLanguage)}</h6>
                <h4 
                  className="contact-title"
                  dangerouslySetInnerHTML={{
                    __html: getTranslation('contactDescription', currentLanguage)
                  }}
                />
                <div className="line-dec contact-line"></div>
                <p className="contact-description">{getTranslation('contactSubDescription', currentLanguage)}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form id="contact" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="contact-dec">
                      <img src="assets/images/contact-dec-v2.png" alt="Contact Decoration" />
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div id="map">
                      <iframe 
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=33.519628,36.289302&language=en&zoom=18" 
                        width="100%" 
                        height="450" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Our Location"
                      ></iframe>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="fill-form">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="info-post">
                            <div className="icon">
                              <img src="assets/images/phone-icon.png" alt="Phone Icon" />
                              <a 
                                href="tel:+963993887774" 
                                style={{
                                  direction: 'ltr',
                                  unicodeBidi: 'plaintext',
                                  display: 'inline-block'
                                }}
                              >
                                +963 993 887 774
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="info-post">
                            <div className="icon">
                              <img src="assets/images/ml.png" alt="Email Icon" />
                              <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                style={{
                                  direction: 'ltr',
                                  unicodeBidi: 'plaintext',
                                  display: 'inline-block',
                                }}
                              >
                                {CONTACT_EMAIL}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <fieldset>
                              <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder={getTranslation('name', currentLanguage)} 
                                value={formData.name}
                                onChange={handleInputChange}
                                autoComplete="name" 
                                required 
                              />
                            </fieldset>
                            <fieldset>
                              <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder={getTranslation('email', currentLanguage)} 
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email" 
                                required 
                              />
                            </fieldset>
                          <fieldset>
                            <div className="mobile-input-group">
                              <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                              >
                                {countryCodes.map(c => (
                                  <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                                ))}
                              </select>
                              <input
                                type="tel"
                                name="mobile"
                                id="mobile"
                                placeholder={getTranslation('mobile', currentLanguage)}
                                value={formData.mobile}
                                onChange={handleInputChange}
                                autoComplete="tel"
                                required
                              />
                            </div>
                            {mobileError && <div className="form-error">{mobileError}</div>}
                          </fieldset>
                        </div>
                        <div className="col-lg-6">
                          <fieldset>
                            <textarea 
                              name="message" 
                              className="form-control" 
                              id="message" 
                              placeholder={getTranslation('message', currentLanguage)} 
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="5"
                              required
                            ></textarea>
                          </fieldset>
                        </div>
                        <div className="col-lg-12">
                          <fieldset>
                            <button 
                              type="submit" 
                              id="form-submit" 
                              className="main-button"
                              disabled={isSubmitting}
                              style={{
                                direction: 'ltr',
                                unicodeBidi: 'plaintext'
                              }}
                            >
                              <i className={`fa ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                              {isSubmitting ? getTranslation('sending', currentLanguage) : getTranslation('sendMessage', currentLanguage)}
                            </button>
                            {submitMessage && (
                              <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
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
      </div>
    </>
  );
};

export default Contact; 