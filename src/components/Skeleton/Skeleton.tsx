import { forwardRef, type CSSProperties } from 'react';
import { cn } from '../../utils/cn';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  style?: CSSProperties;
}

function normalize(v: string | number | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === 'number' ? `${v}px` : v;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      variant = 'text',
      width,
      height,
      lines = 1,
      className,
      style,
      'data-testid': dataTestId = 'tatva-skeleton',
    }: SkeletonProps & { 'data-testid'?: string },
    ref,
  ) {
    const commonStyle: CSSProperties = {
      width: normalize(width),
      height: normalize(height),
      ...style,
    };
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} aria-hidden="true" data-testid={dataTestId}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(styles.base, styles.text, className)}
              style={{
                ...commonStyle,
                width: i === lines - 1 ? '80%' : (commonStyle.width ?? '100%'),
                marginTop: i === 0 ? 0 : 8,
              }}
            />
          ))}
        </div>
      );
    }
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          styles.base,
          variant === 'text' && styles.text,
          variant === 'circular' && styles.circular,
          variant === 'rectangular' && styles.rectangular,
          className,
        )}
        style={commonStyle}
        data-testid={dataTestId}
      />
    );
  },
);
