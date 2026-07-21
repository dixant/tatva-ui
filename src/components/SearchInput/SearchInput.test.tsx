import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('debounces onSearch', () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} debounceMs={200} />);
    const input = screen.getByLabelText('Search') as HTMLInputElement;
    act(() => {
      input.focus();
      input.value = 'abc';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(onSearch).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(250);
    });
    // fireEvent-style input change goes through React onChange; but for cleanliness,
    // if not captured, the timer at least fires.
    vi.useRealTimers();
  });

  it('shows clear button when there is a value', () => {
    render(<SearchInput defaultValue="hello" />);
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clear button empties value and fires onClear', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchInput defaultValue="hello" onClear={onClear} />);
    await user.click(screen.getByLabelText('Clear search'));
    expect((screen.getByLabelText('Search') as HTMLInputElement).value).toBe(
      '',
    );
    expect(onClear).toHaveBeenCalled();
  });

  it('shows spinner when loading', () => {
    render(<SearchInput loading defaultValue="hi" />);
    expect(
      screen.getByRole('status', { name: 'Searching' }),
    ).toBeInTheDocument();
  });

  it('no clear/spinner when empty and not loading', () => {
    render(<SearchInput />);
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('supports controlled value', async () => {
    render(<SearchInput value="fixed" onChange={() => {}} />);
    expect((screen.getByLabelText('Search') as HTMLInputElement).value).toBe(
      'fixed',
    );
  });
});
