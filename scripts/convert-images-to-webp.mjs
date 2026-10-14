import { readdirSync, existsSync, unlinkSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDirs = [
  join(root, '.svelte-kit/cloudflare'),
  join(root, 'build'),
  join(root, '.svelte-kit/output/client')
];

async function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    const ext = extname(entry.name).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    if (
      entry.name === 'memori_logo.png' ||
      entry.name === 'memori_favicon.png' ||
      entry.name === 'social-preview.jpg'
    ) continue;

    const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');

    await sharp(fullPath).webp({ quality: 85 }).toFile(webpPath);
    unlinkSync(fullPath);
    console.log(`Converted ${fullPath} -> ${webpPath}`);
  }
}

for (const outputDir of outputDirs) {
  if (existsSync(outputDir)) {
    await walk(outputDir);
  }
}
