import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid' },
  { value: 'qwik', label: 'Qwik' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Forms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: { label: 'Frameworks', options },
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {};
export const WithMax: Story = { args: { max: 3 } };
export const ManySelected: Story = {
  args: { defaultValue: ['react', 'vue', 'svelte'] },
};
