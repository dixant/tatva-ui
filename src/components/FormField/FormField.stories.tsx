import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const WithInput: Story = {
  render: () => (
    <FormField label="Email" helperText="We never share this.">
      <input
        type="email"
        style={{
          padding: '8px 12px',
          border: '1px solid var(--tatva-color-border)',
          borderRadius: 6,
          font: 'inherit',
        }}
      />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField label="Email" error="Invalid email">
      <input
        type="email"
        defaultValue="not-an-email"
        style={{
          padding: '8px 12px',
          border: '1px solid var(--tatva-color-error)',
          borderRadius: 6,
          font: 'inherit',
        }}
      />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField label="Username" required>
      <input
        style={{
          padding: '8px 12px',
          border: '1px solid var(--tatva-color-border)',
          borderRadius: 6,
          font: 'inherit',
        }}
      />
    </FormField>
  ),
};
