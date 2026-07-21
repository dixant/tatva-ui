import { cn } from '../../utils/cn';
import styles from './Pagination.module.css';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  /** Pages to show on each side of currentPage. */
  siblingCount?: number;
  className?: string;
  'aria-label'?: string;
}

function paginationRange(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): (number | 'left-ellipsis' | 'right-ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 5; // firstPage + lastPage + currentPage + 2*ellipsis + 2*siblings
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const first = 1;
  const last = totalPages;

  const items: (number | 'left-ellipsis' | 'right-ellipsis')[] = [first];
  if (showLeftEllipsis) items.push('left-ellipsis');
  for (
    let i = showLeftEllipsis ? leftSibling : 2;
    i <= (showRightEllipsis ? rightSibling : totalPages - 1);
    i++
  ) {
    items.push(i);
  }
  if (showRightEllipsis) items.push('right-ellipsis');
  items.push(last);
  return items;
}

export function Pagination({
  totalPages,
  currentPage,
  onChange,
  siblingCount = 1,
  className,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps) {
  const items = paginationRange(totalPages, currentPage, siblingCount);
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(styles.nav, className)}
      data-testid="tatva-pagination"
    >
      <button
        type="button"
        className={styles.btn}
        disabled={!canPrev}
        aria-label="Previous page"
        onClick={() => canPrev && onChange(currentPage - 1)}
      >
        ‹
      </button>
      {items.map((item, i) => {
        if (item === 'left-ellipsis' || item === 'right-ellipsis') {
          return (
            <span
              key={`${item}-${i}`}
              className={styles.ellipsis}
              aria-hidden="true"
            >
              …
            </span>
          );
        }
        const isCurrent = item === currentPage;
        return (
          <button
            key={item}
            type="button"
            className={cn(styles.btn, isCurrent && styles.current)}
            aria-current={isCurrent ? 'page' : undefined}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        type="button"
        className={styles.btn}
        disabled={!canNext}
        aria-label="Next page"
        onClick={() => canNext && onChange(currentPage + 1)}
      >
        ›
      </button>
    </nav>
  );
}
