import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders with role=alert for error', () => {
    render(<Alert variant="error">Bad</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with role=status for info', () => {
    render(<Alert variant="info">Note</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Alert title="Heads up">Body</Alert>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('close button fires onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert closable onClose={onClose}>x</Alert>);
    await user.click(screen.getByLabelText('Close alert'));
    expect(onClose).toHaveBeenCalled();
  });
});
