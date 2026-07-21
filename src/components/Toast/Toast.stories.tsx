import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ToastProvider>;

function Fire({
  variant = 'info',
  ...opts
}: {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}) {
  const { toast } = useToast();
  return (
    <Button
      variant={variant === 'error' ? 'destructive' : 'primary'}
      onClick={() =>
        toast({
          title: opts.title ?? `${variant} toast`,
          description: opts.description,
          variant,
          duration: opts.duration,
          action: opts.action,
        })
      }
    >
      Fire {variant}
    </Button>
  );
}

export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Fire
          variant="success"
          title="Saved"
          description="Your changes are safe."
        />
        <Fire
          variant="error"
          title="Failed"
          description="Something went wrong."
        />
        <Fire variant="warning" title="Careful" description="Low disk space." />
        <Fire
          variant="info"
          title="Heads up"
          description="New version available."
        />
      </div>
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <Fire
        variant="info"
        title="Deleted"
        description="The item was removed."
        action={{ label: 'Undo', onClick: () => alert('Undone') }}
      />
    </ToastProvider>
  ),
};

export const Persistent: Story = {
  render: () => (
    <ToastProvider>
      <Fire variant="warning" title="Persistent" duration={0} />
    </ToastProvider>
  ),
};
