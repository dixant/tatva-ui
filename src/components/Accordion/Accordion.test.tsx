import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

function Sample(props: Partial<React.ComponentProps<typeof Accordion>>) {
  return (
    <Accordion {...props}>
      <Accordion.Item value="a">
        <Accordion.Trigger>A</Accordion.Trigger>
        <Accordion.Content>Panel A</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Trigger>B</Accordion.Trigger>
        <Accordion.Content>Panel B</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('toggles content on click', async () => {
    const user = userEvent.setup();
    render(<Sample />);
    await user.click(screen.getByRole('button', { name: /A/ }));
    expect(screen.getByText('Panel A')).toBeVisible();
  });

  it('single mode closes other items', async () => {
    const user = userEvent.setup();
    render(<Sample type="single" />);
    await user.click(screen.getByRole('button', { name: /A/ }));
    await user.click(screen.getByRole('button', { name: /B/ }));
    expect(screen.getByText('Panel A').closest('[role="region"]')).toHaveAttribute('hidden');
    expect(screen.getByText('Panel B')).toBeVisible();
  });

  it('multiple mode allows concurrent open', async () => {
    const user = userEvent.setup();
    render(<Sample type="multiple" />);
    await user.click(screen.getByRole('button', { name: /A/ }));
    await user.click(screen.getByRole('button', { name: /B/ }));
    expect(screen.getByText('Panel A')).toBeVisible();
    expect(screen.getByText('Panel B')).toBeVisible();
  });

  it('aria-expanded updates', async () => {
    const user = userEvent.setup();
    render(<Sample />);
    const a = screen.getByRole('button', { name: /A/ });
    expect(a).toHaveAttribute('aria-expanded', 'false');
    await user.click(a);
    expect(a).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects defaultValue', () => {
    render(<Sample defaultValue="a" />);
    expect(screen.getByText('Panel A')).toBeVisible();
  });
});
