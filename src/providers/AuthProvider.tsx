import {
    createContext,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from 'react';

import { authService } from '@/services/appwrite/authService';
import { useAuthStore } from '@/store/authStore';
import type { SignInPayload, SignUpPayload } from '@/types/auth';

type AuthContextValue = {
    user: ReturnType<typeof useAuthStore.getState>['user'];
    session: ReturnType<typeof useAuthStore.getState>['session'];
    isLoading: boolean;
    signIn: (payload: SignInPayload) => Promise<void>;
    signUp: (payload: SignUpPayload) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const session = useAuthStore((state) => state.session);
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    const setSession = useAuthStore((state) => state.setSession);
    const setUser = useAuthStore((state) => state.setUser);
    const setIsLoading = useAuthStore((state) => state.setIsLoading);
    const setIsBootstrapped = useAuthStore((state) => state.setIsBootstrapped);
    const reset = useAuthStore((state) => state.reset);

    const bootstrapAuth = useCallback(async () => {
        setIsLoading(true);

        try {
            const currentSession = await authService.getCurrentSession();

            if (!currentSession) {
                reset();
                return;
            }

            const currentUser = await authService.getCurrentUser();
            setSession(currentSession);
            setUser(currentUser);
        } finally {
            setIsLoading(false);
            setIsBootstrapped(true);
        }
    }, [reset, setIsBootstrapped, setIsLoading, setSession, setUser]);

    useEffect(() => {
        bootstrapAuth();
    }, [bootstrapAuth]);

    const signIn = useCallback(
        async (payload: SignInPayload) => {
            setIsLoading(true);

            try {
                const nextSession = await authService.signIn(payload);
                const nextUser = await authService.getCurrentUser();
                setSession(nextSession);
                setUser(nextUser);
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setSession, setUser],
    );

    const signUp = useCallback(
        async (payload: SignUpPayload) => {
            setIsLoading(true);

            try {
                const nextSession = await authService.signUp(payload);
                const nextUser = await authService.getCurrentUser();
                setSession(nextSession);
                setUser(nextUser);
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setSession, setUser],
    );

    const signOut = useCallback(async () => {
        setIsLoading(true);

        try {
            await authService.signOut();
            reset();
        } finally {
            setIsLoading(false);
            setIsBootstrapped(true);
        }
    }, [reset, setIsBootstrapped, setIsLoading]);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            session,
            isLoading,
            signIn,
            signUp,
            signOut,
        }),
        [isLoading, session, signIn, signOut, signUp, user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }

    return context;
}
