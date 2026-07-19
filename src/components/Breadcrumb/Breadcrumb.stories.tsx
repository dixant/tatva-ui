import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
      <Breadcrumb.Item>Getting Started</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb separator="›">
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/team">Team</Breadcrumb.Item>
      <Breadcrumb.Item>Members</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/a">Section</Breadcrumb.Item>
      <Breadcrumb.Item href="/a/b">Category</Breadcrumb.Item>
      <Breadcrumb.Item href="/a/b/c">Subcategory</Breadcrumb.Item>
      <Breadcrumb.Item>Item</Breadcrumb.Item>
    </Breadcrumb>
  ),
};
