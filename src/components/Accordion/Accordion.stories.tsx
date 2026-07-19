import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue="one" className="story-max-w">
      <Accordion.Item value="one">
        <Accordion.Trigger>Section one</Accordion.Trigger>
        <Accordion.Content>Content one.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Section two</Accordion.Trigger>
        <Accordion.Content>Content two.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="three">
        <Accordion.Trigger>Section three</Accordion.Trigger>
        <Accordion.Content>Content three.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['one', 'three']}>
      <Accordion.Item value="one">
        <Accordion.Trigger>Section one</Accordion.Trigger>
        <Accordion.Content>Content one.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Section two</Accordion.Trigger>
        <Accordion.Content>Content two.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="three">
        <Accordion.Trigger>Section three</Accordion.Trigger>
        <Accordion.Content>Content three.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const AllClosed: Story = {
  render: () => (
    <Accordion type="single">
      <Accordion.Item value="a">
        <Accordion.Trigger>Closed A</Accordion.Trigger>
        <Accordion.Content>Body A</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Trigger>Closed B</Accordion.Trigger>
        <Accordion.Content>Body B</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
