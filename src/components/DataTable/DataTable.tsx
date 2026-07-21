import { useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './DataTable.module.css';
import { Skeleton } from '../Skeleton';
import { Checkbox } from '../Checkbox';
import { Pagination } from '../Pagination';

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  data: T[];
  selectable?: boolean;
  onSelectionChange?: (rows: T[]) => void;
  sortable?: boolean;
  onSort?: (info: { key: string; direction: SortDirection }) => void;
  loading?: boolean;
  emptyState?: ReactNode;
  pagination?: boolean;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  stickyHeader?: boolean;
  className?: string;
  /** Optional row key extractor. Falls back to `id` field, otherwise row index. */
  rowKey?: (row: T, index: number) => string | number;
  'aria-label'?: string;
}

function defaultKey<T extends Record<string, unknown>>(row: T, i: number) {
  const id = row['id'];
  if (typeof id === 'string' || typeof id === 'number') return id;
  return i;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  onSelectionChange,
  sortable = false,
  onSort,
  loading = false,
  emptyState,
  pagination = false,
  pageSize = 10,
  onPageChange,
  stickyHeader = false,
  className,
  rowKey,
  'aria-label': ariaLabel = 'Data table',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [page, setPage] = useState(1);

  const getKey = rowKey ?? defaultKey;

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    const arr = [...data];
    arr.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [data, sortKey, sortDir]);

  const paginated = useMemo(() => {
    if (!pagination) return sorted;
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, pagination, page, pageSize]);

  const totalPages = pagination
    ? Math.max(1, Math.ceil(sorted.length / pageSize))
    : 1;

  const handleSort = (key: string) => {
    let nextDir: SortDirection;
    if (sortKey !== key) {
      nextDir = 'asc';
    } else if (sortDir === 'asc') {
      nextDir = 'desc';
    } else if (sortDir === 'desc') {
      nextDir = null;
    } else {
      nextDir = 'asc';
    }
    setSortKey(nextDir ? key : null);
    setSortDir(nextDir);
    onSort?.({ key, direction: nextDir });
  };

  const notifySelection = (next: Set<string | number>) => {
    setSelected(next);
    const rows = data.filter((r, i) => next.has(getKey(r, i)));
    onSelectionChange?.(rows);
  };

  const toggleRow = (row: T, index: number) => {
    const key = getKey(row, index);
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    notifySelection(next);
  };

  const allSelectedOnPage = paginated.every((r, i) =>
    selected.has(getKey(r, i)),
  );
  const someSelectedOnPage =
    !allSelectedOnPage && paginated.some((r, i) => selected.has(getKey(r, i)));

  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelectedOnPage) {
      paginated.forEach((r, i) => next.delete(getKey(r, i)));
    } else {
      paginated.forEach((r, i) => next.add(getKey(r, i)));
    }
    notifySelection(next);
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.scroll}>
        <table
          className={cn(styles.table, stickyHeader && styles.sticky)}
          aria-label={ariaLabel}
          data-testid="tatva-datatable"
        >
          <thead>
            <tr>
              {selectable && (
                <th className={styles.checkboxCell} scope="col">
                  <Checkbox
                    label=""
                    aria-label="Select all rows"
                    checked={paginated.length > 0 && allSelectedOnPage}
                    indeterminate={someSelectedOnPage}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sortKey === col.key && sortDir;
                const canSort = sortable || col.sortable;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{ width: col.width, textAlign: col.align ?? 'left' }}
                    aria-sort={
                      isSorted
                        ? sortDir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                    className={styles.th}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        className={styles.sortBtn}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.header}
                        <span aria-hidden="true" className={styles.sortIcon}>
                          {isSorted ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {selectable && (
                    <td className={styles.checkboxCell}>
                      <Skeleton width={16} height={16} />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      <Skeleton width="80%" height={14} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={styles.empty}
                >
                  {emptyState ?? 'No data'}
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => {
                const key = getKey(row, i);
                const isSelected = selected.has(key);
                return (
                  <tr
                    key={key}
                    className={cn(isSelected && styles.selectedRow)}
                    data-testid="tatva-datatable-row"
                  >
                    {selectable && (
                      <td className={styles.checkboxCell}>
                        <Checkbox
                          label=""
                          aria-label={`Select row ${key}`}
                          checked={isSelected}
                          onChange={() => toggleRow(row, i)}
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const val = row[col.key];
                      return (
                        <td
                          key={col.key}
                          className={styles.td}
                          style={{ textAlign: col.align ?? 'left' }}
                        >
                          {col.render
                            ? col.render(val, row)
                            : ((val as ReactNode) ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && totalPages > 1 && (
        <div className={styles.footer}>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onChange={(p) => {
              setPage(p);
              onPageChange?.(p);
            }}
          />
        </div>
      )}
    </div>
  );
}
