import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss after ms. 0 = never. Default 5000. */
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastEntry extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
}
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error(
      'useToast must be used inside <ToastProvider>. Wrap your app in <ToastProvider>.',
    );
  return ctx;
}

export interface ToastProviderProps {
  children: ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const iconFor: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

export function ToastProvider({
  children,
  position = 'top-right',
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastEntry[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const startTimer = useCallback(
    (id: string, duration: number) => {
      if (duration === 0) return;
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  const clearTimer = (id: string) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  };

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const entry: ToastEntry = {
        id,
        variant: 'info',
        duration: 5000,
        ...opts,
      };
      setItems((prev) => [...prev, entry]);
      startTimer(id, entry.duration ?? 5000);
      return id;
    },
    [startTimer],
  );

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    },
    [],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={cn(styles.container, styles[`position_${position}`])}
            aria-live="polite"
            role="status"
          >
            {items.map((t) => {
              const variant = t.variant ?? 'info';
              return (
                <div
                  key={t.id}
                  className={cn(styles.toast, styles[`variant_${variant}`])}
                  role={variant === 'error' ? 'alert' : 'status'}
                  onMouseEnter={() => clearTimer(t.id)}
                  onMouseLeave={() => startTimer(t.id, t.duration ?? 5000)}
                  data-testid="tatva-toast"
                >
                  <span className={styles.icon} aria-hidden="true">
                    {iconFor[variant]}
                  </span>
                  <div className={styles.body}>
                    <div className={styles.title}>{t.title}</div>
                    {t.description && (
                      <div className={styles.description}>{t.description}</div>
                    )}
                  </div>
                  {t.action && (
                    <button
                      type="button"
                      className={styles.action}
                      onClick={() => {
                        t.action?.onClick();
                        dismiss(t.id);
                      }}
                    >
                      {t.action.label}
                    </button>
                  )}
                  <button
                    type="button"
                    className={styles.close}
                    aria-label="Close notification"
                    onClick={() => dismiss(t.id)}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
