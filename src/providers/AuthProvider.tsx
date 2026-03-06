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

    const bootstrapAuth = useCallback(async () => {
        const { setIsLoading, setIsBootstrapped, setSession, setUser, reset } =
            useAuthStore.getState();
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
    }, []);

    useEffect(() => {
        void bootstrapAuth().catch(console.error);
    }, [bootstrapAuth]);

    const signIn = useCallback(async (payload: SignInPayload) => {
        const { setIsLoading, setSession, setUser } = useAuthStore.getState();
        setIsLoading(true);

        try {
            const nextSession = await authService.signIn(payload);
            const nextUser = await authService.getCurrentUser();
            setSession(nextSession);
            setUser(nextUser);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signUp = useCallback(async (payload: SignUpPayload) => {
        const { setIsLoading, setSession, setUser } = useAuthStore.getState();
        setIsLoading(true);

        try {
            const nextSession = await authService.signUp(payload);
            const nextUser = await authService.getCurrentUser();
            setSession(nextSession);
            setUser(nextUser);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        const { setIsLoading, reset } = useAuthStore.getState();
        setIsLoading(true);

        try {
            await authService.signOut();
            reset();
        } finally {
            setIsLoading(false);
        }
    }, []);

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
