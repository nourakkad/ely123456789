const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');
const routes = require('./prerender-routes');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = process.env.PRERENDER_PORT || 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const routeToFile = (route) => {
  if (route === '/') return path.join(BUILD_DIR, 'index.html');
  const segments = route.replace(/^\//, '').split('/');
  return path.join(BUILD_DIR, ...segments, 'index.html');
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForServer = async (url, attempts = 40) => {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // server not ready yet
    }
    await wait(500);
  }
  throw new Error(`Static server did not start at ${url}`);
};

const findLocalChrome = () => {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
};

const launchBrowser = async () => {
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };

  if (process.env.NETLIFY || process.env.CI) {
    const chromium = require('@sparticuz/chromium');
    return puppeteer.launch({
      ...launchOptions,
      args: [...chromium.args, ...launchOptions.args],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const executablePath = findLocalChrome();
  if (!executablePath) {
    throw new Error(
      'Chrome/Edge not found for prerender. Set PUPPETEER_EXECUTABLE_PATH or install Google Chrome.',
    );
  }

  return puppeteer.launch({ ...launchOptions, executablePath });
};

const startServer = () => {
  const serveScript = path.join(__dirname, '..', 'node_modules', 'serve', 'build', 'main.js');

  const server = spawn(process.execPath, [serveScript, '-s', BUILD_DIR, '-l', String(PORT)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    cwd: path.join(__dirname, '..'),
  });

  server.stderr.on('data', (chunk) => process.stderr.write(chunk));
  server.stdout.on('data', (chunk) => process.stdout.write(chunk));

  return { server, ready: waitForServer(BASE_URL) };
};

const waitForPageReady = async (page) => {
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return root && root.textContent.trim().length > 40;
    },
    { timeout: 45000 },
  );

  await wait(750);
};

const prerenderRoute = async (browser, route) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  try {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2', timeout: 60000 });
    await waitForPageReady(page);

    let html = await page.content();
    html = html.replaceAll(BASE_URL, '');

    if (route !== '/') {
      html = html.replace(/<head>/i, '<head><base href="/">');
    }

    const outFile = routeToFile(route);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, 'utf8');

    const title = await page.title();
    console.log(`  ✓ ${route} → ${path.relative(BUILD_DIR, outFile)} (${title})`);
  } finally {
    await page.close();
  }
};

const main = async () => {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('Build folder not found. Run react-scripts build first.');
    process.exit(1);
  }

  if (process.env.SKIP_PRERENDER === '1') {
    console.log('SKIP_PRERENDER=1 — skipping prerender.');
    return;
  }

  console.log(`Prerendering ${routes.length} routes…`);

  const { server, ready } = startServer();
  await ready;

  const browser = await launchBrowser();

  try {
    for (const route of routes) {
      await prerenderRoute(browser, route);
    }
    console.log(`Prerender complete: ${routes.length} pages.`);
  } catch (error) {
    console.error('Prerender failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.kill('SIGTERM');
  }
};

main();
