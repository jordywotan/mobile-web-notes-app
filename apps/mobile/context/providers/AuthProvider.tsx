import { createContext, useContext, useState, useEffect } from 'react';
import { Account, ID } from 'react-native-appwrite';

interface AuthContextType {
    account: Account | null;
    user: object | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<any>;
    logout: () => Promise<any>;
    registerAccount: (name: string, email: string, pass: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
    account: null,
    user: null,
    isLoading: true,
    login: async () => {},
    logout: async () => {},
    registerAccount: async () => {},
});

interface AuthProviderProps {
    account: Account;
    children: React.ReactNode;
    segments: string[];
    replace: (href: any) => void;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ account, children, segments, replace }: AuthProviderProps) => {
    const [user, setUser] = useState<object | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch current user
    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                setUser(session);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, [account]);

    // Route guards
    useEffect(() => {
        if (isLoading || segments.length === 0) return;

        const inAuthRoute = segments.includes('auth');

        if (!user && !inAuthRoute) {
            replace('/auth');
        } else if (user && inAuthRoute) {
            replace('/');
        }
    }, [user, isLoading, segments, replace]);

    const login = async (email: string, pass: string) => {
        await account.createEmailPasswordSession({
            email,
            password: pass,
        });

        const session = await account.get();
        setUser(session);
    };

    const logout = async () => {
        await account.deleteSession({
            sessionId: 'current',
        });
        setUser(null);
    };

    const registerAccount = async (name: string, email: string, pass: string) => {
        await account.create({
            userId: ID.unique(),
            name,
            email,
            password: pass,
        });

        await account.createEmailPasswordSession({
            email,
            password: pass,
        });

        const session = await account.get();
        setUser(session);
    };

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ account, user, isLoading, login, logout, registerAccount }}>
            {children}
        </AuthContext.Provider>
    );
};
