import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Notify" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles on Space', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Notify" onChange={onChange} />);
    screen.getByRole('switch').focus();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Notify" disabled onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects controlled value', () => {
    render(<Toggle label="X" checked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not mutate internal state when controlled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="X" checked={false} onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    // Aria-checked stays false because parent didn't update.
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it.each(['sm', 'md'] as const)('applies size %s', (size) => {
    render(<Toggle label="X" size={size} />);
    expect(screen.getByRole('switch').className).toMatch(
      new RegExp(`size${size[0].toUpperCase()}${size.slice(1)}`),
    );
  });

  it('defaultChecked initializes state', () => {
    render(<Toggle label="X" defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});
