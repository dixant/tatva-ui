import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders single text skeleton', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('tatva-skeleton')).toBeInTheDocument();
  });

  it('applies width/height', () => {
    render(<Skeleton width={200} height={20} />);
    const el = screen.getByTestId('tatva-skeleton');
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('20px');
  });

  it('renders multiple lines', () => {
    render(<Skeleton variant="text" lines={3} />);
    const wrapper = screen.getByTestId('tatva-skeleton');
    expect(wrapper.children.length).toBe(3);
  });

  it('applies aria-hidden', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('tatva-skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies circular class', () => {
    render(<Skeleton variant="circular" />);
    expect(screen.getByTestId('tatva-skeleton').className).toMatch(/circular/);
  });
});
