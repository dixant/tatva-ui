import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry', disabled: true },
];

describe('Select', () => {
  it('opens on click and selects an option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Fruit" options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={options} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('filters options when searchable', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={options} searchable />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByPlaceholderText('Search…'), 'ban');
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('has correct aria attributes', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={options} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not select disabled option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Fruit" options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Cherry'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
