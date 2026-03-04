import { AppwriteException, ID } from 'appwrite';

import { appwriteAccount, assertAppwriteConfigured } from './appwriteClient';

import { isAppwriteConfigured } from '@/config/env';
import type { AuthSession, AuthUser, SignInPayload, SignUpPayload } from '@/types/auth';

/**
 * Retrieves the current user session from Appwrite.
 *
 * @returns {Promise<AuthSession>} A promise that resolves to the current session object,
 *                                  or null if Appwrite is not configured or the session is unauthorized.
 * @throws {AppwriteException} Throws an AppwriteException if an error occurs other than a 401 Unauthorized error.
 *
 * @remarks
 * - Returns null if Appwrite is not configured
 * - Returns null if a 401 Unauthorized error is encountered (session expired/invalid)
 * - Re-throws any other errors that occur during the session retrieval
 */
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
