import {
  forwardRef,
  useCallback,
  useState,
  type ButtonHTMLAttributes,
} from 'react';
import { cn, vc } from '../../utils/cn';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md';

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'children'
> {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  size?: ToggleSize;
  onChange?: (checked: boolean) => void;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      label,
      checked,
      defaultChecked = false,
      size = 'md',
      disabled,
      className,
      onChange,
      'data-testid': dataTestId = 'tatva-toggle',
      ...rest
    }: ToggleProps & { 'data-testid'?: string },
    ref,
  ) {
    const [internal, setInternal] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const value = isControlled ? checked : internal;

    const toggle = useCallback(() => {
      if (disabled) return;
      const next = !value;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    }, [disabled, value, isControlled, onChange]);

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={value}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          styles.toggle,
          vc(styles, 'size', size),
          value && styles.on,
          disabled && styles.disabled,
          className,
        )}
        data-testid={dataTestId}
        {...rest}
      >
        <span className={styles.track}>
          <span className={styles.thumb} aria-hidden="true" />
        </span>
        <span className={styles.label}>{label}</span>
      </button>
    );
  },
);
