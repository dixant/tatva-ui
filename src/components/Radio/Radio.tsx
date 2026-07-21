import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn, vc } from '../../utils/cn';
import styles from './Radio.module.css';

// -------------------- Context --------------------

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange: (v: string) => void;
  orientation: 'horizontal' | 'vertical';
  registerRef: (value: string, node: HTMLInputElement | null) => void;
  focusNext: (currentValue: string, direction: 1 | -1) => void;
}
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// -------------------- RadioButton --------------------

export interface RadioButtonProps {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  function RadioButton(
    {
      value,
      label,
      disabled,
      className,
      'data-testid': dataTestId = 'tatva-radio',
    },
    ref,
  ) {
    const group = useContext(RadioGroupContext);
    if (!group) throw new Error('RadioButton must be used within a RadioGroup');

    const id = useId();
    const checked = group.value === value;
    const nodeRef = useRef<HTMLInputElement | null>(null);

    return (
      <label
        htmlFor={id}
        className={cn(styles.wrapper, disabled && styles.disabled, className)}
      >
        <input
          ref={(node) => {
            nodeRef.current = node;
            group.registerRef(value, node);
            if (typeof ref === 'function') ref(node);
            else if (ref)
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
          }}
          id={id}
          type="radio"
          role="radio"
          name={group.name}
          value={value}
          checked={checked}
          disabled={disabled}
          className={styles.input}
          aria-checked={checked}
          tabIndex={
            disabled
              ? -1
              : checked || (group.value === undefined && !disabled)
                ? 0
                : -1
          }
          data-testid={dataTestId}
          onChange={() => group.onChange(value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
              e.preventDefault();
              group.focusNext(value, 1);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              e.preventDefault();
              group.focusNext(value, -1);
            }
          }}
        />
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </label>
    );
  },
);

// -------------------- RadioGroup --------------------

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
  className?: string;
  label?: string;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  orientation = 'vertical',
  children,
  className,
  label,
}: RadioGroupProps) {
  const [internal, setInternal] = useControlled(value, defaultValue);
  const refs = useRef<Map<string, HTMLInputElement>>(new Map());

  const registerRef = (v: string, node: HTMLInputElement | null) => {
    if (node) refs.current.set(v, node);
    else refs.current.delete(v);
  };

  const focusNext = (currentValue: string, direction: 1 | -1) => {
    const entries = Array.from(refs.current.entries()).filter(
      ([, el]) => !el.disabled,
    );
    if (entries.length === 0) return;
    const idx = entries.findIndex(([v]) => v === currentValue);
    if (idx === -1) return;
    const nextIdx = (idx + direction + entries.length) % entries.length;
    const [nextValue, nextEl] = entries[nextIdx];
    nextEl.focus();
    setInternal(nextValue);
    onChange?.(nextValue);
  };

  const handleChange = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        styles.group,
        vc(styles, 'orientation', orientation),
        className,
      )}
    >
      <RadioGroupContext.Provider
        value={{
          name,
          value: internal,
          onChange: handleChange,
          orientation,
          registerRef,
          focusNext,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

// Tiny controlled/uncontrolled helper.
import { useState, useCallback } from 'react';
function useControlled<T>(
  controlled: T | undefined,
  defaultValue: T | undefined,
): [T | undefined, (v: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T | undefined>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;
  const setValue = useCallback(
    (v: T) => {
      if (!isControlled) setUncontrolled(v);
    },
    [isControlled],
  );
  return [value, setValue];
}
