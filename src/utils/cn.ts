/**
 * Merge className strings, filtering out falsy values.
 *
 * @example
 *   cn('a', undefined, false && 'b', 'c') // -> 'a c'
 */
export function cn(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Build a CSS Modules class name from a base and a variant token.
 *
 * `vc(styles, 'variant', 'outlined')` → `styles.variantOutlined`
 *
 * Handy for the common pattern `<div className={styles[`variant_${v}`]} />`
 * where the CSS class is written in camelCase per convention.
 */
export function vc(
  styles: Record<string, string>,
  base: string,
  value: string | undefined | null,
): string | undefined {
  if (!value) return undefined;
  const key = `${base}${value[0].toUpperCase()}${value.slice(1)}`;
  return styles[key];
}
