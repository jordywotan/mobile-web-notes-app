import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '@/store';

export function useAuthSession() {
  return useAuthStore((state) => state.session);
}

export function useAuthUser() {
  return useAuthStore((state) => state.user);
}

export function useAuthStatus() {
  return useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      isBootstrapped: state.isBootstrapped,
    })),
  );
}
