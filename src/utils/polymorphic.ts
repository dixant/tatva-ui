import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  Ref,
} from 'react';

/** The `as` prop supplied to a polymorphic component. */
export type AsProp<C extends ElementType> = { as?: C };

/** Ref type appropriate for the underlying element `C`. */
export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];

/** Props of `C` with our own props layered on top, plus `as`. */
export type PolymorphicComponentProps<C extends ElementType, P = object> = P &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof P | 'as'>;

/** Same as PolymorphicComponentProps but with a `ref` typed to `C`. */
export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  P = object,
> = PolymorphicComponentProps<C, P> & { ref?: PolymorphicRef<C> };

/** Function-signature type for a polymorphic component. */
export type PolymorphicComponent<DefaultAs extends ElementType, P = object> = <
  C extends ElementType = DefaultAs,
>(
  props: PolymorphicComponentPropsWithRef<C, P>,
) => ReactElement | null;

/** Convenience alias for consumers that also need Ref. */
export type { Ref };
