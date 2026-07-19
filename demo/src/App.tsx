import { useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  DataTable,
  EmptyState,
  Icon,
  Input,
  Modal,
  SearchInput,
  Select,
  Stack,
  Tabs,
  Toggle,
  Typography,
  useTheme,
  useToast,
  type DataTableColumn,
} from '@dixant/tatva-ui';
import { mockUsers, type User } from './mockUsers';

const ROLES = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' },
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid var(--tatva-color-border)',
        background: 'var(--tatva-color-bg)',
      }}
    >
      <Stack direction="horizontal" gap="3" align="center">
        <Avatar name="Tatva UI" size="md" />
        <Typography variant="h4">Tatva UI — Demo</Typography>
      </Stack>
      <Toggle
        label={theme === 'dark' ? 'Dark' : 'Light'}
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
    </div>
  );
}

export function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'Active' | 'Archived'>('Active');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selected, setSelected] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  // Add-user form state
  const [form, setForm] = useState<{
    name: string;
    email: string;
    role: string;
    notify: boolean;
  }>({ name: '', email: '', role: 'Viewer', notify: true });

  const { toast } = useToast();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.status === status &&
        (q === '' || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)),
    );
  }, [users, query, status]);

  const cols: DataTableColumn<User>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (_, row) => (
        <Stack direction="horizontal" gap="2" align="center">
          <Avatar name={row.name} size="sm" />
          <span>{row.name}</span>
        </Stack>
      ),
    },
    { key: 'email', header: 'Email' },
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

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Name and email are required.',
        variant: 'error',
      });
      return;
    }
    const nextId = Math.max(...users.map((u) => u.id)) + 1;
    setUsers((prev) => [
      ...prev,
      {
        id: nextId,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role as User['role'],
        status: 'Active',
        joined: new Date().toISOString().slice(0, 10),
      },
    ]);
    setForm({ name: '', email: '', role: 'Viewer', notify: true });
    setOpen(false);
    toast({
      title: 'User added',
      description: form.notify
        ? `${form.name} was invited via email.`
        : `${form.name} was added silently.`,
      variant: 'success',
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ padding: 24, flex: 1 }}>
        <Stack gap="4">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
          </Breadcrumb>

          <Stack direction="horizontal" justify="between" align="center" wrap>
            <Typography variant="h2">User Management</Typography>
            <Stack direction="horizontal" gap="2" align="center">
              <SearchInput
                label="Search"
                placeholder="Search users…"
                onSearch={setQuery}
                debounceMs={200}
              />
              <Button
                leftIcon={<Icon name="plus" size="sm" />}
                onClick={() => setOpen(true)}
              >
                Add user
              </Button>
            </Stack>
          </Stack>

          {selected.length > 0 && (
            <Alert variant="info" title={`${selected.length} selected`}>
              You can archive or delete the selected users.
            </Alert>
          )}

          <Card variant="outlined" padding="none">
            <Card.Header divider style={{ padding: 16 }}>
              <Tabs
                value={status}
                onChange={(v) => setStatus(v as 'Active' | 'Archived')}
              >
                <Tabs.List aria-label="User status">
                  <Tabs.Tab value="Active">Active</Tabs.Tab>
                  <Tabs.Tab value="Archived">Archived</Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Card.Header>
            <Card.Body style={{ padding: 0 }}>
              <DataTable<User>
                columns={cols}
                data={filtered}
                selectable
                sortable
                pagination
                pageSize={10}
                onSelectionChange={setSelected}
                emptyState={
                  <EmptyState
                    icon={<Icon name="search" size="xl" />}
                    title="No users match"
                    description="Try a different search or switch tabs."
                  />
                }
              />
            </Card.Body>
          </Card>
        </Stack>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add user" size="sm">
        <Modal.Body>
          <Stack gap="3">
            <Input
              label="Name"
              placeholder="Ada Lovelace"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="ada@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Select
              label="Role"
              options={ROLES}
              value={form.role}
              onChange={(v) => setForm({ ...form, role: v })}
            />
            <Checkbox
              label="Send invite email"
              defaultChecked={form.notify}
              onChange={(v) => setForm({ ...form, notify: v })}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Add user</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
