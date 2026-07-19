import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with role=status', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('sets aria-label', () => {
    render(<Spinner label="Please wait" />);
    expect(screen.getByRole('status', { name: 'Please wait' })).toBeInTheDocument();
  });

  it('applies numeric size', () => {
    const { container } = render(<Spinner size={64} />);
    expect(container.querySelector('svg')?.getAttribute('width')).toBe('64');
  });
});
