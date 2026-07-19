export const shadows = {
  sm: 'var(--tatva-shadow-sm)',
  md: 'var(--tatva-shadow-md)',
  lg: 'var(--tatva-shadow-lg)',
  xl: 'var(--tatva-shadow-xl)',
} as const;

export const radii = {
  sm: 'var(--tatva-radius-sm)',
  md: 'var(--tatva-radius-md)',
  lg: 'var(--tatva-radius-lg)',
  xl: 'var(--tatva-radius-xl)',
  full: 'var(--tatva-radius-full)',
} as const;

export type ShadowToken = keyof typeof shadows;
export type RadiusToken = keyof typeof radii;
