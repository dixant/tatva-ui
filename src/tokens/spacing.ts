export const spacing = {
  0: 'var(--tatva-space-0)',
  1: 'var(--tatva-space-1)',
  2: 'var(--tatva-space-2)',
  3: 'var(--tatva-space-3)',
  4: 'var(--tatva-space-4)',
  5: 'var(--tatva-space-5)',
  6: 'var(--tatva-space-6)',
  7: 'var(--tatva-space-7)',
  8: 'var(--tatva-space-8)',
  9: 'var(--tatva-space-9)',
  10: 'var(--tatva-space-10)',
  11: 'var(--tatva-space-11)',
  12: 'var(--tatva-space-12)',
} as const;

export type SpacingToken = keyof typeof spacing;
