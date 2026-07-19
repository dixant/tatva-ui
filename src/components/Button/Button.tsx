import { forwardRef, type ElementType, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../utils/polymorphic';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

export type ButtonProps<C extends ElementType = 'button'> =
  PolymorphicComponentPropsWithRef<C, ButtonOwnProps>;

function Spinner({ size }: { size: ButtonSize }) {
  const px = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  return (
    <svg
      className={styles.spinner}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M22 12A10 10 0 0 0 12 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ButtonImpl<C extends ElementType = 'button'>(
  {
    as,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    children,
    onClick,
    type,
    'data-testid': dataTestId = 'tatva-button',
    ...rest
  }: ButtonProps<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = (as ?? 'button') as ElementType;
  const isNativeButton = Component === 'button';
  const isInteractionBlocked = disabled || loading;

  return (
    <Component
      ref={ref}
      className={cn(
        styles.button,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
      )}
      data-testid={dataTestId}
      data-variant={variant}
      data-size={size}
      aria-disabled={isInteractionBlocked || undefined}
      aria-busy={loading || undefined}
      disabled={isNativeButton ? disabled : undefined}
      type={isNativeButton ? (type ?? 'button') : type}
      onClick={(e: React.MouseEvent) => {
        if (isInteractionBlocked) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        (onClick as ((e: React.MouseEvent) => void) | undefined)?.(e);
      }}
      {...rest}
    >
      {loading && <Spinner size={size} />}
      {!loading && leftIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {!loading && rightIcon && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </Component>
  );
}

/**
 * Button — versatile action element. Polymorphic (renders as any element via `as`).
 * See ButtonProps for the full API.
 */
export const Button = forwardRef(ButtonImpl) as <
  C extends ElementType = 'button',
>(
  props: ButtonProps<C>,
) => React.ReactElement | null;
