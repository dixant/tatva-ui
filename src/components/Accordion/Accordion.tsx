import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Accordion.module.css';

// -------------------- Root context --------------------

type AccordionValue = string | string[];

interface AccordionContextValue {
  type: 'single' | 'multiple';
  value: string[];
  toggle: (v: string) => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
const useAcc = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.* must be inside <Accordion>');
  return ctx;
};

// -------------------- Item context --------------------

interface ItemContextValue {
  value: string;
  open: boolean;
  toggle: () => void;
  triggerId: string;
  contentId: string;
}
const ItemContext = createContext<ItemContextValue | null>(null);
const useItem = () => {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error('Accordion.Trigger/Content must be inside Accordion.Item');
  return ctx;
};

// -------------------- Root --------------------

export interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: AccordionValue;
  value?: AccordionValue;
  onChange?: (v: AccordionValue) => void;
  className?: string;
  children: ReactNode;
}

function AccordionRoot({
  type = 'single',
  defaultValue,
  value,
  onChange,
  className,
  children,
}: AccordionProps) {
  const [internal, setInternal] = useState<string[]>(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });
  const isControlled = value !== undefined;
  const current = useMemo(
    () =>
      isControlled
        ? Array.isArray(value)
          ? value
          : value !== undefined
            ? [value]
            : []
        : internal,
    [isControlled, value, internal],
  );

  const emit = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternal(next);
      if (onChange) onChange(type === 'single' ? (next[0] ?? '') : next);
    },
    [isControlled, onChange, type],
  );

  const toggle = useCallback(
    (v: string) => {
      if (type === 'single') {
        emit(current.includes(v) ? [] : [v]);
      } else {
        emit(current.includes(v) ? current.filter((x) => x !== v) : [...current, v]);
      }
    },
    [type, current, emit],
  );

  return (
    <AccordionContext.Provider value={{ type, value: current, toggle }}>
      <div className={cn(styles.root, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

// -------------------- Item --------------------

export interface AccordionItemProps {
  value: string;
  className?: string;
  children: ReactNode;
}
function Item({ value, className, children }: AccordionItemProps) {
  const { value: current, toggle } = useAcc();
  const rid = useId();
  const open = current.includes(value);
  return (
    <ItemContext.Provider
      value={{
        value,
        open,
        toggle: () => toggle(value),
        triggerId: `${rid}-trigger`,
        contentId: `${rid}-content`,
      }}
    >
      <div className={cn(styles.item, open && styles.open, className)}>{children}</div>
    </ItemContext.Provider>
  );
}

// -------------------- Trigger --------------------

function Trigger({ children, className }: { children: ReactNode; className?: string }) {
  const { open, toggle, triggerId, contentId } = useItem();
  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={toggle}
      className={cn(styles.trigger, className)}
    >
      <span>{children}</span>
      <span className={cn(styles.chevron, open && styles.chevronOpen)} aria-hidden="true">
        ▾
      </span>
    </button>
  );
}

// -------------------- Content --------------------

function Content({ children, className }: { children: ReactNode; className?: string }) {
  const { open, contentId, triggerId } = useItem();
  return (
    <div
      role="region"
      id={contentId}
      aria-labelledby={triggerId}
      hidden={!open}
      className={cn(styles.content, className)}
    >
      <div className={styles.contentInner}>{children}</div>
    </div>
  );
}

export const Accordion = Object.assign(AccordionRoot, { Item, Trigger, Content });
