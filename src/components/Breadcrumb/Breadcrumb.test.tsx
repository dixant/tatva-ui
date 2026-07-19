import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders nav with aria-label', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Docs</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('last item is marked aria-current=page', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
        <Breadcrumb.Item>Guide</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(screen.getByText('Guide')).toHaveAttribute('aria-current', 'page');
  });

  it('non-last items are links', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Docs</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('supports custom separator', () => {
    render(
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Docs</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(screen.getByText('>')).toBeInTheDocument();
  });
});
