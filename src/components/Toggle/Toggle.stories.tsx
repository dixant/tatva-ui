import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Inputs/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'Notifications' },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Disabled: Story = { args: { disabled: true } };
