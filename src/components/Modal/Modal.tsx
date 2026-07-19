import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import styles from './Modal.module.css';

// -------------------- Context --------------------

interface ModalContextValue {
  onClose: () => void;
  titleId: string;
  size: ModalSize;
}
const ModalContext = createContext<ModalContextValue | null>(null);
const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal.* must be used inside <Modal>');
  return ctx;
};

// -------------------- Types --------------------

export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
  className?: string;
}

// -------------------- Root --------------------

function ModalRoot({
  open,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  className,
}: ModalProps) {
  const titleId = useId();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Trap focus + auto-focus first focusable + return focus on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const content = contentRef.current;
    if (!content) return;

    const focusable = content.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    (focusable[0] ?? content).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Tab') {
        const nodes = content.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose, closeOnEscape]);

  // Scroll lock.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const handleBackdrop = () => {
    if (closeOnBackdrop) onClose();
  };

  return createPortal(
    <ModalContext.Provider value={{ onClose, titleId, size }}>
      <div
        className={styles.backdrop}
        onClick={handleBackdrop}
        data-testid="tatva-modal-backdrop"
      >
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          className={cn(styles.content, styles[`size_${size}`], className)}
          onClick={(e) => e.stopPropagation()}
          data-testid="tatva-modal"
        >
          {title && (
            <ModalHeaderInternal>
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            </ModalHeaderInternal>
          )}
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

// -------------------- Sub-components --------------------

function ModalHeaderInternal({ children }: { children: ReactNode }) {
  const { onClose } = useModalContext();
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>{children}</div>
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

function ModalHeader({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <ModalHeaderInternal>
      <div className={cn(styles.headerContent, className)} {...rest}>
        {children}
      </div>
    </ModalHeaderInternal>
  );
}

function ModalBody({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  );
}

function ModalFooter({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.footer, className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Modal — accessible dialog with backdrop, focus trap, scroll lock.
 * Compound API: `<Modal><Modal.Header/><Modal.Body/><Modal.Footer/></Modal>`.
 */
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
