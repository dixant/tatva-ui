import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar src="/x.png" alt="a" name="Ada Lovelace" />);
    expect(screen.getByAltText('a').tagName).toBe('IMG');
  });

  it('shows initials when no src', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('renders fallback icon with no name and no src', () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders status indicator', () => {
    render(<Avatar name="X" status="online" />);
    expect(screen.getByLabelText('Status: online')).toBeInTheDocument();
  });

  it('AvatarGroup shows overflow count', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
        <Avatar name="D" />
      </AvatarGroup>,
    );
    expect(screen.getByLabelText('2 more')).toBeInTheDocument();
  });
});
