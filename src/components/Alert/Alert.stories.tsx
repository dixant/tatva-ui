import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      <Alert variant="info" title="Heads up">
        This is an info alert.
      </Alert>
      <Alert variant="success" title="Saved">
        Your changes were saved successfully.
      </Alert>
      <Alert variant="warning" title="Careful">
        You have unsaved changes.
      </Alert>
      <Alert variant="error" title="Failed">
        Could not save. Please try again.
      </Alert>
    </div>
  ),
};

export const Closable: Story = {
  args: { variant: 'info', title: 'Dismiss me', closable: true, children: 'Click ×' },
};

export const NoTitle: Story = {
  args: { variant: 'warning', children: 'Just a plain warning.' },
};
