import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Card.module.css';

export type CardVariant = 'elevated' | 'outlined' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardOwnProps {
  variant?: CardVariant;
  padding?: CardPadding;
  as?: ElementType;
  children?: ReactNode;
  className?: string;
}

type CardProps = CardOwnProps & Omit<HTMLAttributes<HTMLElement>, keyof CardOwnProps>;

const CardRoot = forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = 'elevated',
    padding = 'md',
    as,
    className,
    children,
    'data-testid': dataTestId = 'tatva-card',
    ...rest
  }: CardProps & { 'data-testid'?: string },
  ref,
) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      ref={ref}
      className={cn(
        styles.card,
        styles[`variant_${variant}`],
        styles[`padding_${padding}`],
        className,
      )}
      data-testid={dataTestId}
      {...rest}
    >
      {children}
    </Component>
  );
});

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}
function CardHeader({ className, divider, children, ...rest }: CardHeaderProps) {
  return (
    <div className={cn(styles.header, divider && styles.headerDivider, className)} {...rest}>
      {children}
    </div>
  );
}

function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}
function CardFooter({ className, divider, children, ...rest }: CardFooterProps) {
  return (
    <div className={cn(styles.footer, divider && styles.footerDivider, className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Compound Card component.
 * Usage: `<Card><Card.Header/><Card.Body/><Card.Footer/></Card>`
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export type { CardProps };
