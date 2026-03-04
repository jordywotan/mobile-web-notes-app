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

export const useAuthStore = create<AuthStore>((set) => ({
    ...initialState,
    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setIsBootstrapped: (isBootstrapped) => set({ isBootstrapped }),
    reset: () => set(initialState),
}));
