import { useThemeContext } from '@/providers/ThemeProvider';
import { useUIStore } from '@/store';

export function useThemePreference() {
  return useUIStore((state) => state.theme);
}

export function useResolvedTheme() {
  return useThemeContext().resolvedTheme;
}
