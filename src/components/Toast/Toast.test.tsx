import { describe, it, expect, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from './Toast';

function Trigger({ opts }: { opts: Parameters<ReturnType<typeof useToast>['toast']>[0] }) {
  const { toast } = useToast();
  return <button onClick={() => toast(opts)}>fire</button>;
}

describe('Toast', () => {
  it('appears when triggered', () => {
    render(
      <ToastProvider>
        <Trigger opts={{ title: 'Saved', variant: 'success' }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger opts={{ title: 'Bye', duration: 1000 }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getByText('Bye')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.queryByText('Bye')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('close button removes toast', () => {
    render(
      <ToastProvider>
        <Trigger opts={{ title: 'X', duration: 0 }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    fireEvent.click(screen.getByLabelText('Close notification'));
    expect(screen.queryByText('X')).not.toBeInTheDocument();
  });

  it('action button fires callback', () => {
    const onClick = vi.fn();
    render(
      <ToastProvider>
        <Trigger opts={{ title: 'Undo?', duration: 0, action: { label: 'Undo', onClick } }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    fireEvent.click(screen.getByText('Undo'));
    expect(onClick).toHaveBeenCalled();
  });

  it('multiple toasts stack', () => {
    render(
      <ToastProvider>
        <Trigger opts={{ title: 'One', duration: 0 }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getAllByTestId('tatva-toast').length).toBe(2);
  });
});
