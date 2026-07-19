import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 40, placeItems: 'center' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} content={`Position: ${p}`} position={p}>
          <Button>{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip content="After 800ms" delay={800}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This tooltip has a much longer body of text that wraps onto multiple lines when it exceeds the max-width of the tooltip container.">
      <Button>Hover for long text</Button>
    </Tooltip>
  ),
};
