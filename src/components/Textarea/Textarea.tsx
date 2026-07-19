import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  label: string;
  rows?: number;
  helperText?: string;
  error?: string;
  showCount?: boolean;
  autoResize?: boolean;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      rows = 3,
      helperText,
      error,
      maxLength,
      showCount = false,
      autoResize = false,
      value,
      defaultValue,
      id,
      className,
      wrapperClassName,
      disabled,
      required,
      onChange,
      'data-testid': dataTestId = 'tatva-textarea',
      ...rest
    }: TextareaProps & { 'data-testid'?: string },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const [inner, setInner] = useState<string>(
      String(value ?? defaultValue ?? ''),
    );
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const currentLen = value !== undefined ? String(value).length : inner.length;

    useEffect(() => {
      if (value !== undefined) setInner(String(value));
    }, [value]);

    useLayoutEffect(() => {
      if (!autoResize) return;
      const el = internalRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize, inner, value]);

    const describedBy =
      [error ? errorId : undefined, helperText && !error ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <div className={cn(styles.wrapper, wrapperClassName)}>
        <label htmlFor={textareaId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {' *'}
            </span>
          )}
        </label>
        <textarea
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          }}
          id={textareaId}
          rows={rows}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          className={cn(styles.textarea, error && styles.hasError, className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => {
            setInner(e.target.value);
            onChange?.(e);
          }}
          data-testid={dataTestId}
          {...rest}
        />
        <div className={styles.footer}>
          <div>
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
          {showCount && maxLength && (
            <span className={styles.count}>
              {currentLen}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);
