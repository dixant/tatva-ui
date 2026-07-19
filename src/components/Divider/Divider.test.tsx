import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal separator by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('renders vertical', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  it('renders label variant', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Divider className="custom" />);
    expect(screen.getByRole('separator').className).toMatch(/custom/);
  });

  it('applies custom className with label', () => {
    render(<Divider label="OR" className="lbl" />);
    expect(screen.getByRole('separator').className).toMatch(/lbl/);
  });
});
