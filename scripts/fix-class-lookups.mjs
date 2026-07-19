import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

const files = walk('src/components').filter((f) => f.endsWith('.tsx'));
let changed = 0;

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /styles\[`([a-zA-Z][a-zA-Z0-9]*)_\$\{([^}]+)\}`\]/g;
  if (!re.test(s)) continue;
  re.lastIndex = 0;
  let next = s.replace(
    re,
    (_, prefix, expr) => `vc(styles, '${prefix}', ${expr})`,
  );

  // Ensure vc is imported.
  next = next.replace(
    /import\s*\{\s*cn\s*\}\s*from\s*(['"])(\.\.\/\.\.\/utils\/cn)\1;/,
    `import { cn, vc } from $1$2$1;`,
  );

  fs.writeFileSync(f, next);
  changed++;
}
console.log(`transformed ${changed} files`);
