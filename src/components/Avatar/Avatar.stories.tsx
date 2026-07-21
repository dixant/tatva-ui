import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=12',
    alt: 'A person',
    name: 'Ada Lovelace',
    size: 'lg',
  },
};
export const WithInitials: Story = {
  args: { name: 'Ada Lovelace', size: 'lg' },
};
export const WithIcon: Story = { args: { size: 'lg' } };
export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Avatar name="Alice" status="online" />
      <Avatar name="Bob" status="busy" />
      <Avatar name="Carol" status="offline" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Carol" />
    </AvatarGroup>
  ),
};

export const GroupOverflow: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Carol" />
      <Avatar name="Dan" />
      <Avatar name="Eve" />
    </AvatarGroup>
  ),
};
