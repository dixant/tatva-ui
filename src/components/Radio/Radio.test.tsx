import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, RadioButton } from './Radio';

function Group(props: Partial<React.ComponentProps<typeof RadioGroup>>) {
  return (
    <RadioGroup name="size" {...props}>
      <RadioButton value="s" label="Small" />
      <RadioButton value="m" label="Medium" />
      <RadioButton value="l" label="Large" disabled />
    </RadioGroup>
  );
}

describe('Radio', () => {
  it('selects on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Group onChange={onChange} />);
    await user.click(screen.getByLabelText('Medium'));
    expect(onChange).toHaveBeenCalledWith('m');
    expect(screen.getByLabelText('Medium')).toBeChecked();
  });

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Group defaultValue="s" />);
    screen.getByLabelText('Small').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByLabelText('Medium')).toHaveFocus();
    // Large is disabled, so ArrowDown wraps back to Small
    await user.keyboard('{ArrowDown}');
    expect(screen.getByLabelText('Small')).toHaveFocus();
  });

  it('disabled option cannot be selected via click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Group onChange={onChange} />);
    await user.click(screen.getByLabelText('Large'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with role=radiogroup', () => {
    render(<Group />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});
