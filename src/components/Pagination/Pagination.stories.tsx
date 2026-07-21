import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Pagination>;

function Controlled({ total }: { total: number }) {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Pagination totalPages={total} currentPage={page} onChange={setPage} />
      <span>
        Page {page} of {total}
      </span>
    </div>
  );
}

export const Default: Story = { render: () => <Controlled total={5} /> };
export const ManyPages: Story = { render: () => <Controlled total={30} /> };
export const FirstPage: Story = {
  render: () => (
    <Pagination totalPages={10} currentPage={1} onChange={() => {}} />
  ),
};
export const LastPage: Story = {
  render: () => (
    <Pagination totalPages={10} currentPage={10} onChange={() => {}} />
  ),
};
