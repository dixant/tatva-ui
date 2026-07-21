import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>hi</Card>);
    expect(screen.getByText('hi')).toBeInTheDocument();
  });

  it.each(['elevated', 'outlined', 'flat'] as const)(
    'applies %s variant class',
    (variant) => {
      render(<Card variant={variant}>x</Card>);
      expect(screen.getByTestId('tatva-card').className).toMatch(
        new RegExp(`variant${variant[0].toUpperCase()}${variant.slice(1)}`),
      );
    },
  );

  it.each(['none', 'sm', 'md', 'lg'] as const)('applies padding %s', (p) => {
    render(<Card padding={p}>x</Card>);
    expect(screen.getByTestId('tatva-card').className).toMatch(
      new RegExp(`padding${p[0].toUpperCase()}${p.slice(1)}`),
    );
  });

  it('renders compound sub-components in order', () => {
    render(
      <Card>
        <Card.Header>H</Card.Header>
        <Card.Body>B</Card.Body>
        <Card.Footer>F</Card.Footer>
      </Card>,
    );
    expect(screen.getByTestId('tatva-card').textContent).toBe('HBF');
  });

  it('header divider adds separator class', () => {
    const { container } = render(
      <Card>
        <Card.Header divider>H</Card.Header>
      </Card>,
    );
    expect(
      container.querySelector('[class*="headerDivider"]'),
    ).toBeInTheDocument();
  });

  it('footer divider adds separator class', () => {
    const { container } = render(
      <Card>
        <Card.Footer divider>F</Card.Footer>
      </Card>,
    );
    expect(
      container.querySelector('[class*="footerDivider"]'),
    ).toBeInTheDocument();
  });

  it('renders as another element via as prop', () => {
    render(
      <Card as="button" onClick={() => {}}>
        click
      </Card>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
