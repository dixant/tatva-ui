import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('remove button fires onRemove', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove}>
        Alpha
      </Badge>,
    );
    await user.click(screen.getByLabelText('Remove Alpha'));
    expect(onRemove).toHaveBeenCalled();
  });

  it('applies color class', () => {
    render(<Badge color="error">bad</Badge>);
    expect(screen.getByTestId('tatva-badge').className).toMatch(/colorError/);
  });
});
