import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

describe('MultiSelect', () => {
  it('selects and adds badge', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect label="Stack" options={options} onChange={onChange} />,
    );
    await user.click(screen.getByLabelText('Stack'));
    await user.click(screen.getByText('React'));
    expect(onChange).toHaveBeenCalledWith(['react']);
  });

  it('removing a badge updates value', async () => {
    const user = userEvent.setup();
    function Harness() {
      const [v, setV] = useState<string[]>(['react']);
      return <MultiSelect label="Stack" options={options} value={v} onChange={setV} />;
    }
    render(<Harness />);
    await user.click(screen.getByLabelText('Remove React'));
    expect(screen.queryByLabelText('Remove React')).not.toBeInTheDocument();
  });

  it('max prevents further selection', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        label="Stack"
        options={options}
        max={1}
        defaultValue={['react']}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByLabelText('Stack'));
    expect(screen.getByText(/Maximum 1 selections reached/)).toBeInTheDocument();
  });

  it('backspace removes last', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        label="Stack"
        options={options}
        defaultValue={['react', 'vue']}
        onChange={onChange}
      />,
    );
    screen.getByLabelText('Stack').focus();
    await user.keyboard('{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith(['react']);
  });
});
