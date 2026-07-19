import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Stack.module.css';

export type StackDirection = 'horizontal' | 'vertical';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps {
  direction?: StackDirection;
  /** Spacing token (1–12) or any CSS length. */
  gap?: string | number;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  'data-testid'?: string;
}

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    direction = 'vertical',
    gap = '4',
    align,
    justify,
    wrap = false,
    as,
    className,
    style,
    children,
    'data-testid': dataTestId = 'tatva-stack',
  },
  ref,
) {
  const Component = (as ?? 'div') as ElementType;
  const gapVal =
    typeof gap === 'number' || /^\d+$/.test(String(gap))
      ? `var(--tatva-space-${gap})`
      : gap;
  return (
    <Component
      ref={ref}
      className={cn(
        styles.stack,
        styles[`direction_${direction}`],
        align && styles[`align_${align}`],
        justify && styles[`justify_${justify}`],
        wrap && styles.wrap,
        className,
      )}
      style={{ gap: gapVal, ...style }}
      data-testid={dataTestId}
    >
      {children}
    </Component>
  );
});
