import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: 320 }}>
      Elevated card
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{ maxWidth: 320 }}>
      Outlined card
    </Card>
  ),
};

export const Flat: Story = {
  render: () => (
    <Card variant="flat" style={{ maxWidth: 320 }}>
      Flat card
    </Card>
  ),
};

export const WithHeaderFooter: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: 360 }}>
      <Card.Header divider>
        <strong>Card title</strong>
      </Card.Header>
      <Card.Body>Body content sits in the middle.</Card.Body>
      <Card.Footer divider>
        <button>Cancel</button>
        <button>OK</button>
      </Card.Footer>
    </Card>
  ),
};

export const AsButton: Story = {
  render: () => (
    <Card
      as="button"
      variant="outlined"
      style={{
        maxWidth: 320,
        textAlign: 'left',
        cursor: 'pointer',
        font: 'inherit',
      }}
      onClick={() => alert('Card clicked')}
    >
      Click me
    </Card>
  ),
};
