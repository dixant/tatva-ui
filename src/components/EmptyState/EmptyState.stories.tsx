import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';
import { Icon } from '../Icon';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Data Display/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters.',
  },
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      icon={<Icon name="search" size="xl" />}
      title="No users match"
      description="Change your search or invite new members."
      action={<Button>Invite user</Button>}
    />
  ),
};
