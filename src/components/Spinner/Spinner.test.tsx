import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with role=status', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies default aria-label "Loading"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('sets custom aria-label', () => {
    render(<Spinner label="Please wait" />);
    expect(
      screen.getByRole('status', { name: 'Please wait' }),
    ).toBeInTheDocument();
  });

  it.each([
    ['sm', '16'],
    ['md', '24'],
    ['lg', '32'],
    ['xl', '48'],
  ] as const)('renders size %s -> %spx', (size, px) => {
    const { container } = render(<Spinner size={size} />);
    expect(container.querySelector('svg')?.getAttribute('width')).toBe(px);
  });

  it('accepts numeric size', () => {
    const { container } = render(<Spinner size={64} />);
    expect(container.querySelector('svg')?.getAttribute('width')).toBe('64');
  });

  it('applies custom color', () => {
    const { container } = render(<Spinner color="red" />);
    expect(container.querySelector('circle')?.getAttribute('stroke')).toBe(
      'red',
    );
  });
});
