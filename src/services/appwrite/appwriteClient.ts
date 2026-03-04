import { Account, Client } from 'appwrite';

import { env, isAppwriteConfigured } from '@/config/env';

const client = new Client();

if (isAppwriteConfigured) {
    client.setEndpoint(env.appwriteEndpoint).setProject(env.appwriteProjectId);
}

export const appwriteClient = client;
export const appwriteAccount = new Account(appwriteClient);

/**
 * Asserts that the Appwrite configuration is properly set up.
 *
 * @throws {Error} Throws an error if Appwrite is not configured with the required environment variables.
 * The error message indicates that `EXPO_PUBLIC_APPWRITE_ENDPOINT` and `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
 * must be set in the `.env` file.
 *
 * @example
 * ```typescript
 * assertAppwriteConfigured(); // Throws if config is missing
 * ```
 */
export function assertAppwriteConfigured() {
    if (!isAppwriteConfigured) {
        throw new Error(
            'Appwrite config missing. Set EXPO_PUBLIC_APPWRITE_ENDPOINT and EXPO_PUBLIC_APPWRITE_PROJECT_ID in .env.',
        );
    }
}
