import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Divider.module.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    orientation = 'horizontal',
    label,
    className,
    'data-testid': dataTestId = 'tatva-divider',
  },
  ref,
) {
  if (label && orientation === 'horizontal') {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(styles.labeled, className)}
        data-testid={dataTestId}
      >
        <span className={styles.line} />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} />
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === 'vertical' ? styles.vertical : styles.horizontal,
        className,
      )}
      data-testid={dataTestId}
    />
  );
});
