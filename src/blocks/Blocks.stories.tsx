import type { Meta, StoryObj } from '@storybook/react';
import { LoginBlock } from './LoginBlock';
import { PricingBlock } from './PricingBlock';
import { DashboardBlock } from './DashboardBlock';

const meta: Meta = {
  title: 'Blocks/Overview',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Login: Story = { render: () => <LoginBlock /> };
export const Pricing: Story = { render: () => <PricingBlock /> };
export const Dashboard: Story = { render: () => <DashboardBlock /> };
