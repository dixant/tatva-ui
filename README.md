# Tatva UI

> **Tatva** (तत्व) — _element_ or _essence_ in Sanskrit.
> A small, own-your-code React design system.

[![npm](https://img.shields.io/npm/v/@dixant/tatva-ui?color=cb3837&label=npm&logo=npm)](https://www.npmjs.com/package/@dixant/tatva-ui)
[![CI](https://img.shields.io/github/actions/workflow/status/dixant/tatva-ui/ci.yml?branch=master&label=CI&logo=github)](https://github.com/dixant/tatva-ui/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-storybook-ff4785?logo=storybook&logoColor=white)](https://dixant.github.io/tatva-ui/)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle](https://img.shields.io/badge/bundle-26%20KB%20gz-blue.svg)](#bundle-size)

Live docs & Storybook: **https://dixant.github.io/tatva-ui/**

## Why Tatva

Tatva has **two install modes**. Pick either — or both.

| Mode                                   | Command                                                | What you get                                                                                     |
| -------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Library** (like MUI / Ant / Prime)   | `npm install @dixant/tatva-ui`                         | Import components, pin a version, upgrade centrally.                                             |
| **CLI** (like shadcn/ui)               | `npx @dixant/tatva-ui add button`                      | Copies the component source into `components/tatva/*`. You own it, edit anything, no dependency. |

Under the hood: **CSS Modules + CSS custom properties**. No Tailwind. No `styled-components`/Emotion runtime. WCAG 2.1 AA accessibility. Full TypeScript with all prop types exported. 22 test files, 130+ tests, axe-core assertions.

## How it compares

|                         | Tatva UI           | shadcn/ui         | MUI               | Ant Design        |
| ----------------------- | ------------------ | ----------------- | ----------------- | ----------------- |
| Copy-paste CLI          | ✅                 | ✅                | ❌                | ❌                |
| npm install library     | ✅                 | ❌                | ✅                | ✅                |
| Styling engine          | CSS Modules        | Tailwind          | Emotion           | CSS-in-JS         |
| Runtime styling cost    | **0 KB**           | 0 KB              | ~30 KB gz         | ~40 KB gz         |
| Tailwind required       | No                 | Yes               | No                | No                |
| Bundle (JS gz)          | **~23 KB**         | n/a (copy-paste)  | ~90 KB+           | ~100 KB+          |
| Prebuilt blocks         | 3 (login/pricing/dashboard) | ✅ many | Limited           | ProComponents     |
| Components              | 29                 | ~50               | ~200              | ~70               |
| Dark mode               | Built-in           | ✅                | ✅                | ✅                |
| SSR                     | Works              | Works             | Works             | Works             |
| License                 | MIT                | MIT               | MIT               | MIT               |

Tatva doesn't try to be exhaustive like MUI. It's the **smallest React kit** that gives you both installation models and doesn't force a CSS framework on you.

## Install (library mode)

```bash
npm install @dixant/tatva-ui
```

```tsx
import { ThemeProvider, Button } from '@dixant/tatva-ui';
import '@dixant/tatva-ui/style.css';

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button variant="primary">Hello, Tatva</Button>
    </ThemeProvider>
  );
}
```

## Install (CLI mode)

```bash
# From your existing React project root:
npx @dixant/tatva-ui init
npx @dixant/tatva-ui add button input select modal
```

That drops the source into `components/tatva/` (configurable via `.tatva.json`). Import it like any local module:

```tsx
import { Button } from './components/tatva/Button';
```

No dependency on `@dixant/tatva-ui` at runtime — you shipped the source. Edit, extend, fork.

Available registry items (`npx @dixant/tatva-ui list`):

**Primitives:** tokens, theme-provider, theme-light, theme-dark, utils
**Components:** button, input, textarea, checkbox, radio, select, toggle, typography, icon, stack, card, divider, tabs, breadcrumb, pagination, modal, toast, tooltip, alert, spinner, skeleton, dataTable, badge, avatar, accordion, emptyState, formField, searchInput, multiSelect

## Themes

Five brand presets ship out of the box. Swap by importing an extra CSS file after the base stylesheet:

```tsx
import '@dixant/tatva-ui/style.css';
import '@dixant/tatva-ui/themes/rose.css';   // or violet, emerald, orange, slate
```

Or toggle at runtime by setting `data-brand="rose"` on `<html>` and importing the aggregate `presets/index.css`.

Override any token:

```css
:root {
  --tatva-color-primary-600: #7c3aed; /* your brand */
}
```

## Blocks

Prebuilt page compositions using only Tatva primitives — copy any of them into your app:

- `LoginBlock` — full auth screen with OAuth buttons and form validation hooks
- `PricingBlock` — 3-tier pricing table with a highlighted "popular" tier
- `DashboardBlock` — KPI cards + tabbed data table with search, selection, pagination

```tsx
import { LoginBlock } from '@dixant/tatva-ui';
<LoginBlock onSubmit={(creds) => ...} />
```

## Theming

```tsx
import { useTheme } from '@dixant/tatva-ui';

function Toggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

All tokens are CSS custom properties — override them in a stylesheet loaded after `style.css`.

## Bundle size

- ESM: **~26 KB gzipped** (JS)
- CSS: **~7 KB gzipped**
- Zero runtime dependencies beyond React
- Fully tree-shakeable via `sideEffects: ['*.css']`

## Development

```bash
git clone https://github.com/dixant/tatva-ui
cd tatva-ui
npm install

npm run storybook        # localhost:6006
npm run test             # vitest
npm run test:coverage
npm run lint
npm run type-check
npm run build            # library bundle → dist/
npm run build:registry   # regenerate registry/ for CLI consumers
npm run build-storybook  # static docs → storybook-static/
```

## Contributing

1. Fork and create a feature branch.
2. Every component follows the same shape:
   `ComponentName.tsx` + `ComponentName.module.css` + `ComponentName.test.tsx` + `ComponentName.stories.tsx` + `index.ts`.
3. All classes camelCase, all colors/spacing via CSS custom properties.
4. `npm run lint && npm run type-check && npm run test && npm run build` must pass.
5. If you add a component, run `npm run build:registry` so the CLI picks it up.

## License

MIT © [Dixant Sharma](https://github.com/dixant)
