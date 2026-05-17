const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Dev-only: proxy Netlify Functions path to `netlify functions:serve`.
 * Terminal 1: `npm run functions`  Terminal 2: `npm start`
 * Or run `npm run dev` (`npx netlify dev`).
 *
 * Override: NETLIFY_FUNCTIONS_TARGET=http://127.0.0.1:9999
 */
module.exports = function setupProxy(app) {
  const target = process.env.NETLIFY_FUNCTIONS_TARGET || 'http://127.0.0.1:9999';

  app.use(
    '/.netlify/functions',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      logLevel: 'silent',
    })
  );
};
