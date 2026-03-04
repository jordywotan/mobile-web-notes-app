import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '@/store/authStore';

export function useAuthSession() {
    return useAuthStore((state) => state.session);
}

export function useAuthUser() {
    return useAuthStore((state) => state.user);
}

/**
 * Hook that retrieves the authentication status from the auth store.
 *
 * Uses shallow comparison to prevent unnecessary re-renders by only comparing
 * the returned object properties rather than the entire store state.
 *
 * @returns {Object} An object containing:
 * @returns {boolean} isLoading - Indicates whether an authentication operation is in progress
 * @returns {boolean} isBootstrapped - Indicates whether the authentication store has been initialized
 *
 * @example
 * ```tsx
 * const { isLoading, isBootstrapped } = useAuthStatus();
 *
 * if (!isBootstrapped) {
 *   return <LoadingSpinner />;
 * }
 *
 * return <App />;
 * ```
 */
export function useAuthStatus() {
    return useAuthStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            isBootstrapped: state.isBootstrapped,
        })),
    );
}
