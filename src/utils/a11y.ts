import axe, { type AxeResults, type Result } from 'axe-core';

/**
 * Run axe-core against a container and return violations.
 * Intended for tests. Non-zero violation count means an a11y issue.
 */
export async function checkA11y(container: HTMLElement): Promise<Result[]> {
  const results: AxeResults = await axe.run(container, {
    rules: {
      // Color-contrast checks flake in jsdom (no real layout/paint).
      'color-contrast': { enabled: false },
    },
  });
  return results.violations;
}

/** Assert-style helper that throws with a readable message on violations. */
export async function expectNoA11yViolations(
  container: HTMLElement,
): Promise<void> {
  const violations = await checkA11y(container);
  if (violations.length > 0) {
    const summary = violations
      .map((v) => `- [${v.id}] ${v.help} (${v.nodes.length} node(s))`)
      .join('\n');
    throw new Error(`A11y violations found:\n${summary}`);
  }
}

/** Generate a stable-ish id for input/label wiring when consumer doesn't provide one. */
let idCounter = 0;
export function generateId(prefix = 'tatva'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
