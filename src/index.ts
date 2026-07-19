/**
 * Tatva UI — React + TypeScript design system.
 * Consumers should also import '@dixant/tatva-ui/style.css' once at app root.
 */

// Tokens
export * from './tokens';

// Themes
export * from './themes';

// Utils (public surface)
export { cn } from './utils/cn';
export type * from './utils/polymorphic';

// Components — Phase 2 primitives
export * from './components/Button';
export * from './components/Input';
export * from './components/Textarea';
export * from './components/Checkbox';
export * from './components/Radio';
export * from './components/Select';
export * from './components/Toggle';
export * from './components/Typography';
export * from './components/Icon';

// Components — Phase 3 layout & nav
export * from './components/Stack';
export * from './components/Card';
export * from './components/Divider';
export * from './components/Tabs';
export * from './components/Breadcrumb';
export * from './components/Pagination';
