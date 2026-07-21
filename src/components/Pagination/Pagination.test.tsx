import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('disables Previous on page 1', () => {
    render(<Pagination totalPages={5} currentPage={1} onChange={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'Previous page' }),
    ).toBeDisabled();
  });

  it('disables Next on last page', () => {
    render(<Pagination totalPages={5} currentPage={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('fires onChange when clicking a page', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={1} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: '3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('shows ellipsis with many pages', () => {
    render(<Pagination totalPages={20} currentPage={10} onChange={() => {}} />);
    // At least one ellipsis
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });

  it('marks current page aria-current', () => {
    render(<Pagination totalPages={5} currentPage={2} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
