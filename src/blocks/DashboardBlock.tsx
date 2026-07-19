import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { SearchInput } from '../components/SearchInput';
import { Stack } from '../components/Stack';
import { Tabs } from '../components/Tabs';
import { Typography } from '../components/Typography';

interface Row extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited' | 'Archived';
  joined: string;
}

const SAMPLE_ROWS: Row[] = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-11' },
  { id: 2, name: 'Bob Miller', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-03-05' },
  { id: 3, name: 'Carol Diaz', email: 'carol@example.com', role: 'Viewer', status: 'Invited', joined: '2024-06-22' },
  { id: 4, name: 'Dan Evans', email: 'dan@example.com', role: 'Editor', status: 'Archived', joined: '2025-02-10' },
  { id: 5, name: 'Eve Fox', email: 'eve@example.com', role: 'Viewer', status: 'Active', joined: '2025-04-01' },
  { id: 6, name: 'Frank Gale', email: 'frank@example.com', role: 'Editor', status: 'Active', joined: '2025-07-14' },
];

export interface DashboardBlockProps {
  rows?: Row[];
}

/**
 * DashboardBlock — a fully wired admin dashboard scaffold.
 * Copy, plug your data source in, ship.
 */
export function DashboardBlock({ rows = SAMPLE_ROWS }: DashboardBlockProps) {
  const [query, setQuery] = useState('');
  const [statusTab, setStatusTab] = useState<'Active' | 'Invited' | 'Archived'>(
    'Active',
  );

  const filtered = rows.filter(
    (r) =>
      r.status === statusTab &&
      (query === '' ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase())),
  );

  const cols: DataTableColumn<Row>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (_, row) => (
        <Stack direction="horizontal" gap="2" align="center">
          <Avatar name={row.name} size="sm" />
          <div>
            <div style={{ fontWeight: 500 }}>{row.name}</div>
            <div style={{ color: 'var(--tatva-color-fg-muted)', fontSize: 12 }}>
              {row.email}
            </div>
          </div>
        </Stack>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (v) => (
        <Badge
          variant="subtle"
          color={v === 'Admin' ? 'primary' : v === 'Editor' ? 'info' : 'neutral'}
          size="sm"
        >
          {String(v)}
        </Badge>
      ),
    },
    { key: 'joined', header: 'Joined', sortable: true },
  ];

  const kpis = [
    { label: 'Total members', value: rows.length, delta: '+3 this month' },
    {
      label: 'Active',
      value: rows.filter((r) => r.status === 'Active').length,
      delta: '+2 this month',
    },
    {
      label: 'Invited',
      value: rows.filter((r) => r.status === 'Invited').length,
      delta: '+1 pending',
    },
    { label: 'Seats used', value: '12 / 50', delta: '24%' },
  ];

  return (
    <div style={{ padding: 'var(--tatva-space-6)', maxWidth: 1200, margin: '0 auto' }}>
      <Stack gap="6">
        <Breadcrumb>
          <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Team</Breadcrumb.Item>
        </Breadcrumb>

        <Stack direction="horizontal" justify="between" align="center" wrap>
          <Stack gap="1">
            <Typography variant="h2">Team members</Typography>
            <Typography variant="body2" color="--tatva-color-fg-muted">
              Invite, remove, or change roles for your team.
            </Typography>
          </Stack>
          <Button leftIcon={<Icon name="plus" size="sm" />}>Invite member</Button>
        </Stack>

        {/* KPI cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--tatva-space-3)',
          }}
        >
          {kpis.map((k) => (
            <Card key={k.label} variant="outlined" padding="md">
              <Stack gap="1">
                <Typography variant="caption">{k.label}</Typography>
                <Typography variant="h3">{k.value}</Typography>
                <Typography variant="caption" color="--tatva-color-success">
                  {k.delta}
                </Typography>
              </Stack>
            </Card>
          ))}
        </div>

        {/* Toolbar + table */}
        <Card variant="outlined" padding="none">
          <Card.Header
            divider
            style={{
              padding: 'var(--tatva-space-3) var(--tatva-space-4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--tatva-space-3)',
              flexWrap: 'wrap',
            }}
          >
            <Tabs
              value={statusTab}
              onChange={(v) => setStatusTab(v as typeof statusTab)}
            >
              <Tabs.List aria-label="Filter by status">
                <Tabs.Tab value="Active">Active</Tabs.Tab>
                <Tabs.Tab value="Invited">Invited</Tabs.Tab>
                <Tabs.Tab value="Archived">Archived</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <SearchInput
              label=""
              placeholder="Search members…"
              onSearch={setQuery}
              debounceMs={200}
            />
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            <DataTable<Row>
              columns={cols}
              data={filtered}
              selectable
              sortable
              pagination
              pageSize={10}
            />
          </Card.Body>
        </Card>
      </Stack>
    </div>
  );
}
