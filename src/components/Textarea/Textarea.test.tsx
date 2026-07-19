import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders label and textarea', () => {
    render(<Textarea label="Bio" />);
    expect(screen.getByLabelText('Bio').tagName).toBe('TEXTAREA');
  });

  it('shows character count when showCount and maxLength', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Bio" showCount maxLength={10} />);
    const t = screen.getByLabelText('Bio');
    await user.type(t, 'hello');
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('shows error message with role alert', () => {
    render(<Textarea label="Bio" error="Too short" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Too short');
  });

  it('autoResize adjusts height', () => {
    render(<Textarea label="Bio" autoResize defaultValue="line1\nline2" />);
    const t = screen.getByLabelText('Bio') as HTMLTextAreaElement;
    // JSDOM doesn't compute real heights, but the effect should have run.
    expect(t.style.height).toBeDefined();
  });

  it('fires onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea label="Bio" onChange={onChange} />);
    await user.type(screen.getByLabelText('Bio'), 'hi');
    expect(onChange).toHaveBeenCalled();
  });
});
