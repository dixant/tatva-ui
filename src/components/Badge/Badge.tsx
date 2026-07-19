import { forwardRef, type ReactNode } from 'react';
import { cn, vc } from '../../utils/cn';
import styles from './Badge.module.css';

export type BadgeVariant = 'solid' | 'outline' | 'subtle';
export type BadgeColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'solid',
    color = 'primary',
    size = 'md',
    removable = false,
    onRemove,
    className,
    children,
    'data-testid': dataTestId = 'tatva-badge',
  }: BadgeProps & { 'data-testid'?: string },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        styles.badge,
        vc(styles, 'variant', variant),
        vc(styles, 'color', color),
        vc(styles, 'size', size),
        className,
      )}
      data-testid={dataTestId}
    >
      {children}
      {removable && (
        <button
          type="button"
          className={styles.remove}
          aria-label={`Remove ${typeof children === 'string' ? children : 'item'}`}
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
});
