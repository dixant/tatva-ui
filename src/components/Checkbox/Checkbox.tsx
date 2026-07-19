import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn, vc } from '../../utils/cn';
import styles from './Checkbox.module.css';

// -------------------- CheckboxGroupContext --------------------

interface CheckboxGroupContextValue {
  value: string[];
  onToggle: (v: string) => void;
  disabled?: boolean;
}
const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null,
);

// -------------------- Checkbox --------------------

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'size'
  > {
  label: string;
  /** Value used when part of a CheckboxGroup. */
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      value,
      checked,
      defaultChecked,
      indeterminate = false,
      disabled,
      id,
      className,
      onChange,
      'data-testid': dataTestId = 'tatva-checkbox',
      ...rest
    }: CheckboxProps & { 'data-testid'?: string },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const group = useContext(CheckboxGroupContext);
    const innerRef = useRef<HTMLInputElement | null>(null);

    const inGroup = group !== null && value !== undefined;
    const effectiveChecked = inGroup ? group.value.includes(value) : checked;
    const effectiveDisabled = disabled ?? group?.disabled;

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        htmlFor={inputId}
        className={cn(
          styles.wrapper,
          effectiveDisabled && styles.disabled,
          className,
        )}
      >
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref)
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
          }}
          id={inputId}
          type="checkbox"
          className={styles.input}
          checked={effectiveChecked}
          defaultChecked={inGroup ? undefined : defaultChecked}
          disabled={effectiveDisabled}
          aria-checked={indeterminate ? 'mixed' : effectiveChecked}
          data-testid={dataTestId}
          onChange={(e) => {
            if (inGroup && value !== undefined) group.onToggle(value);
            onChange?.(e.target.checked, e);
          }}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true">
          {indeterminate ? (
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path
                d="M3 8l3 3 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </span>
        <span className={styles.label}>{label}</span>
      </label>
    );
  },
);

// -------------------- CheckboxGroup --------------------

export interface CheckboxGroupProps {
  value: string[];
  onChange: (value: string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  label?: string;
}

export function CheckboxGroup({
  value,
  onChange,
  orientation = 'vertical',
  disabled,
  children,
  className,
  label,
}: CheckboxGroupProps) {
  const onToggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(styles.group, vc(styles, 'orientation', orientation), className)}
    >
      <CheckboxGroupContext.Provider value={{ value, onToggle, disabled }}>
        {children}
      </CheckboxGroupContext.Provider>
    </div>
  );
}
