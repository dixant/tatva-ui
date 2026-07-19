import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cn, vc } from '../../utils/cn';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TypographyAlign = 'left' | 'center' | 'right';

const variantToElement: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

export interface TypographyProps {
  variant?: TypographyVariant;
  as?: ElementType;
  color?: string;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  truncate?: boolean;
  maxLines?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  'data-testid'?: string;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    {
      variant = 'body1',
      as,
      color,
      align,
      weight,
      truncate,
      maxLines,
      className,
      style,
      children,
      'data-testid': dataTestId = 'tatva-typography',
    },
    ref,
  ) {
    const Component = (as ?? variantToElement[variant]) as ElementType;
    const combinedStyle: CSSProperties = {
      ...(color ? { color: color.startsWith('--') ? `var(${color})` : color } : {}),
      ...(align ? { textAlign: align } : {}),
      ...(maxLines
        ? {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: maxLines,
            overflow: 'hidden',
          }
        : {}),
      ...style,
    };
    return (
      <Component
        ref={ref}
        data-testid={dataTestId}
        className={cn(
          styles.base,
          vc(styles, 'variant', variant),
          weight && vc(styles, 'weight', weight),
          truncate && styles.truncate,
          className,
        )}
        style={combinedStyle}
      >
        {children}
      </Component>
    );
  },
);
