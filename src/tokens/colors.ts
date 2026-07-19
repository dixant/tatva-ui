/**
 * TypeScript constants mirroring CSS custom properties for programmatic access.
 * These are the CSS variable names, not raw color values — use them as
 * `var(--tatva-color-primary-500)` in inline styles.
 */
export const colors = {
  primary: {
    50: 'var(--tatva-color-primary-50)',
    100: 'var(--tatva-color-primary-100)',
    200: 'var(--tatva-color-primary-200)',
    300: 'var(--tatva-color-primary-300)',
    400: 'var(--tatva-color-primary-400)',
    500: 'var(--tatva-color-primary-500)',
    600: 'var(--tatva-color-primary-600)',
    700: 'var(--tatva-color-primary-700)',
    800: 'var(--tatva-color-primary-800)',
    900: 'var(--tatva-color-primary-900)',
  },
  neutral: {
    0: 'var(--tatva-color-neutral-0)',
    50: 'var(--tatva-color-neutral-50)',
    100: 'var(--tatva-color-neutral-100)',
    200: 'var(--tatva-color-neutral-200)',
    300: 'var(--tatva-color-neutral-300)',
    400: 'var(--tatva-color-neutral-400)',
    500: 'var(--tatva-color-neutral-500)',
    600: 'var(--tatva-color-neutral-600)',
    700: 'var(--tatva-color-neutral-700)',
    800: 'var(--tatva-color-neutral-800)',
    900: 'var(--tatva-color-neutral-900)',
  },
  semantic: {
    success: 'var(--tatva-color-success)',
    error: 'var(--tatva-color-error)',
    warning: 'var(--tatva-color-warning)',
    info: 'var(--tatva-color-info)',
  },
} as const;

export type ColorToken = typeof colors;
