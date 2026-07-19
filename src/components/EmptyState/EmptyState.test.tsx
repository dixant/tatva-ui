import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title only', () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<EmptyState title="X" description="Try again" />);
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('renders action', () => {
    render(<EmptyState title="X" action={<button>Retry</button>} />);
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<EmptyState title="X" icon={<span data-testid="ic" />} />);
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<EmptyState title="X" className="c" />);
    expect(screen.getByTestId('tatva-emptystate').className).toMatch(/c/);
  });
});
