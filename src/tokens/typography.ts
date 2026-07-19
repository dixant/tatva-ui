export const typography = {
  fontFamily: {
    sans: 'var(--tatva-font-family)',
    mono: 'var(--tatva-font-family-mono)',
  },
  fontSize: {
    xs: 'var(--tatva-font-size-xs)',
    sm: 'var(--tatva-font-size-sm)',
    md: 'var(--tatva-font-size-md)',
    lg: 'var(--tatva-font-size-lg)',
    xl: 'var(--tatva-font-size-xl)',
    '2xl': 'var(--tatva-font-size-2xl)',
    '3xl': 'var(--tatva-font-size-3xl)',
    '4xl': 'var(--tatva-font-size-4xl)',
  },
  fontWeight: {
    normal: 'var(--tatva-font-weight-normal)',
    medium: 'var(--tatva-font-weight-medium)',
    semibold: 'var(--tatva-font-weight-semibold)',
    bold: 'var(--tatva-font-weight-bold)',
  },
  lineHeight: {
    tight: 'var(--tatva-line-height-tight)',
    normal: 'var(--tatva-line-height-normal)',
    relaxed: 'var(--tatva-line-height-relaxed)',
  },
} as const;

export type TypographyToken = typeof typography;
