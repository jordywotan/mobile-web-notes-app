import { create } from 'zustand';

import type { AuthSession, AuthUser } from '@/types/auth';

type AuthStoreState = {
    session: AuthSession;
    user: AuthUser;
    isLoading: boolean;
    isBootstrapped: boolean;
};

type AuthStoreActions = {
    setSession: (session: AuthSession) => void;
    setUser: (user: AuthUser) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsBootstrapped: (isBootstrapped: boolean) => void;
    reset: () => void;
};

export type AuthStore = AuthStoreState & AuthStoreActions;

// Client-side auth session state only. Keep server data queries in services/query layer.
const initialState: AuthStoreState = {
    session: null,
    user: null,
    isLoading: false,
    isBootstrapped: false,
};

// The subset of state cleared on sign-out.
// isBootstrapped is intentionally excluded — it is a one-time app lifecycle
// flag that must never reset to false after the initial auth check completes.
const resetableState = {
    session: initialState.session,
    user: initialState.user,
    isLoading: initialState.isLoading,
} as const;

export const useAuthStore = create<AuthStore>((set) => ({
    ...initialState,
    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setIsBootstrapped: (isBootstrapped) => set({ isBootstrapped }),
    reset: () => set(resetableState),
}));
