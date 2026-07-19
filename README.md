# Tatva UI

> **Tatva** (तत्व) — _element_ or _essence_ in Sanskrit.
> A production-quality React + TypeScript design system for enterprise applications.

[![npm version](https://img.shields.io/npm/v/@dixant/tatva-ui.svg)](https://www.npmjs.com/package/@dixant/tatva-ui)
[![CI](https://github.com/dixant/tatva-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/dixant/tatva-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Zero-runtime styling (CSS Modules + CSS custom properties), full TypeScript,
WCAG 2.1 AA accessibility, 80%+ test coverage per component, and no runtime
styling dependency.

## Installation

```bash
npm install @dixant/tatva-ui
```

Peer dependencies: `react >= 18`, `react-dom >= 18`.

## Quick Start

```tsx
import { ThemeProvider, Button } from '@dixant/tatva-ui';
import '@dixant/tatva-ui/style.css';

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tatva-theme">
      <Button variant="primary" onClick={() => alert('Hello, Tatva!')}>
        Hello, Tatva
      </Button>
    </ThemeProvider>
  );
}
```

## Theming

Tatva uses a token-based theme system driven entirely by CSS custom properties.

```tsx
import { useTheme } from '@dixant/tatva-ui';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}
```

Override tokens in your own stylesheet:

```css
[data-theme='light'] {
  --tatva-color-primary-500: #10b981; /* your brand green */
}
```

## Components

| Category      | Components                                                            |
| ------------- | --------------------------------------------------------------------- |
| Primitives    | Button, Input, Textarea, Checkbox, Radio, Select, Toggle, Typography, Icon |
| Layout        | Stack, Card, Divider, Tabs, Breadcrumb, Pagination                    |
| Feedback      | Modal, Toast, Tooltip, Alert, Spinner, Skeleton                       |
| Data Display  | DataTable, Badge, Avatar, Accordion, EmptyState                       |
| Forms         | FormField, SearchInput, MultiSelect                                   |

Full API docs live in Storybook: `npm run storybook`.

## Development

```bash
npm install
npm run storybook       # localhost:6006
npm run test            # vitest
npm run test:coverage   # coverage report
npm run lint            # eslint + prettier
npm run type-check      # tsc --noEmit
npm run build           # library bundle (dist/)
```

## Contributing

1. Fork the repo, create a feature branch.
2. Follow the existing component patterns: one folder per component,
   `.tsx`, `.module.css`, `.test.tsx`, `.stories.tsx`, `index.ts`.
3. Ensure `npm run lint && npm run type-check && npm run test && npm run build` passes.
4. Coverage must remain at or above 80% per component.
5. Open a PR.

## License

MIT © Dixant Sharma
