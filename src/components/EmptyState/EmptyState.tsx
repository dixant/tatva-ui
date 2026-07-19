import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      icon,
      title,
      description,
      action,
      className,
      'data-testid': dataTestId = 'tatva-emptystate',
    }: EmptyStateProps & { 'data-testid'?: string },
    ref,
  ) {
    return (
      <div ref={ref} className={cn(styles.empty, className)} data-testid={dataTestId}>
        {icon && (
          <div className={styles.icon} aria-hidden="true">
            {icon}
          </div>
        )}
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    );
  },
);
