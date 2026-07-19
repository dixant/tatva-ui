/**
 * Cross-cutting a11y checks: render a few representative components under
 * axe-core and assert zero violations. Color-contrast is disabled by
 * checkA11y() because jsdom has no real layout.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { checkA11y } from '../../utils/a11y';
import { Button } from '../Button';
import { Input } from '../Input';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Alert } from '../Alert';
import { Modal } from '../Modal';
import { Select } from '../Select';
import { Tabs } from '../Tabs';

describe('a11y (axe-core)', () => {
  it('Button variants', async () => {
    const { container } = render(
      <div>
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive" disabled>
          Destructive
        </Button>
      </div>,
    );
    expect(await checkA11y(container)).toEqual([]);
  });

  it('Input with helper + error', async () => {
    const { container } = render(
      <>
        <Input label="Email" helperText="Your work email" />
        <Input label="Password" error="Too short" />
      </>,
    );
    expect(await checkA11y(container)).toEqual([]);
  });

  it('Checkbox + group', async () => {
    const { container } = render(
      <CheckboxGroup value={[]} onChange={() => {}} label="Fruits">
        <Checkbox label="Apple" value="apple" />
        <Checkbox label="Banana" value="banana" />
      </CheckboxGroup>,
    );
    expect(await checkA11y(container)).toEqual([]);
  });

  it('Alert variants', async () => {
    const { container } = render(
      <>
        <Alert variant="info" title="i">msg</Alert>
        <Alert variant="error" title="e">msg</Alert>
      </>,
    );
    expect(await checkA11y(container)).toEqual([]);
  });

  it('Modal open state', async () => {
    render(
      <Modal open onClose={() => {}} title="Test">
        <Modal.Body>Body</Modal.Body>
      </Modal>,
    );
    // The modal renders into document.body via portal.
    expect(await checkA11y(document.body)).toEqual([]);
  });

  it('Select basic', async () => {
    const { container } = render(
      <Select
        label="Fruit"
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />,
    );
    expect(await checkA11y(container)).toEqual([]);
  });

  it('Tabs', async () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <Tabs.List aria-label="Sections">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a">A body</Tabs.Panel>
        <Tabs.Panel value="b">B body</Tabs.Panel>
      </Tabs>,
    );
    expect(await checkA11y(container)).toEqual([]);
  });
});
