#!/usr/bin/env node
/**
 * Tatva UI CLI — Shadcn-style component installer.
 *
 *   npx @dixant/tatva-ui@latest init
 *   npx @dixant/tatva-ui@latest add button input select
 *   npx @dixant/tatva-ui@latest list
 *
 * By default, components land in ./components/tatva/<name>/.
 * Override via .tatva.json:
 *   {
 *     "componentsDir": "src/components/ui",
 *     "cssDir": "src/styles",
 *     "importAlias": "@/components/ui"
 *   }
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const REGISTRY_INDEX =
  'https://raw.githubusercontent.com/dixant/tatva-ui/master/registry/index.json';

const CONFIG_FILE = '.tatva.json';

const DEFAULTS = {
  componentsDir: 'components/tatva',
  cssDir: 'components/tatva/styles',
  importAlias: '',
};

const cwd = process.cwd();

// -------------------- utils --------------------

function readConfig() {
  const p = path.join(cwd, CONFIG_FILE);
  if (!fs.existsSync(p)) return null;
  try {
    return { ...DEFAULTS, ...JSON.parse(fs.readFileSync(p, 'utf8')) };
  } catch {
    console.error(`Tatva: could not parse ${CONFIG_FILE}. Using defaults.`);
    return { ...DEFAULTS };
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetch ${url} → ${r.status}`);
  return r.json();
}

function log(msg) {
  process.stdout.write(msg + '\n');
}

function color(code, s) {
  return process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s;
}
const green = (s) => color(32, s);
const red = (s) => color(31, s);
const gray = (s) => color(90, s);
const bold = (s) => color(1, s);

// -------------------- commands --------------------

async function cmdInit() {
  if (fs.existsSync(path.join(cwd, CONFIG_FILE))) {
    log(gray(`${CONFIG_FILE} already exists.`));
    return;
  }
  const cfg = { ...DEFAULTS };
  fs.writeFileSync(path.join(cwd, CONFIG_FILE), JSON.stringify(cfg, null, 2) + '\n');
  ensureDir(path.join(cwd, cfg.componentsDir));
  ensureDir(path.join(cwd, cfg.cssDir));
  log(green('✓ ') + `Created ${CONFIG_FILE} and folders.`);
  log(gray(`Next: npx @dixant/tatva-ui add tokens theme-provider button`));
}

async function cmdList() {
  const index = await fetchJson(REGISTRY_INDEX);
  const comps = index.items.filter((i) => !i.name.startsWith('theme-') && i.name !== 'tokens' && i.name !== 'utils');
  const prims = index.items.filter((i) => !comps.includes(i));
  log(bold('\nPrimitives:'));
  for (const p of prims) log(`  ${p.name}${gray(' — ' + p.displayName)}`);
  log(bold('\nComponents:'));
  for (const c of comps) log(`  ${c.name}${gray(' — ' + c.displayName)}`);
  log('');
}

async function cmdAdd(names) {
  const cfg = readConfig() ?? { ...DEFAULTS };
  const index = await fetchJson(REGISTRY_INDEX);
  const byName = new Map(index.items.map((i) => [i.name.toLowerCase(), i]));

  // Resolve transitive dependency set.
  const wanted = new Set();
  const queue = names.map((n) => n.toLowerCase());
  while (queue.length) {
    const n = queue.shift();
    if (wanted.has(n)) continue;
    const item = byName.get(n);
    if (!item) {
      console.error(red(`✗ Unknown component: ${n}`));
      process.exitCode = 1;
      continue;
    }
    wanted.add(n);
    for (const d of item.registryDependencies ?? []) queue.push(d);
  }

  for (const name of wanted) {
    const url = `${index.baseUrl}/${name}.json`;
    let manifest;
    try {
      manifest = await fetchJson(url);
    } catch (e) {
      console.error(red(`✗ Failed ${name}: ${e.message}`));
      continue;
    }

    for (const file of manifest.files) {
      let outPath;
      if (file.name.startsWith('tatva/')) {
        // Primitive files (tokens.css, ThemeProvider.tsx, etc.) go under
        // the componentsDir root, preserving their sub-path relative to `tatva/`.
        outPath = path.join(cwd, cfg.componentsDir, file.name.slice('tatva/'.length));
      } else {
        // Component files → componentsDir/<Component>/<file>
        outPath = path.join(cwd, cfg.componentsDir, manifest.displayName, file.name);
      }
      ensureDir(path.dirname(outPath));

      if (fs.existsSync(outPath)) {
        log(gray(`  skip  ${path.relative(cwd, outPath)} (already exists)`));
        continue;
      }
      let content = file.content;
      // Rewrite '../../utils/cn' -> '<alias-or-relative>/utils/cn'
      if (cfg.importAlias) {
        content = content.replaceAll("'../../utils/cn'", `'${cfg.importAlias}/utils/cn'`);
        content = content.replaceAll('"../../utils/cn"', `"${cfg.importAlias}/utils/cn"`);
        content = content.replaceAll("'../../utils/polymorphic'", `'${cfg.importAlias}/utils/polymorphic'`);
        content = content.replaceAll("'../", `'${cfg.importAlias}/`);
      }
      fs.writeFileSync(outPath, content);
      log(green('  add  ') + path.relative(cwd, outPath));
    }
  }

  log('');
  log(green(`✓ Added ${wanted.size} module(s).`));
  log(gray(`Remember to import the token CSS once:`));
  log(gray(`  import './${cfg.componentsDir}/tokens.css';`));
}

// -------------------- dispatch --------------------

const [cmd, ...args] = process.argv.slice(2);

const usage = `
Tatva UI CLI — copy React components into your project.

Usage:
  npx @dixant/tatva-ui init              Create ${CONFIG_FILE} + folders
  npx @dixant/tatva-ui list              List available components
  npx @dixant/tatva-ui add <name>...     Add one or more components
                                         (transitive deps auto-installed)

Examples:
  npx @dixant/tatva-ui add tokens theme-provider button input
  npx @dixant/tatva-ui add dataTable
`.trim();

(async () => {
  try {
    if (!cmd || cmd === '--help' || cmd === '-h') {
      log(usage);
      return;
    }
    if (cmd === 'init') return await cmdInit();
    if (cmd === 'list') return await cmdList();
    if (cmd === 'add') {
      if (args.length === 0) {
        console.error(red('Missing component name.'));
        log(usage);
        process.exitCode = 1;
        return;
      }
      return await cmdAdd(args);
    }
    console.error(red(`Unknown command: ${cmd}`));
    log(usage);
    process.exitCode = 1;
  } catch (e) {
    console.error(red(`✗ ${e.message}`));
    process.exitCode = 1;
  }
})();
