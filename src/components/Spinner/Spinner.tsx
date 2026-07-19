import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize | number;
  color?: string;
  label?: string;
  className?: string;
}

const sizeMap: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 32, xl: 48 };

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  {
    size = 'md',
    color,
    label = 'Loading',
    className,
    'data-testid': dataTestId = 'tatva-spinner',
  }: SpinnerProps & { 'data-testid'?: string },
  ref,
) {
  const px = typeof size === 'number' ? size : sizeMap[size];
  const stroke = color ?? 'var(--tatva-color-primary-500)';
  return (
    <span role="status" aria-label={label} className={cn(styles.wrap, className)} data-testid={dataTestId}>
      <svg
        ref={ref}
        className={styles.spinner}
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke={stroke} strokeOpacity="0.25" strokeWidth="3" />
        <path
          d="M22 12A10 10 0 0 0 12 2"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </span>
  );
});
