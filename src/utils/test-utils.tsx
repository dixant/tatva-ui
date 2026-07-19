import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '../themes/ThemeProvider';

interface WrapperProps {
  children: ReactNode;
}

function AllProviders({ children }: WrapperProps) {
  return <ThemeProvider defaultTheme="light">{children}</ThemeProvider>;
}

/**
 * Render helper that wraps components with the default Tatva providers.
 * Use anywhere consumer-visible providers matter.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return render(ui, { wrapper: AllProviders, ...options });
}
