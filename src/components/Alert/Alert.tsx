import { forwardRef, type ReactNode } from 'react';
import { cn, vc } from '../../utils/cn';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const defaultIcon: Record<AlertVariant, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  error: '✕',
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = 'info',
    title,
    children,
    icon,
    closable = false,
    onClose,
    className,
    'data-testid': dataTestId = 'tatva-alert',
  }: AlertProps & { 'data-testid'?: string },
  ref,
) {
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  return (
    <div
      ref={ref}
      role={role}
      className={cn(styles.alert, vc(styles, 'variant', variant), className)}
      data-testid={dataTestId}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon ?? defaultIcon[variant]}
      </span>
      <div className={styles.body}>
        {title && <div className={styles.title}>{title}</div>}
        {children && <div className={styles.description}>{children}</div>}
      </div>
      {closable && (
        <button
          type="button"
          className={styles.close}
          aria-label="Close alert"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
});
