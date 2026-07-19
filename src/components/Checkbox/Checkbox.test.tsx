import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, CheckboxGroup } from './Checkbox';

describe('Checkbox', () => {
  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Agree" onChange={onChange} />);
    await user.click(screen.getByLabelText('Agree'));
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('toggles on Space', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Agree" onChange={onChange} />);
    const box = screen.getByLabelText('Agree');
    box.focus();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders indeterminate with aria-checked=mixed', () => {
    render(<Checkbox label="Some" indeterminate />);
    expect(screen.getByLabelText('Some')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="X" disabled onChange={onChange} />);
    await user.click(screen.getByLabelText('X'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('CheckboxGroup', () => {
  function Harness() {
    const [v, setV] = useState<string[]>([]);
    return (
      <CheckboxGroup value={v} onChange={setV} label="Fruits">
        <Checkbox label="Apple" value="apple" />
        <Checkbox label="Banana" value="banana" />
      </CheckboxGroup>
    );
  }

  it('manages selection', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByLabelText('Apple'));
    expect(screen.getByLabelText('Apple')).toBeChecked();
    await user.click(screen.getByLabelText('Banana'));
    expect(screen.getByLabelText('Banana')).toBeChecked();
    await user.click(screen.getByLabelText('Apple'));
    expect(screen.getByLabelText('Apple')).not.toBeChecked();
  });

  it('renders with role=group', () => {
    render(
      <CheckboxGroup value={[]} onChange={() => {}} label="Fruits">
        <Checkbox label="Apple" value="apple" />
      </CheckboxGroup>,
    );
    expect(screen.getByRole('group', { name: 'Fruits' })).toBeInTheDocument();
  });
});
