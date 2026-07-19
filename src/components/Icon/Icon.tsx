import { forwardRef, type SVGProps } from 'react';
import { cn } from '../../utils/cn';
import styles from './Icon.module.css';
import { icons, type IconName } from './icons';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  /** Accessible label. If omitted, the icon is aria-hidden (decorative). */
  label?: string;
  className?: string;
}

const sizeMap: Record<IconSize, number> = { sm: 16, md: 20, lg: 24, xl: 32 };

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    name,
    size = 'md',
    color = 'currentColor',
    label,
    className,
    'data-testid': dataTestId = 'tatva-icon',
    ...rest
  }: IconProps & { 'data-testid'?: string },
  ref,
) {
  const px = typeof size === 'number' ? size : sizeMap[size];
  const IconComponent = icons[name];
  return (
    <svg
      ref={ref}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(styles.icon, className)}
      data-testid={dataTestId}
      {...rest}
    >
      <IconComponent />
    </svg>
  );
});
