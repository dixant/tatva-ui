import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  searchable?: boolean;
  id?: string;
  className?: string;
  'data-testid'?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
      label,
      options,
      placeholder = 'Select…',
      value,
      defaultValue,
      onChange,
      disabled,
      error,
      helperText,
      searchable = false,
      id,
      className,
      'data-testid': dataTestId = 'tatva-select',
    },
    ref,
  ) {
    const rid = useId();
    const triggerId = id ?? `${rid}-trigger`;
    const listboxId = `${rid}-listbox`;
    const [internal, setInternal] = useState<string | undefined>(defaultValue);
    const current = value !== undefined ? value : internal;
    const setCurrent = (v: string) => {
      if (value === undefined) setInternal(v);
      onChange?.(v);
    };

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);

    const filteredOptions = useMemo(() => {
      if (!searchable || !query) return options;
      const q = query.toLowerCase();
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query, searchable]);

    const groupedRender = useMemo(() => {
      const groups = new Map<string | undefined, SelectOption[]>();
      for (const opt of filteredOptions) {
        const g = opt.group;
        const arr = groups.get(g) ?? [];
        arr.push(opt);
        groups.set(g, arr);
      }
      return groups;
    }, [filteredOptions]);

    // Flat list of visible options mapped to their linear index for keyboard nav.
    const flat = useMemo(() => filteredOptions, [filteredOptions]);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    useEffect(() => {
      if (open && searchable) searchRef.current?.focus();
    }, [open, searchable]);

    useEffect(() => {
      if (open) {
        const idx = flat.findIndex((o) => o.value === current);
        setActiveIndex(idx >= 0 ? idx : 0);
      }
    }, [open, current, flat]);

    const selectedOption = options.find((o) => o.value === current);

    const commit = useCallback(
      (opt: SelectOption) => {
        if (opt.disabled) return;
        setCurrent(opt.value);
        setOpen(false);
        setQuery('');
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onChange, value],
    );

    const move = (delta: number) => {
      if (flat.length === 0) return;
      let next = activeIndex;
      for (let i = 0; i < flat.length; i++) {
        next = (next + delta + flat.length) % flat.length;
        if (!flat[next].disabled) break;
      }
      setActiveIndex(next);
    };

    const handleTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    const handleListKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        move(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const opt = flat[activeIndex];
        if (opt) commit(opt);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      } else if (!searchable && e.key.length === 1) {
        // Type-ahead
        const k = e.key.toLowerCase();
        const startIdx = flat.findIndex(
          (o, i) => i > activeIndex && o.label.toLowerCase().startsWith(k),
        );
        const idx =
          startIdx !== -1
            ? startIdx
            : flat.findIndex((o) => o.label.toLowerCase().startsWith(k));
        if (idx !== -1) setActiveIndex(idx);
      }
    };

    const rid2 = rid;

    return (
      <div className={cn(styles.wrapper, className)} ref={rootRef}>
        <label htmlFor={triggerId} className={styles.label}>
          {label}
        </label>
        <button
          ref={ref}
          id={triggerId}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          className={cn(
            styles.trigger,
            open && styles.open,
            error && styles.hasError,
          )}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={handleTriggerKey}
          data-testid={dataTestId}
        >
          <span className={cn(styles.value, !selectedOption && styles.placeholder)}>
            {selectedOption?.label ?? placeholder}
          </span>
          <span aria-hidden="true" className={styles.caret}>
            ▾
          </span>
        </button>

        {open && (
          <div className={styles.popover} onKeyDown={handleListKey}>
            {searchable && (
              <input
                ref={searchRef}
                type="search"
                className={styles.search}
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={triggerId}
              className={styles.list}
              tabIndex={-1}
            >
              {flat.length === 0 && (
                <li className={styles.empty}>No options</li>
              )}
              {Array.from(groupedRender.entries()).flatMap(
                ([groupName, opts]) => {
                  const items = opts.map((opt) => {
                    const idx = flat.indexOf(opt);
                    const isActive = idx === activeIndex;
                    const isSelected = opt.value === current;
                    return (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={opt.disabled || undefined}
                        className={cn(
                          styles.option,
                          isActive && styles.active,
                          isSelected && styles.selected,
                          opt.disabled && styles.optionDisabled,
                        )}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          commit(opt);
                        }}
                      >
                        {opt.label}
                      </li>
                    );
                  });
                  if (groupName) {
                    return [
                      <li
                        key={`__group_${groupName}`}
                        className={styles.groupHeader}
                        role="presentation"
                      >
                        {groupName}
                      </li>,
                      ...items,
                    ];
                  }
                  return items;
                },
              )}
            </ul>
          </div>
        )}
        {helperText && !error && <span className={styles.helper}>{helperText}</span>}
        {error && (
          <span className={styles.error} role="alert" id={`${rid2}-error`}>
            {error}
          </span>
        )}
      </div>
    );
  },
);
