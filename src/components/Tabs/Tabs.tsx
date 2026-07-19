import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Tabs.module.css';

// -------------------- Context --------------------

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  orientation: 'horizontal' | 'vertical';
  register: (value: string, disabled: boolean, el: HTMLButtonElement | null) => void;
  baseId: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);
const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* must be used within <Tabs>');
  return ctx;
};

// -------------------- Root --------------------

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: ReactNode;
}

function TabsRoot({
  defaultValue = '',
  value,
  onChange,
  orientation = 'horizontal',
  className,
  children,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const baseId = useId();
  const current = value !== undefined ? value : internal;

  const setValue = useCallback(
    (v: string) => {
      if (value === undefined) setInternal(v);
      onChange?.(v);
    },
    [value, onChange],
  );

  // Track registered tab elements for arrow-key navigation.
  const tabs = useRef<Map<string, { disabled: boolean; el: HTMLButtonElement }>>(
    new Map(),
  );
  const register = useCallback(
    (v: string, disabled: boolean, el: HTMLButtonElement | null) => {
      if (el) tabs.current.set(v, { disabled, el });
      else tabs.current.delete(v);
    },
    [],
  );

  return (
    <TabsContext.Provider
      value={{ value: current, setValue, orientation, register, baseId }}
    >
      <div
        className={cn(
          styles.root,
          orientation === 'vertical' ? styles.rootVertical : styles.rootHorizontal,
          className,
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// -------------------- List --------------------

export interface TabsListProps {
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}
function List({ className, children, 'aria-label': ariaLabel }: TabsListProps) {
  const { orientation, baseId } = useTabsContext();
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      aria-label={ariaLabel}
      id={`${baseId}-list`}
      className={cn(styles.list, className)}
    >
      {children}
    </div>
  );
}

// -------------------- Tab --------------------

export interface TabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}
function Tab({ value, disabled = false, className, children }: TabProps) {
  const { value: selected, setValue, register, baseId, orientation } =
    useTabsContext();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const isSelected = selected === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  useEffect(() => {
    register(value, disabled, btnRef.current);
    return () => register(value, disabled, null);
  }, [value, disabled, register]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const nextKeys =
      orientation === 'horizontal' ? ['ArrowRight'] : ['ArrowDown'];
    const prevKeys = orientation === 'horizontal' ? ['ArrowLeft'] : ['ArrowUp'];
    const parent = btnRef.current?.parentElement;
    if (!parent) return;
    const buttons = Array.from(
      parent.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([aria-disabled="true"])'),
    );
    const idx = buttons.indexOf(btnRef.current!);
    if (idx === -1) return;
    if (nextKeys.includes(e.key)) {
      e.preventDefault();
      const next = buttons[(idx + 1) % buttons.length];
      next.focus();
      setValue(next.getAttribute('data-value') ?? value);
    } else if (prevKeys.includes(e.key)) {
      e.preventDefault();
      const prev = buttons[(idx - 1 + buttons.length) % buttons.length];
      prev.focus();
      setValue(prev.getAttribute('data-value') ?? value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttons[0]?.focus();
      setValue(buttons[0]?.getAttribute('data-value') ?? value);
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = buttons[buttons.length - 1];
      last?.focus();
      setValue(last?.getAttribute('data-value') ?? value);
    }
  };

  return (
    <button
      ref={btnRef}
      type="button"
      role="tab"
      id={tabId}
      data-value={value}
      aria-selected={isSelected}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={cn(styles.tab, isSelected && styles.tabActive, className)}
      onClick={() => !disabled && setValue(value)}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}

// -------------------- Panel --------------------

export interface TabsPanelProps {
  value: string;
  className?: string;
  children: ReactNode;
}
function Panel({ value, className, children }: TabsPanelProps) {
  const { value: selected, baseId } = useTabsContext();
  if (selected !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn(styles.panel, className)}
    >
      {children}
    </div>
  );
}

/**
 * Compound Tabs component: `<Tabs><Tabs.List><Tabs.Tab/></Tabs.List><Tabs.Panel/></Tabs>`
 */
export const Tabs = Object.assign(TabsRoot, { List, Tab, Panel });
