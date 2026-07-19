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

  it.each(['horizontal', 'vertical'] as const)('applies direction=%s', (dir) => {
    render(<Stack direction={dir}>x</Stack>);
    expect(screen.getByTestId('tatva-stack').className).toMatch(
      new RegExp(`direction${dir[0].toUpperCase()}${dir.slice(1)}`),
    );
  });

  it.each(['start', 'center', 'end', 'stretch'] as const)('applies align=%s', (a) => {
    render(<Stack align={a}>x</Stack>);
    expect(screen.getByTestId('tatva-stack').className).toMatch(
      new RegExp(`align${a[0].toUpperCase()}${a.slice(1)}`),
    );
  });

  it.each(['start', 'center', 'end', 'between', 'around'] as const)(
    'applies justify=%s',
    (j) => {
      render(<Stack justify={j}>x</Stack>);
      expect(screen.getByTestId('tatva-stack').className).toMatch(
        new RegExp(`justify${j[0].toUpperCase()}${j.slice(1)}`),
      );
    },
  );

  it('applies wrap', () => {
    render(<Stack wrap>x</Stack>);
    expect(screen.getByTestId('tatva-stack').className).toMatch(/wrap/);
  });

  it('applies token gap', () => {
    render(<Stack gap="8">x</Stack>);
    expect(screen.getByTestId('tatva-stack').style.gap).toBe('var(--tatva-space-8)');
  });

  it('accepts custom gap string', () => {
    render(<Stack gap="20px">x</Stack>);
    expect(screen.getByTestId('tatva-stack').style.gap).toBe('20px');
  });

  it('accepts numeric gap as token', () => {
    render(<Stack gap={4}>x</Stack>);
    expect(screen.getByTestId('tatva-stack').style.gap).toBe('var(--tatva-space-4)');
  });

  it('renders as another element via as', () => {
    render(
      <Stack as="section">
        <span>x</span>
      </Stack>,
    );
    expect(screen.getByText('x').closest('section')).not.toBeNull();
  });
});
