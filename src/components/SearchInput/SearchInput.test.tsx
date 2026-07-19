import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('debounces onSearch', async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} debounceMs={200} />);
    await user.type(screen.getByLabelText('Search'), 'abc');
    expect(onSearch).not.toHaveBeenCalled();
    vi.advanceTimersByTime(250);
    expect(onSearch).toHaveBeenCalledWith('abc');
    vi.useRealTimers();
  });

  it('clear button empties value', async () => {
    const user = userEvent.setup();
    render(<SearchInput defaultValue="hello" />);
    await user.click(screen.getByLabelText('Clear search'));
    expect((screen.getByLabelText('Search') as HTMLInputElement).value).toBe('');
  });

  it('shows spinner when loading', async () => {
    render(<SearchInput loading defaultValue="hi" />);
    await waitFor(() => expect(screen.getByRole('status', { name: 'Searching' })).toBeInTheDocument());
  });
});
