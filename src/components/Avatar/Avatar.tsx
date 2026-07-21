import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn, vc } from '../../utils/cn';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

function initials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return `${first}${last}`.toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    src,
    alt,
    name,
    size = 'md',
    status,
    className,
    'data-testid': dataTestId = 'tatva-avatar',
  }: AvatarProps & { 'data-testid'?: string },
  ref,
) {
  const px = sizeMap[size];
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const showInitials = !showImage && name;
  return (
    <span
      ref={ref}
      className={cn(styles.avatar, className)}
      style={{ width: px, height: px, fontSize: px * 0.42 }}
      data-testid={dataTestId}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className={styles.img}
          onError={() => setImgError(true)}
        />
      ) : showInitials ? (
        <span aria-hidden="true" className={styles.initials}>
          {initials(name)}
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={styles.fallbackIcon}
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M4 21v-1a6 6 0 0116 0v1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {status && (
        <span
          className={cn(styles.status, vc(styles, 'status', status))}
          aria-label={`Status: ${status}`}
        />
      )}
    </span>
  );
});

// -------------------- Group --------------------

export interface AvatarGroupProps {
  max?: number;
  children: ReactNode;
  className?: string;
  size?: AvatarSize;
}

export function AvatarGroup({
  max = 4,
  children,
  className,
  size,
}: AvatarGroupProps) {
  const arr = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<AvatarProps>[];
  const visible = arr.slice(0, max);
  const overflow = arr.length - visible.length;
  return (
    <div className={cn(styles.group, className)}>
      {visible.map((child, i) =>
        cloneElement(child, {
          key: i,
          size: size ?? child.props.size,
          className: cn(styles.groupItem, child.props.className),
        }),
      )}
      {overflow > 0 && (
        <span
          className={cn(styles.avatar, styles.overflow, styles.groupItem)}
          style={{
            width: sizeMap[size ?? 'md'],
            height: sizeMap[size ?? 'md'],
          }}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
