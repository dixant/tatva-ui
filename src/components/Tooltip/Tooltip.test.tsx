import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows on hover after delay', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hi there" delay={0}>
        <button>Btn</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Btn'));
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toBeInTheDocument(),
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hi there');
  });

  it('hides on mouse leave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hi" delay={0}>
        <button>Btn</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Btn'));
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toBeInTheDocument(),
    );
    await user.unhover(screen.getByText('Btn'));
    await waitFor(() =>
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument(),
    );
  });

  it('shows on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Focus me" delay={0}>
        <button>Btn</button>
      </Tooltip>,
    );
    await user.tab();
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toHaveTextContent('Focus me'),
    );
  });

  it('aria-describedby set when open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hi" delay={0}>
        <button>Btn</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Btn'));
    await waitFor(() => {
      expect(screen.getByText('Btn')).toHaveAttribute('aria-describedby');
    });
  });
});
