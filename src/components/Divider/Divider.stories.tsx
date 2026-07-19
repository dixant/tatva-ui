import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <p>Above</p>
      <Divider />
      <p>Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: 40, alignItems: 'center', gap: 12 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Divider label="or continue with" />
    </div>
  ),
};
