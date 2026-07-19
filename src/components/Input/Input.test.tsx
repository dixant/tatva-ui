import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('links label to input', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('fires onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText('Name'), 'hi');
    expect(onChange).toHaveBeenCalled();
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Name" disabled onChange={onChange} />);
    await user.type(screen.getByLabelText('Name'), 'hi');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows helper text', () => {
    render(<Input label="Pw" helperText="At least 8 chars" />);
    expect(screen.getByText('At least 8 chars')).toBeInTheDocument();
  });

  it('shows error and sets aria-invalid', () => {
    render(<Input label="Email" error="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('aria-describedby links to error id', () => {
    render(<Input label="Email" id="e1" error="Bad" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-describedby',
      'e1-error',
    );
  });

  it('renders left and right addons', () => {
    render(
      <Input
        label="URL"
        leftAddon={<span data-testid="l" />}
        rightAddon={<span data-testid="r" />}
      />,
    );
    expect(screen.getByTestId('l')).toBeInTheDocument();
    expect(screen.getByTestId('r')).toBeInTheDocument();
  });

  it('supports different input types', () => {
    render(<Input label="Pw" type="password" />);
    expect(screen.getByLabelText('Pw')).toHaveAttribute('type', 'password');
  });
});
