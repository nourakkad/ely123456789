/**
 * Regenerates compressed WebP assets used on the homepage chrome.
 * Usage: node scripts/optimize-images.js
 * Requires: npm i sharp (dev) or npx with sharp available.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'assets', 'images');

const jobs = [
  { in: 'img.jpg', out: 'hero.webp', width: 1600, quality: 72 },
  { in: 'About us.png', out: 'about-us.webp', width: 800, quality: 75 },
  { in: 'logo12.png', out: 'logo-header.webp', width: 400, quality: 82 },
  { in: 'LOGO ELYPTEK .png', out: 'logo-footer.webp', width: 480, quality: 82 },
];

(async () => {
  for (const job of jobs) {
    const input = path.join(dir, job.in);
    const output = path.join(dir, job.out);
    if (!fs.existsSync(input)) {
      console.error('missing', input);
      continue;
    }
    await sharp(input)
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(output);
    const before = fs.statSync(input).size;
    const after = fs.statSync(output).size;
    console.log(
      `${job.out}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`,
    );
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
