import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it.each([
    ['info', 'status'],
    ['success', 'status'],
    ['warning', 'alert'],
    ['error', 'alert'],
  ] as const)('renders %s with role=%s', (variant, role) => {
    render(<Alert variant={variant}>msg</Alert>);
    expect(screen.getByRole(role)).toBeInTheDocument();
  });

  it('renders title and body', () => {
    render(<Alert title="Heads up">details</Alert>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('details')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<Alert icon={<span data-testid="ic">i</span>}>x</Alert>);
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('close button fires onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Alert closable onClose={onClose}>
        x
      </Alert>,
    );
    await user.click(screen.getByLabelText('Close alert'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render close button when not closable', () => {
    render(<Alert>x</Alert>);
    expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
  });
});
