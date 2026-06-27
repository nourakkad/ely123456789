const path = require('path');
const { generateSW } = require('workbox-build');

const buildDir = path.join(__dirname, '..', 'build');

generateSW({
  swDest: path.join(buildDir, 'service-worker.js'),
  globDirectory: buildDir,
  globPatterns: ['**/*.{html,js,css,json,woff2}'],
  globIgnores: ['**/service-worker.js'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  skipWaiting: true,
  clientsClaim: true,
  navigateFallback: '/index.html',
  navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
  runtimeCaching: [
    {
      urlPattern: ({ url }) =>
        /\.(?:png|jpg|jpeg|webp|svg|gif|vcf)$/i.test(url.pathname),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets',
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
