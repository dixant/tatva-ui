import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

function Sample(props: Partial<React.ComponentProps<typeof Tabs>>) {
  return (
    <Tabs defaultValue="a" {...props}>
      <Tabs.List aria-label="Sections">
        <Tabs.Tab value="a">A</Tabs.Tab>
        <Tabs.Tab value="b">B</Tabs.Tab>
        <Tabs.Tab value="c" disabled>
          C
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">Panel A</Tabs.Panel>
      <Tabs.Panel value="b">Panel B</Tabs.Panel>
      <Tabs.Panel value="c">Panel C</Tabs.Panel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('shows initial panel', () => {
    render(<Sample />);
    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
  });

  it('switches on click', async () => {
    const user = userEvent.setup();
    render(<Sample />);
    await user.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByText('Panel B')).toBeInTheDocument();
  });

  it('arrow keys navigate, skipping disabled', async () => {
    const user = userEvent.setup();
    render(<Sample />);
    const a = screen.getByRole('tab', { name: 'A' });
    a.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
    await user.keyboard('{ArrowRight}'); // wraps back to A (C is disabled)
    expect(screen.getByRole('tab', { name: 'A' })).toHaveFocus();
  });

  it('only active tab is in tab order', () => {
    render(<Sample />);
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('tabindex', '-1');
  });

  it('aria-selected reflects state', async () => {
    const user = userEvent.setup();
    render(<Sample />);
    await user.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Sample onChange={onChange} />);
    await user.click(screen.getByRole('tab', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
