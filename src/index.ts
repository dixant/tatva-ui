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

// Components — Phase 4 feedback & overlay
export * from './components/Modal';
export * from './components/Toast';
export * from './components/Tooltip';
export * from './components/Alert';
export * from './components/Spinner';
export * from './components/Skeleton';

// Components — Phase 5 data display
export * from './components/DataTable';
export * from './components/Badge';
export * from './components/Avatar';
export * from './components/Accordion';
export * from './components/EmptyState';

// Components — Phase 6 form patterns
export * from './components/FormField';
export * from './components/SearchInput';
export * from './components/MultiSelect';

// Blocks — prebuilt page compositions
export * from './blocks';
