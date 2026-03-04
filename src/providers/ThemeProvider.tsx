import { colorScheme } from 'nativewind';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { useUIStore } from '@/store';
import type { ThemeMode } from '@/store/uiStore';

type ThemeContextValue = {
  themePreference: ThemeMode;
  resolvedTheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const themePreference = useUIStore((state) => state.theme);
  const systemTheme = useColorScheme();

  const resolvedTheme =
    themePreference === 'auto' ? (systemTheme === 'dark' ? 'dark' : 'light') : themePreference;

  useEffect(() => {
    colorScheme.set(resolvedTheme);
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      themePreference,
      resolvedTheme,
    }),
    [resolvedTheme, themePreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }

  return context;
}
