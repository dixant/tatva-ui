import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItemProps {
  href?: string;
  active?: boolean;
  className?: string;
  children: ReactNode;
}

function Item({ href, active, className, children }: BreadcrumbItemProps) {
  if (active) {
    return (
      <span
        aria-current="page"
        className={cn(styles.item, styles.active, className)}
      >
        {children}
      </span>
    );
  }
  return (
    <a href={href ?? '#'} className={cn(styles.item, styles.link, className)}>
      {children}
    </a>
  );
}

export interface BreadcrumbProps {
  separator?: ReactNode;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

function BreadcrumbRoot({
  separator = '/',
  className,
  children,
  'aria-label': ariaLabel = 'Breadcrumb',
}: BreadcrumbProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const lastIdx = items.length - 1;
  return (
    <nav aria-label={ariaLabel} className={cn(styles.nav, className)}>
      <ol className={styles.list}>
        {items.map((child, i) => {
          const isLast = i === lastIdx;
          const el = child as ReactElement<BreadcrumbItemProps>;
          const withActive =
            el.props.active === undefined
              ? cloneElement(el, {
                  active: isLast,
                } as Partial<BreadcrumbItemProps>)
              : el;
          return (
            <li key={i} className={styles.li}>
              {withActive}
              {!isLast && (
                <span aria-hidden="true" className={styles.separator}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Compound Breadcrumb: `<Breadcrumb><Breadcrumb.Item/></Breadcrumb>` */
export const Breadcrumb = Object.assign(BreadcrumbRoot, { Item });
