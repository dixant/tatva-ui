import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { width: 240 } };
export const MultiLine: Story = { args: { lines: 4, width: 320 } };
export const Circular: Story = {
  args: { variant: 'circular', width: 48, height: 48 },
};
export const Rectangular: Story = {
  args: { variant: 'rectangular', width: 320, height: 120 },
};

export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 320,
        padding: 16,
        border: '1px solid var(--tatva-color-border)',
        borderRadius: 8,
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={120} />
      <Skeleton width="70%" />
      <Skeleton lines={3} />
    </div>
  ),
};
