import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable, type DataTableColumn } from './DataTable';

type Row = { id: number; name: string; age: number };
const rows: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Carol', age: 35 },
];
const cols: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
];

describe('DataTable', () => {
  it('renders rows from data', () => {
    render(<DataTable columns={cols} data={rows} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('sorts on column click', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={cols} data={rows} />);
    await user.click(screen.getByRole('button', { name: /Age/ }));
    const bodyRows = screen.getAllByTestId('tatva-datatable-row');
    // Ascending: Bob(25), Alice(30), Carol(35)
    expect(bodyRows[0]).toHaveTextContent('Bob');
  });

  it('aria-sort updates', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={cols} data={rows} />);
    const ageHeader = screen.getByRole('columnheader', { name: /Age/ });
    expect(ageHeader).toHaveAttribute('aria-sort', 'none');
    await user.click(screen.getByRole('button', { name: /Age/ }));
    expect(ageHeader).toHaveAttribute('aria-sort', 'ascending');
  });

  it('selectable rows fire onSelectionChange', async () => {
    const user = userEvent.setup();
    const onSel = vi.fn();
    render(
      <DataTable columns={cols} data={rows} selectable onSelectionChange={onSel} />,
    );
    await user.click(screen.getByLabelText('Select row 1'));
    expect(onSel).toHaveBeenLastCalledWith([rows[0]]);
  });

  it('select all toggles all rows on page', async () => {
    const user = userEvent.setup();
    const onSel = vi.fn();
    render(
      <DataTable columns={cols} data={rows} selectable onSelectionChange={onSel} />,
    );
    await user.click(screen.getByLabelText('Select all rows'));
    expect(onSel).toHaveBeenLastCalledWith(rows);
  });

  it('shows skeletons when loading', () => {
    render(<DataTable columns={cols} data={[]} loading />);
    // Skeleton cells inside tbody
    expect(screen.getAllByTestId('tatva-skeleton').length).toBeGreaterThan(0);
  });

  it('shows empty state', () => {
    render(<DataTable columns={cols} data={[]} emptyState="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders pagination when data > pageSize', () => {
    const many = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      name: `n${i}`,
      age: i,
    }));
    render(<DataTable columns={cols} data={many} pagination pageSize={10} />);
    expect(screen.getByTestId('tatva-pagination')).toBeInTheDocument();
  });

  it('custom cell renderer works', () => {
    const renderCols: DataTableColumn<Row>[] = [
      { key: 'name', header: 'Name' },
      { key: 'age', header: 'Age', render: (v) => `${v}yo` },
    ];
    render(<DataTable columns={renderCols} data={[rows[0]]} />);
    expect(screen.getByText('30yo')).toBeInTheDocument();
  });
});
