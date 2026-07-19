import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <span>a</span>
        <span>b</span>
      </Stack>,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  it('applies horizontal direction', () => {
    render(<Stack direction="horizontal">x</Stack>);
    expect(screen.getByTestId('tatva-stack').className).toMatch(/directionHorizontal/);
  });

  it('applies gap as CSS variable', () => {
    render(<Stack gap="8">x</Stack>);
    expect(screen.getByTestId('tatva-stack').style.gap).toBe('var(--tatva-space-8)');
  });

  it('accepts custom gap', () => {
    render(<Stack gap="20px">x</Stack>);
    expect(screen.getByTestId('tatva-stack').style.gap).toBe('20px');
  });
});
