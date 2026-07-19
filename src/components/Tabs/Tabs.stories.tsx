import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List aria-label="Sections">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">Overview content</Tabs.Panel>
      <Tabs.Panel value="activity">Activity content</Tabs.Panel>
      <Tabs.Panel value="settings">Settings content</Tabs.Panel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="a" orientation="vertical">
      <Tabs.List aria-label="Menu">
        <Tabs.Tab value="a">Profile</Tabs.Tab>
        <Tabs.Tab value="b">Team</Tabs.Tab>
        <Tabs.Tab value="c">Billing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">Profile</Tabs.Panel>
      <Tabs.Panel value="b">Team</Tabs.Panel>
      <Tabs.Panel value="c">Billing</Tabs.Panel>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="a">
      <Tabs.List aria-label="Locked">
        <Tabs.Tab value="a">Active</Tabs.Tab>
        <Tabs.Tab value="b" disabled>
          Locked
        </Tabs.Tab>
        <Tabs.Tab value="c">Other</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">Active panel</Tabs.Panel>
      <Tabs.Panel value="b">Locked panel</Tabs.Panel>
      <Tabs.Panel value="c">Other panel</Tabs.Panel>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="t-0">
      <Tabs.List aria-label="Many">
        {Array.from({ length: 8 }).map((_, i) => (
          <Tabs.Tab key={i} value={`t-${i}`}>
            Tab {i + 1}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {Array.from({ length: 8 }).map((_, i) => (
        <Tabs.Panel key={i} value={`t-${i}`}>
          Content {i + 1}
        </Tabs.Panel>
      ))}
    </Tabs>
  ),
};
