import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './FormField.module.css';

export interface FormFieldProps {
  label?: string;
  /** Explicit id to link label/child. Auto-generated otherwise. */
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactElement;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  helperText,
  error,
  children,
  className,
  'data-testid': dataTestId = 'tatva-formfield',
}: FormFieldProps & { 'data-testid'?: string }) {
  const rid = useId();
  const only = Children.only(children);
  if (!isValidElement(only)) return only;
  const childId = (only.props as { id?: string }).id;
  const inputId = htmlFor ?? childId ?? rid;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [error ? errorId : undefined, helperText && !error ? helperId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  const merged = cloneElement(only, {
    id: inputId,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    required,
  } as never);

  return (
    <div className={cn(styles.wrapper, className)} data-testid={dataTestId}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {' *'}
            </span>
          )}
        </label>
      )}
      {merged}
      {helperText && !error && (
        <span id={helperId} className={styles.helper}>
          {helperText}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// Re-export ReactNode for consumers.
export type { ReactNode };
