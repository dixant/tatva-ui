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
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
  });

  it('aria-describedby wires helper and error', () => {
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
});
