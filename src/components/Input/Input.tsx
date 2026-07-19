import { forwardRef, useId, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Input.module.css';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  type?: InputType;
  label: string;
  helperText?: string;
  error?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    label,
    helperText,
    error,
    leftAddon,
    rightAddon,
    id,
    className,
    wrapperClassName,
    disabled,
    required,
    'data-testid': dataTestId = 'tatva-input',
    ...rest
  }: InputProps & { 'data-testid'?: string },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const describedBy =
    [error ? errorId : undefined, helperText && !error ? helperId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className={cn(styles.wrapper, wrapperClassName)}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' *'}
          </span>
        )}
      </label>
      <div
        className={cn(
          styles.inputWrapper,
          error && styles.hasError,
          disabled && styles.disabled,
        )}
      >
        {leftAddon && <span className={styles.addon}>{leftAddon}</span>}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(styles.input, className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          required={required}
          data-testid={dataTestId}
          {...rest}
        />
        {rightAddon && <span className={styles.addon}>{rightAddon}</span>}
      </div>
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
});
