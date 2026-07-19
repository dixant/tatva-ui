import { forwardRef, useEffect, useRef, useState } from 'react';
import { Input, type InputProps } from '../Input';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';

export interface SearchInputProps extends Omit<InputProps, 'onChange' | 'type' | 'label'> {
  label?: string;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  loading?: boolean;
  onClear?: () => void;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      label = 'Search',
      onSearch,
      debounceMs = 300,
      loading = false,
      onClear,
      value,
      defaultValue = '',
      onChange,
      placeholder = 'Search…',
      ...rest
    },
    ref,
  ) {
    const [inner, setInner] = useState<string>(String(value ?? defaultValue));
    const isControlled = value !== undefined;
    const current = isControlled ? String(value) : inner;
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );

    const setValue = (v: string) => {
      if (!isControlled) setInner(v);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
      if (!onSearch) return;
      if (timer.current) clearTimeout(timer.current);
      const v = e.target.value;
      timer.current = setTimeout(() => onSearch(v), debounceMs);
    };

    const handleClear = () => {
      setValue('');
      if (timer.current) clearTimeout(timer.current);
      onSearch?.('');
      onClear?.();
    };

    const hasValue = current.length > 0;

    return (
      <Input
        ref={ref}
        type="search"
        label={label}
        placeholder={placeholder}
        // Always controlled internally so clearing via the button
        // synchronously resets the input value.
        value={current}
        onChange={handleChange}
        leftAddon={<Icon name="search" size="sm" aria-hidden="true" />}
        rightAddon={
          loading ? (
            <Spinner size={16} label="Searching" />
          ) : hasValue ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={handleClear}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--tatva-color-fg-muted)',
                padding: 4,
                borderRadius: 4,
                display: 'inline-flex',
              }}
            >
              <Icon name="close" size="sm" />
            </button>
          ) : undefined
        }
        {...rest}
      />
    );
  },
);
