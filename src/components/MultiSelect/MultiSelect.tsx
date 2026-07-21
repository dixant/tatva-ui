import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './MultiSelect.module.css';
import { Badge } from '../Badge';
import type { SelectOption } from '../Select';

export interface MultiSelectProps {
  label: string;
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export function MultiSelect({
  label,
  options,
  value,
  defaultValue = [],
  onChange,
  max,
  placeholder = 'Select…',
  disabled,
  error,
  helperText,
  className,
  'data-testid': dataTestId = 'tatva-multiselect',
}: MultiSelectProps & { 'data-testid'?: string }) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const rid = useId();
  const inputId = `${rid}-input`;
  const listId = `${rid}-listbox`;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const emit = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const filteredOptions = useMemo(() => {
    const q = query.toLowerCase();
    return options.filter(
      (o) =>
        !current.includes(o.value) &&
        (q === '' || o.label.toLowerCase().includes(q)),
    );
  }, [options, query, current]);

  const atMax = max !== undefined && current.length >= max;

  useEffect(() => setActiveIndex(0), [query, filteredOptions.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selectValue = (v: string) => {
    if (atMax) return;
    emit([...current, v]);
    setQuery('');
  };

  const removeValue = (v: string) => {
    emit(current.filter((x) => x !== v));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(filteredOptions.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filteredOptions[activeIndex];
      if (opt && !opt.disabled) selectValue(opt.value);
    } else if (e.key === 'Backspace' && query === '' && current.length > 0) {
      removeValue(current[current.length - 1]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const labelFor = (v: string) =>
    options.find((o) => o.value === v)?.label ?? v;

  return (
    <div
      className={cn(styles.wrapper, className)}
      ref={rootRef}
      data-testid={dataTestId}
    >
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div
        className={cn(
          styles.control,
          open && styles.controlOpen,
          error && styles.hasError,
          disabled && styles.disabled,
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {current.map((v) => (
          <Badge
            key={v}
            variant="subtle"
            color="primary"
            size="sm"
            removable
            onRemove={() => removeValue(v)}
          >
            {labelFor(v)}
          </Badge>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          className={styles.input}
          placeholder={current.length === 0 ? placeholder : ''}
          value={query}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>
      {open && !disabled && (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          className={styles.popover}
        >
          {atMax && (
            <li className={styles.empty}>Maximum {max} selections reached</li>
          )}
          {!atMax && filteredOptions.length === 0 && (
            <li className={styles.empty}>No options</li>
          )}
          {!atMax &&
            filteredOptions.map((opt, i) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={false}
                aria-disabled={opt.disabled || undefined}
                className={cn(
                  styles.option,
                  activeIndex === i && styles.active,
                  opt.disabled && styles.optionDisabled,
                )}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (!opt.disabled) selectValue(opt.value);
                }}
              >
                {opt.label}
              </li>
            ))}
        </ul>
      )}
      {helperText && !error && (
        <span className={styles.helper}>{helperText}</span>
      )}
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
