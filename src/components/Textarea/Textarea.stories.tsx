import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Inputs/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Description' },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const WithCount: Story = { args: { showCount: true, maxLength: 200 } };
export const AutoResize: Story = { args: { autoResize: true } };
export const WithError: Story = { args: { error: 'Too short' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Locked' } };
