const page = (title, description, jsonLdType = 'WebPage') => ({
  title,
  description,
  jsonLdType,
});

/** SEO for main site routes (must match App.js paths). */
export const SITE_SEO_BY_PATH = {
  '/': page(
    'Elyptek | Digital Marketing & Software Solutions',
    'Elyptek — software development, web design, digital marketing, and mobile apps in Damascus, Syria. Explore our services, team, and portfolio.',
    'home',
  ),
  '/services': page(
    'Our Services | Elyptek',
    'Web development, digital marketing, branding, and custom software solutions tailored for your business. Elyptek, Damascus, Syria.',
  ),
  '/about': page(
    'About Us | Elyptek',
    'Learn about Elyptek — our mission, values, and the team behind digital and software solutions in Damascus, Syria.',
  ),
  '/team': page(
    'Our Team | Elyptek',
    'Meet the Elyptek team — developers, designers, and digital specialists building software and marketing solutions.',
  ),
  '/portfolio': page(
    'Portfolio | Elyptek',
    'Explore Elyptek portfolio — web design, software development, and digital marketing work across industries.',
  ),
  '/contact': page(
    'Contact Us | Elyptek',
    'Get in touch with Elyptek for web development, software, and digital marketing. Phone, email, and Damascus office.',
  ),
  '/form': page(
    'Careers | Job Application | Elyptek',
    'Apply to join Elyptek. Share your background, experience, and the role you are interested in. Software and digital solutions team in Damascus, Syria.',
    'form',
  ),
};

export const getSiteSeo = (pathname) => {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  return SITE_SEO_BY_PATH[normalized] ?? null;
};
