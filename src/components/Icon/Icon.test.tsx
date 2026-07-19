import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders SVG', () => {
    const { container } = render(<Icon name="close" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', () => {
    const { container } = render(<Icon name="close" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes label when provided', () => {
    render(<Icon name="close" label="Close menu" />);
    const el = screen.getByRole('img', { name: 'Close menu' });
    expect(el).toBeInTheDocument();
    expect(el).not.toHaveAttribute('aria-hidden');
  });

  it('applies size', () => {
    const { container } = render(<Icon name="close" size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('accepts custom numeric size', () => {
    const { container } = render(<Icon name="close" size={40} />);
    expect(container.querySelector('svg')?.getAttribute('width')).toBe('40');
  });
});
