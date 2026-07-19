import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import styles from './Tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  children: ReactElement;
  className?: string;
}

export function Tooltip({
  content,
  position = 'top',
  delay = 200,
  children,
  className,
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; pos: TooltipPosition }>({
    top: 0,
    left: 0,
    pos: position,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);

  const clear = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const show = useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpen(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clear();
    setOpen(false);
  }, []);

  useEffect(() => () => clear(), []);

  const compute = useCallback(() => {
    const trigger = triggerRef.current;
    const tip = tipRef.current;
    if (!trigger || !tip) return;
    const rect = trigger.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const gap = 8;
    let pos: TooltipPosition = position;
    let top = 0;
    let left = 0;
    const place = (p: TooltipPosition) => {
      switch (p) {
        case 'top':
          return {
            top: rect.top - tipRect.height - gap,
            left: rect.left + rect.width / 2 - tipRect.width / 2,
          };
        case 'bottom':
          return {
            top: rect.bottom + gap,
            left: rect.left + rect.width / 2 - tipRect.width / 2,
          };
        case 'left':
          return {
            top: rect.top + rect.height / 2 - tipRect.height / 2,
            left: rect.left - tipRect.width - gap,
          };
        case 'right':
          return {
            top: rect.top + rect.height / 2 - tipRect.height / 2,
            left: rect.right + gap,
          };
      }
    };
    let p = place(pos);
    // Flip if off-screen.
    if (pos === 'top' && p.top < 4) pos = 'bottom';
    else if (pos === 'bottom' && p.top + tipRect.height > window.innerHeight - 4)
      pos = 'top';
    else if (pos === 'left' && p.left < 4) pos = 'right';
    else if (pos === 'right' && p.left + tipRect.width > window.innerWidth - 4)
      pos = 'left';
    p = place(pos);
    top = p.top + window.scrollY;
    left = p.left + window.scrollX;
    setCoords({ top, left, pos });
  }, [position]);

  useLayoutEffect(() => {
    if (open) compute();
  }, [open, content, compute]);

  const child = Children.only(children);
  if (!isValidElement(child)) return children;

  const merged = cloneElement(child as ReactElement<Record<string, unknown>>, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const originalRef = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof originalRef === 'function') originalRef(node);
      else if (originalRef && 'current' in originalRef)
        (originalRef as { current: HTMLElement | null }).current = node;
    },
    'aria-describedby': open ? id : (child.props as { 'aria-describedby'?: string })['aria-describedby'],
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (child.props as { onMouseEnter?: (e: React.MouseEvent) => void }).onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (child.props as { onMouseLeave?: (e: React.MouseEvent) => void }).onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (child.props as { onFocus?: (e: React.FocusEvent) => void }).onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (child.props as { onBlur?: (e: React.FocusEvent) => void }).onBlur?.(e);
    },
  } as never);

  return (
    <>
      {merged}
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={tipRef}
            id={id}
            role="tooltip"
            className={cn(styles.tip, styles[`pos_${coords.pos}`], className)}
            style={{ top: coords.top, left: coords.left, position: 'absolute' }}
            data-testid="tatva-tooltip"
          >
            {content}
            <span className={styles.arrow} aria-hidden="true" />
          </div>,
          document.body,
        )}
    </>
  );
}
