import { readdirSync, existsSync, unlinkSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const buildDir = join(root, 'build');

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = extname(entry.name).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    if (entry.name === 'memori_logo.png') continue;

    const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');

    try {
      execFileSync('cwebp', ['-q', '85', fullPath, '-o', webpPath], { stdio: 'inherit' });
      console.log(`Converted ${fullPath} -> ${webpPath}`);
      unlinkSync(fullPath);
    } catch (error) {
      console.error(`Failed to convert ${fullPath}:`, error.message);
      process.exitCode = 1;
    }
  }
}

if (existsSync(buildDir)) {
  walk(buildDir);
}
