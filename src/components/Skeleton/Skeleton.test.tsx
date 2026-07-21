import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders single text skeleton', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('tatva-skeleton')).toBeInTheDocument();
  });

  it('applies numeric width/height', () => {
    render(<Skeleton width={200} height={20} />);
    const el = screen.getByTestId('tatva-skeleton');
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('20px');
  });

  it('accepts string width/height', () => {
    render(<Skeleton width="50%" height="1rem" />);
    const el = screen.getByTestId('tatva-skeleton');
    expect(el.style.width).toBe('50%');
    expect(el.style.height).toBe('1rem');
  });

  it('renders multiple text lines', () => {
    render(<Skeleton variant="text" lines={3} />);
    expect(screen.getByTestId('tatva-skeleton').children.length).toBe(3);
  });

  it('applies aria-hidden', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('tatva-skeleton')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it.each(['text', 'circular', 'rectangular'] as const)(
    'applies %s variant class',
    (variant) => {
      render(<Skeleton variant={variant} />);
      expect(screen.getByTestId('tatva-skeleton').className).toMatch(
        new RegExp(variant),
      );
    },
  );

  it('applies custom className', () => {
    render(<Skeleton className="c" />);
    expect(screen.getByTestId('tatva-skeleton').className).toMatch(/c/);
  });
});
