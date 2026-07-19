import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: { children: 'The quick brown fox jumps over the lazy dog.' },
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body1">Body 1 — regular paragraph text.</Typography>
      <Typography variant="body2">Body 2 — smaller paragraph text.</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">OVERLINE</Typography>
    </div>
  ),
};

export const CustomElement: Story = {
  args: { variant: 'h1', as: 'span' },
};

export const Truncated: Story = {
  args: {
    truncate: true,
    style: { maxWidth: 200 },
    children: 'This is a long string that will be truncated with an ellipsis.',
  },
};

export const MaxLines: Story = {
  args: {
    maxLines: 2,
    style: { maxWidth: 240 },
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  },
};

export const CustomColor: Story = {
  args: { color: '--tatva-color-primary-600', children: 'Themed color' },
};
