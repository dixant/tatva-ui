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
