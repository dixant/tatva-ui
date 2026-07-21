import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('links label to child input', () => {
    render(
      <FormField label="Name">
        <input />
      </FormField>,
    );
    expect(screen.getByLabelText('Name').tagName).toBe('INPUT');
  });

  it('shows error with role alert', () => {
    render(
      <FormField label="Name" error="Required">
        <input />
      </FormField>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('sets aria-invalid on child', () => {
    render(
      <FormField label="Name" error="Bad">
        <input />
      </FormField>,
    );
    expect(screen.getByLabelText('Name')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('aria-describedby links helper text', () => {
    render(
      <FormField label="Name" htmlFor="n1" helperText="Hint">
        <input />
      </FormField>,
    );
    expect(screen.getByLabelText('Name')).toHaveAttribute(
      'aria-describedby',
      'n1-helper',
    );
  });

  it('aria-describedby links error over helper', () => {
    render(
      <FormField label="Name" htmlFor="n1" helperText="Hint" error="Bad">
        <input />
      </FormField>,
    );
    expect(screen.getByLabelText('Name')).toHaveAttribute(
      'aria-describedby',
      'n1-error',
    );
  });

  it('shows required marker', () => {
    render(
      <FormField label="Name" required>
        <input />
      </FormField>,
    );
    expect(screen.getByText('*', { exact: false })).toBeInTheDocument();
  });

  it('respects existing id on child', () => {
    render(
      <FormField label="Name">
        <input id="existing" />
      </FormField>,
    );
    expect(screen.getByLabelText('Name').id).toBeTruthy();
  });

  it('helper text alone (no error)', () => {
    render(
      <FormField label="Name" helperText="Hi">
        <input />
      </FormField>,
    );
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
