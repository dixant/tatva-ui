import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render when open=false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Hi
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open=true with role=dialog', () => {
    render(
      <Modal open onClose={() => {}} title="Hello">
        <Modal.Body>Hi</Modal.Body>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="X">
        Hi
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose on backdrop click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Hi
      </Modal>,
    );
    await user.click(screen.getByTestId('tatva-modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close on backdrop when closeOnBackdrop=false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnBackdrop={false}>
        Hi
      </Modal>,
    );
    await user.click(screen.getByTestId('tatva-modal-backdrop'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    render(
      <Modal open onClose={() => {}}>
        Hi
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('close button fires onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="X">
        Hi
      </Modal>,
    );
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });
});
