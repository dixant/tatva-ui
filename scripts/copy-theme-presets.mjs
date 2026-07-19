#!/usr/bin/env node
/**
 * Copy src/themes/presets/*.css to dist/themes/*.css so users can:
 *   import '@dixant/tatva-ui/themes/rose.css';
 * (Vite's library mode only emits one CSS file; extras must be copied.)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src/themes/presets');
const dest = path.join(root, 'dist/themes');
fs.mkdirSync(dest, { recursive: true });

for (const f of fs.readdirSync(src)) {
  if (!f.endsWith('.css')) continue;
  fs.copyFileSync(path.join(src, f), path.join(dest, f));
  console.log(`copied dist/themes/${f}`);
}
