import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('maps variants to semantic elements', () => {
    render(<Typography variant="h1">Title</Typography>);
    expect(screen.getByText('Title').tagName).toBe('H1');
  });

  it('renders body1 as p', () => {
    render(<Typography variant="body1">Text</Typography>);
    expect(screen.getByText('Text').tagName).toBe('P');
  });

  it('respects `as` override', () => {
    render(
      <Typography variant="h1" as="span">
        Custom
      </Typography>,
    );
    expect(screen.getByText('Custom').tagName).toBe('SPAN');
  });

  it('applies truncate class', () => {
    render(<Typography truncate>Long text</Typography>);
    expect(screen.getByText('Long text').className).toMatch(/truncate/);
  });

  it('applies maxLines style', () => {
    render(<Typography maxLines={2}>Text</Typography>);
    expect(screen.getByText('Text').style.overflow).toBe('hidden');
  });

  it('applies className prop', () => {
    render(<Typography className="custom">Text</Typography>);
    expect(screen.getByText('Text').className).toMatch(/custom/);
  });
});
