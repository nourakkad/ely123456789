const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Dev-only: CRA `npm start` has no Netlify redirects. Proxies `/api/send-mail`
 * → local Netlify function runtime (run `npm run functions` in another terminal).
 *
 * Or use `npm run dev` (netlify dev) instead of this combo.
 *
 * Override with NETLIFY_FUNCTIONS_TARGET=http://127.0.0.1:...
 */
module.exports = function setupProxy(app) {
  const target = process.env.NETLIFY_FUNCTIONS_TARGET || 'http://127.0.0.1:9999';

  app.use(
    '/api/send-mail',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: { '^/api/send-mail': '/.netlify/functions/send-mail' },
      logLevel: 'silent',
    })
  );
};
