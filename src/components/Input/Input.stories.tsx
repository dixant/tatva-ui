import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email', placeholder: 'you@example.com' },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithHelperText: Story = {
  args: { helperText: 'We never share this.' },
};
export const WithError: Story = { args: { error: 'Email is required' } };
export const WithAddons: Story = {
  args: { leftAddon: <span>@</span>, rightAddon: <span>.com</span> },
};
export const Disabled: Story = {
  args: { disabled: true, value: 'ada@example.com' },
};
export const ReadOnly: Story = {
  args: { readOnly: true, value: 'ada@example.com' },
};
export const Password: Story = {
  args: { type: 'password', label: 'Password' },
};
export const Required: Story = { args: { required: true } };
