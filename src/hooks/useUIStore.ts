import { useThemeContext } from '@/providers/ThemeProvider';
import { useUIStore } from '@/store/uiStore';

/**
 * Hook that retrieves the current theme preference from the UI store.
 * @returns {string} The current theme setting (e.g., 'light', 'dark', 'auto')
 * @example
 * const theme = useThemePreference();
 * console.log(theme); // 'dark'
 */
export function useThemePreference() {
    return useUIStore((state) => state.theme);
}

export function useResolvedTheme() {
    return useThemeContext().resolvedTheme;
}
