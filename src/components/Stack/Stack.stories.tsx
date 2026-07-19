import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const Box = ({ label }: { label: string }) => (
  <div
    style={{
      padding: 12,
      background: 'var(--tatva-color-primary-50)',
      border: '1px solid var(--tatva-color-primary-200)',
      borderRadius: 6,
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Stack>;

export const Vertical: Story = {
  render: () => (
    <Stack gap="4">
      <Box label="1" />
      <Box label="2" />
      <Box label="3" />
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="horizontal" gap="4">
      <Box label="1" />
      <Box label="2" />
      <Box label="3" />
    </Stack>
  ),
};

export const Centered: Story = {
  render: () => (
    <Stack direction="horizontal" gap="4" align="center" justify="center">
      <Box label="Centered" />
    </Stack>
  ),
};

export const Wrapped: Story = {
  render: () => (
    <Stack direction="horizontal" gap="2" wrap style={{ maxWidth: 200 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Box key={i} label={String(i + 1)} />
      ))}
    </Stack>
  ),
};
