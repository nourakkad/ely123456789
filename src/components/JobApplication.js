import React, { useState, useEffect, useMemo } from 'react';
import { getTranslation, getCountryCodes } from '../translations';
import { CONTACT_EMAIL } from '../env/publicConfig';
import { sendSiteMail } from '../lib/sendSiteMail';

const EXP_KEYS = ['', 'graduate', '1-2', '3-5', '5plus'];

const JobApplication = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [countryCodes, setCountryCodes] = useState(getCountryCodes('EN'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+963',
    mobile: '',
    position: '',
    experience: '',
    linkedin: '',
    cvLink: '',
    coverLetter: '',
  });
  const [mobileError, setMobileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validateMobile = (code, digits) => {
    if (!digits) return 'required';
    if (code === '+963') {
      return /^[0-9]{9}$/.test(digits) ? '' : 'sy';
    }
    return /^[0-9]{7,15}$/.test(digits) ? '' : 'intl';
  };

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const lang = event.detail.language;
      setCurrentLanguage(lang);
      setCountryCodes(getCountryCodes(lang));
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

  const mobileHelp = useMemo(() => {
    if (mobileError === 'sy') {
      return currentLanguage === 'AR' ? 'الرقم السوري 9 أرقام تماماً' : 'Syrian numbers must be exactly 9 digits';
    }
    if (mobileError === 'intl') {
      return currentLanguage === 'AR' ? 'أدخل رقماً صالحاً (7–15 رقماً)' : 'Enter a valid number (7–15 digits, numbers only)';
    }
    return '';
  }, [mobileError, currentLanguage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'mobile') {
        const err = validateMobile(next.countryCode, value);
        setMobileError(err);
      } else if (name === 'countryCode') {
        const err = prev.mobile ? validateMobile(value, prev.mobile) : '';
        setMobileError(err);
      }
      return next;
    });
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateMobile(formData.countryCode, formData.mobile);
    setMobileError(err);
    if (err) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendSiteMail('job', {
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        mobile: formData.mobile,
        position: formData.position,
        experience: formData.experience,
        linkedin: formData.linkedin,
        cvLink: formData.cvLink,
        coverLetter: formData.coverLetter,
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        countryCode: '+963',
        mobile: '',
        position: '',
        experience: '',
        linkedin: '',
        cvLink: '',
        coverLetter: '',
      });
      setMobileError('');
    } catch (error) {
      console.error('Job application mail error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = (key) => getTranslation(key, currentLanguage);

  return (
    <>
      <span id="top" />
      <div className="section-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '60px' }}>
          <path
            fill="rgba(255,167,0,0.8)"
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          />
        </svg>
      </div>
      <div id="job-application" className="contact-us section job-application-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div
                className="section-heading wow fadeIn contact-heading"
                data-wow-duration="1s"
                data-wow-delay="0.2s"
                dir={currentLanguage === 'AR' ? 'rtl' : 'ltr'}
              >
                <h6 className="contact-subtitle">{t('jobApplicationTitle')}</h6>
                <h4 className="contact-title">{t('jobApplicationHero')}</h4>
                <div className="line-dec contact-line" />
                <p className="contact-description">{t('jobApplicationDescription')}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form
                id="contact"
                aria-label={t('jobApplicationHero')}
                onSubmit={handleSubmit}
                dir={currentLanguage === 'AR' ? 'rtl' : 'ltr'}
              >
                <div className="fill-form job-fill-form" dir={currentLanguage === 'AR' ? 'rtl' : 'ltr'}>
                  <div className="row">
                    <div className="col-lg-6">
                      <fieldset>
                        <input
                          type="text"
                          name="name"
                          id="job-name"
                          placeholder={t('name')}
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
                          id="job-email"
                          placeholder={t('email')}
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="email"
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <div className="mobile-input-group">
                          <select name="countryCode" value={formData.countryCode} onChange={handleInputChange}>
                            {countryCodes.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.label} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            name="mobile"
                            id="job-mobile"
                            placeholder={t('mobile')}
                            value={formData.mobile}
                            onChange={handleInputChange}
                            autoComplete="tel"
                            required
                          />
                        </div>
                        {mobileHelp && <div className="form-error">{mobileHelp}</div>}
                      </fieldset>
                      <fieldset>
                        <input
                          type="text"
                          name="position"
                          id="job-position"
                          placeholder={t('jobPositionPlaceholder')}
                          value={formData.position}
                          onChange={handleInputChange}
                          required
                          aria-label={t('jobPositionLabel')}
                        />
                      </fieldset>
                      <fieldset>
                        <select name="experience" value={formData.experience} onChange={handleInputChange} aria-label={t('jobExperienceLabel')}>
                          {EXP_KEYS.map((k) => (
                            <option key={k || 'empty'} value={k}>
                              {k === ''
                                ? t('jobExperienceOption')
                                : t(
                                    k === 'graduate'
                                      ? 'jobExperienceGraduate'
                                      : k === '1-2'
                                        ? 'jobExperienceLt2'
                                        : k === '3-5'
                                          ? 'jobExperience2to5'
                                          : 'jobExperienceGt5'
                                  )}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <input
                          type="text"
                          name="linkedin"
                          id="job-linkedin"
                          placeholder={t('jobLinkedInLabel')}
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          autoComplete="url"
                          inputMode="url"
                        />
                      </fieldset>
                      <fieldset>
                        <input
                          type="text"
                          name="cvLink"
                          id="job-cv-link"
                          placeholder={t('jobCvLinkPlaceholder')}
                          value={formData.cvLink}
                          onChange={handleInputChange}
                          autoComplete="url"
                          inputMode="url"
                        />
                        <p className="job-form-hint">{t('jobCvHint')}</p>
                      </fieldset>
                      <fieldset>
                        <textarea
                          name="coverLetter"
                          className="form-control"
                          id="job-cover"
                          placeholder={t('jobCoverLetterPlaceholder')}
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          rows="8"
                          required
                          aria-label={t('jobCoverLetterLabel')}
                          minLength={40}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button type="submit" className="main-button" disabled={isSubmitting} style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>
                          <i className={`fa ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} aria-hidden />
                          {isSubmitting ? t('sending') : t('jobSubmit')}
                        </button>
                        {submitStatus === 'success' && (
                          <div className="submit-message success">{t('jobSubmitSuccess')}</div>
                        )}
                        {submitStatus === 'error' && (
                          <div className="submit-message error">
                            {t('jobSubmitError').replace(/\{\{email\}\}/g, CONTACT_EMAIL)}
                          </div>
                        )}
                      </fieldset>
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

export default JobApplication;
