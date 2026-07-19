import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioButton } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Inputs/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup name="plan" defaultValue="pro" label="Plan">
      <RadioButton value="free" label="Free" />
      <RadioButton value="pro" label="Pro" />
      <RadioButton value="team" label="Team" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup name="size" orientation="horizontal" defaultValue="m" label="Size">
      <RadioButton value="s" label="Small" />
      <RadioButton value="m" label="Medium" />
      <RadioButton value="l" label="Large" />
    </RadioGroup>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <RadioGroup name="tier" label="Tier">
      <RadioButton value="bronze" label="Bronze" />
      <RadioButton value="silver" label="Silver" />
      <RadioButton value="gold" label="Gold" disabled />
    </RadioGroup>
  ),
};
