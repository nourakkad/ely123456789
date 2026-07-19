const path = require('path');
const { generateSW } = require('workbox-build');
const prerenderRoutes = require('./prerender-routes');

const buildDir = path.join(__dirname, '..', 'build');

// Do not fall back to index.html for prerendered routes — that causes a homepage flash
// before React Router renders the contact/menu page.
const prerenderDenylist = prerenderRoutes
  .filter((route) => route !== '/')
  .map((route) => new RegExp(`^${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));

generateSW({
  swDest: path.join(buildDir, 'service-worker.js'),
  globDirectory: buildDir,
  globPatterns: ['**/*.{html,js,css,json,woff2}'],
  globIgnores: ['**/service-worker.js'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  skipWaiting: true,
  clientsClaim: true,
  navigateFallback: '/index.html',
  navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/, ...prerenderDenylist],
  runtimeCaching: [
    {
      urlPattern: ({ url }) => /\.pdf(?:\?|$)/i.test(`${url.pathname}${url.search}`),
      handler: 'NetworkOnly',
    },
    {
      urlPattern: ({ url }) =>
        /\.(?:png|jpg|jpeg|webp|svg|gif|vcf)$/i.test(url.pathname),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets-v2',
        expiration: { maxEntries: 120 },
      },
    },
  ],
})
  .then(({ count, size, warnings }) => {
    warnings.forEach((warning) => console.warn(warning));
    console.log(`Service worker generated: ${count} files precached (${size} bytes).`);
  })
  .catch((error) => {
    console.error('Service worker generation failed:', error);
    process.exit(1);
  });
