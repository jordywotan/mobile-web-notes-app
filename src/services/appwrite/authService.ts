import { AppwriteException, ID } from 'appwrite';

import { appwriteAccount, assertAppwriteConfigured } from './appwriteClient';

import { isAppwriteConfigured } from '@/config/env';
import type { AuthSession, AuthUser, SignInPayload, SignUpPayload } from '@/types/auth';

async function getCurrentSession(): Promise<AuthSession> {
    if (!isAppwriteConfigured) {
        return null;
    }

    try {
        return await appwriteAccount.getSession({ sessionId: 'current' });
    } catch (error) {
        if (error instanceof AppwriteException && error.code === 401) {
            return null;
        }

        throw error;
    }
}

async function getCurrentUser(): Promise<AuthUser> {
    if (!isAppwriteConfigured) {
        return null;
    }

    try {
        return await appwriteAccount.get();
    } catch (error) {
        if (error instanceof AppwriteException && error.code === 401) {
            return null;
        }

        throw error;
    }
}

async function signIn(payload: SignInPayload): Promise<AuthSession> {
    assertAppwriteConfigured();

    return appwriteAccount.createEmailPasswordSession({
        email: payload.email,
        password: payload.password,
    });
}

async function signUp(payload: SignUpPayload): Promise<AuthSession> {
    assertAppwriteConfigured();

    await appwriteAccount.create({
        userId: ID.unique(),
        email: payload.email,
        password: payload.password,
        name: payload.name,
    });

    return signIn({ email: payload.email, password: payload.password });
}

async function signOut(): Promise<void> {
    try {
        assertAppwriteConfigured();
        await appwriteAccount.deleteSession({ sessionId: 'current' });
    } catch (error) {
        if (error instanceof AppwriteException && error.code === 401) {
            return;
        }

        throw error;
    }
}

export const authService = {
    getCurrentSession,
    getCurrentUser,
    signIn,
    signUp,
    signOut,
};
