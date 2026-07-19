import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>hi</Card>);
    expect(screen.getByText('hi')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Card variant="outlined">x</Card>);
    expect(screen.getByTestId('tatva-card').className).toMatch(/variantOutlined/);
  });

  it('renders compound sub-components in order', () => {
    render(
      <Card>
        <Card.Header>H</Card.Header>
        <Card.Body>B</Card.Body>
        <Card.Footer>F</Card.Footer>
      </Card>,
    );
    const card = screen.getByTestId('tatva-card');
    const text = card.textContent;
    expect(text).toBe('HBF');
  });

  it('renders as button when as=button', () => {
    render(
      <Card as="button" onClick={() => {}}>
        click
      </Card>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
