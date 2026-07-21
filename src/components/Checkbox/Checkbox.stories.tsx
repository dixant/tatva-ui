import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Accept terms' },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Disabled: Story = { args: { disabled: true } };

function VerticalGroupDemo() {
  const [v, setV] = useState<string[]>(['apple']);
  return (
    <CheckboxGroup value={v} onChange={setV} label="Fruits">
      <Checkbox label="Apple" value="apple" />
      <Checkbox label="Banana" value="banana" />
      <Checkbox label="Cherry" value="cherry" />
    </CheckboxGroup>
  );
}

function HorizontalGroupDemo() {
  const [v, setV] = useState<string[]>([]);
  return (
    <CheckboxGroup
      value={v}
      onChange={setV}
      orientation="horizontal"
      label="Sizes"
    >
      <Checkbox label="S" value="s" />
      <Checkbox label="M" value="m" />
      <Checkbox label="L" value="l" />
    </CheckboxGroup>
  );
}

export const GroupVertical: StoryObj = { render: () => <VerticalGroupDemo /> };
export const GroupHorizontal: StoryObj = {
  render: () => <HorizontalGroupDemo />,
};
