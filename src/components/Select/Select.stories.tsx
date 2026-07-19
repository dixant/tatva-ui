import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
];

const groupedOptions = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'potato', label: 'Potato', group: 'Vegetables' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Fruit', options },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithPlaceholder: Story = { args: { placeholder: 'Pick one' } };
export const WithGroups: Story = { args: { options: groupedOptions, label: 'Produce' } };
export const Searchable: Story = { args: { searchable: true } };
export const Disabled: Story = { args: { disabled: true } };
export const WithError: Story = { args: { error: 'Please choose one' } };
export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 60 }, (_, i) => ({
      value: `opt-${i}`,
      label: `Option ${i + 1}`,
    })),
  },
};
