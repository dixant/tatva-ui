#!/usr/bin/env node
/**
 * Build a Shadcn-style component registry.
 *
 * Output:
 *   registry/index.json              — list of every component
 *   registry/components/<name>.json  — sources + dependency graph
 *
 * The consumer CLI (`bin/tatva.mjs`) fetches these JSONs over HTTPS and
 * writes them into the user's project.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const componentsDir = path.join(root, 'src/components');
const outDir = path.join(root, 'registry');
const outComponents = path.join(outDir, 'components');
fs.mkdirSync(outComponents, { recursive: true });

function slugFromDir(name) {
  return name[0].toLowerCase() + name.slice(1);
}

/** Scan a component .tsx/.module.css/.ts for imports from sibling components. */
function findLocalDeps(src, allNames) {
  const deps = new Set();
  const re = /from ['"]\.\.\/([A-Z][A-Za-z0-9]+)(?:['"]|\/)/g;
  for (const m of src.matchAll(re)) {
    if (allNames.has(m[1])) deps.add(slugFromDir(m[1]));
  }
  return [...deps];
}

const allDirs = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== '__tests__')
  .map((d) => d.name)
  .sort();

const allNames = new Set(allDirs);
const index = [];

for (const dirName of allDirs) {
  const compDir = path.join(componentsDir, dirName);
  const slug = slugFromDir(dirName);

  const wantedFiles = [
    `${dirName}.tsx`,
    `${dirName}.module.css`,
    `index.ts`,
  ];

  const files = [];
  let deps = new Set();

  for (const f of wantedFiles) {
    const p = path.join(compDir, f);
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, 'utf8');
    files.push({ name: f, content });
    for (const d of findLocalDeps(content, allNames)) deps.add(d);
  }

  const manifest = {
    name: slug,
    displayName: dirName,
    type: 'component',
    files,
    // Registry deps (other Tatva components) — CLI will fetch them too.
    registryDependencies: [...deps].filter((d) => d !== slug),
    // Runtime peer deps (react is always required).
    dependencies: [],
    devDependencies: [],
  };

  fs.writeFileSync(
    path.join(outComponents, `${slug}.json`),
    JSON.stringify(manifest, null, 2) + '\n',
  );
  index.push({
    name: slug,
    displayName: dirName,
    registryDependencies: manifest.registryDependencies,
  });
}

// Also include tokens + themes + utils as installable "primitives".
const primitives = [
  {
    name: 'tokens',
    displayName: 'Tokens',
    src: 'src/tokens/tokens.css',
    dest: 'tatva/tokens.css',
  },
  {
    name: 'theme-light',
    displayName: 'Theme (light)',
    src: 'src/themes/light.css',
    dest: 'tatva/themes/light.css',
  },
  {
    name: 'theme-dark',
    displayName: 'Theme (dark)',
    src: 'src/themes/dark.css',
    dest: 'tatva/themes/dark.css',
  },
  {
    name: 'theme-provider',
    displayName: 'ThemeProvider',
    src: 'src/themes/ThemeProvider.tsx',
    dest: 'tatva/ThemeProvider.tsx',
    also: [
      { src: 'src/themes/ThemeContext.ts', dest: 'tatva/ThemeContext.ts' },
      { src: 'src/themes/useTheme.ts', dest: 'tatva/useTheme.ts' },
    ],
  },
  {
    name: 'utils',
    displayName: 'cn / vc utilities',
    src: 'src/utils/cn.ts',
    dest: 'tatva/utils/cn.ts',
  },
];

for (const p of primitives) {
  const files = [];
  const push = (from, to) => {
    const abs = path.join(root, from);
    if (!fs.existsSync(abs)) return;
    files.push({ name: to, content: fs.readFileSync(abs, 'utf8') });
  };
  push(p.src, p.dest);
  for (const extra of p.also ?? []) push(extra.src, extra.dest);

  const manifest = {
    name: p.name,
    displayName: p.displayName,
    type: 'primitive',
    files,
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
  };
  fs.writeFileSync(
    path.join(outComponents, `${p.name}.json`),
    JSON.stringify(manifest, null, 2) + '\n',
  );
  index.push({
    name: p.name,
    displayName: p.displayName,
    registryDependencies: [],
  });
}

fs.writeFileSync(
  path.join(outDir, 'index.json'),
  JSON.stringify(
    {
      version: 1,
      generatedAt: new Date().toISOString(),
      // The CLI reads this base URL to fetch per-component JSONs.
      baseUrl:
        'https://raw.githubusercontent.com/dixant/tatva-ui/master/registry/components',
      items: index,
    },
    null,
    2,
  ) + '\n',
);

console.log(
  `registry: wrote ${index.length} manifest(s) to ${path.relative(root, outDir)}/`,
);
