import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = { args: { label: 'Search users' } };
export const WithDebounce: Story = {
  args: {
    label: 'Search',
    debounceMs: 500,
    onSearch: (v) => console.log('search:', v),
  },
};
export const Loading: Story = {
  args: { label: 'Search', loading: true, defaultValue: 'react' },
};
export const WithValue: Story = {
  args: { label: 'Search', defaultValue: 'query' },
};
