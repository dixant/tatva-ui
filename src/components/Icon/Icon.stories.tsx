import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { icons, type IconName } from './icons';

const meta: Meta<typeof Icon> = {
  title: 'Components/Media/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'search', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(140px, 1fr))',
        gap: 12,
      }}
    >
      {(Object.keys(icons) as IconName[]).map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 8,
            border: '1px solid var(--tatva-color-border)',
            borderRadius: 6,
          }}
        >
          <Icon name={name} label={name} />
          <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Icon name="settings" size="sm" />
      <Icon name="settings" size="md" />
      <Icon name="settings" size="lg" />
      <Icon name="settings" size="xl" />
    </div>
  ),
};

export const CustomColor: Story = {
  args: { name: 'check', color: 'var(--tatva-color-success)', size: 'xl' },
};
