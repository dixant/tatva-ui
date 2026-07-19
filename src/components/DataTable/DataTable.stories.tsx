import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type DataTableColumn } from './DataTable';

type User = { id: number; name: string; email: string; role: string; joined: string };

const users: User[] = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', joined: '2023-04-11' },
  { id: 2, name: 'Bob Miller', email: 'bob@example.com', role: 'Editor', joined: '2024-01-05' },
  { id: 3, name: 'Carol Diaz', email: 'carol@example.com', role: 'Viewer', joined: '2024-06-22' },
  { id: 4, name: 'Dan Evans', email: 'dan@example.com', role: 'Editor', joined: '2025-02-10' },
  { id: 5, name: 'Eve Fox', email: 'eve@example.com', role: 'Viewer', joined: '2025-04-01' },
];

const cols: DataTableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'joined', header: 'Joined', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = { render: () => <DataTable columns={cols} data={users} /> };
export const Sortable: Story = {
  render: () => <DataTable columns={cols} data={users} sortable />,
};
export const Selectable: Story = {
  render: () => <DataTable columns={cols} data={users} selectable />,
};
export const WithPagination: Story = {
  render: () => {
    const many = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      name: `User ${i + 1}`,
      email: `u${i}@example.com`,
      role: i % 2 ? 'Editor' : 'Viewer',
      joined: '2025-01-01',
    }));
    return <DataTable columns={cols} data={many} pagination pageSize={10} sortable />;
  },
};
export const Loading: Story = {
  render: () => <DataTable columns={cols} data={[]} loading pageSize={5} />,
};
export const Empty: Story = {
  render: () => <DataTable columns={cols} data={[]} emptyState="No users found." />,
};
export const CustomCellRenderer: Story = {
  render: () => {
    const c: DataTableColumn<User>[] = [
      { key: 'name', header: 'Name' },
      {
        key: 'role',
        header: 'Role',
        render: (v) => (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 999,
              background: 'var(--tatva-color-primary-100)',
              color: 'var(--tatva-color-primary-800)',
              fontSize: 12,
            }}
          >
            {String(v)}
          </span>
        ),
      },
    ];
    return <DataTable columns={c} data={users} />;
  },
};
export const AllFeatures: Story = {
  render: () => (
    <DataTable columns={cols} data={users} selectable sortable pagination pageSize={3} />
  ),
};
