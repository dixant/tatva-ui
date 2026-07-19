import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme applied on mount. Defaults to `light`. */
  defaultTheme?: Theme;
  /** If set, theme is persisted to localStorage under this key. */
  storageKey?: string;
  /**
   * When true (default) and no defaultTheme/storage value, use
   * prefers-color-scheme: dark as the initial theme.
   */
  respectSystemPreference?: boolean;
}

function readInitialTheme(
  defaultTheme: Theme,
  storageKey: string | undefined,
  respectSystemPreference: boolean,
): Theme {
  if (typeof window === 'undefined') return defaultTheme;
  if (storageKey) {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) return stored as Theme;
    } catch {
      // localStorage unavailable — ignore.
    }
  }
  if (
    respectSystemPreference &&
    defaultTheme === 'light' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return defaultTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey,
  respectSystemPreference = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readInitialTheme(defaultTheme, storageKey, respectSystemPreference),
  );

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          // ignore
        }
      }
    },
    [storageKey],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Apply theme to the document root.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
