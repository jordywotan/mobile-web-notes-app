const appwriteEndpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? '';
const appwriteProjectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? '';
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

export const env = {
    appwriteEndpoint,
    appwriteProjectId,
    apiBaseUrl,
} as const;

/**
 * Determines whether Appwrite is properly configured.
 *
 * @constant
 * @type {boolean}
 * @returns {boolean} `true` if both the Appwrite endpoint and project ID are configured (non-empty strings), `false` otherwise.
 *
 * @example
 * if (isAppwriteConfigured) {
 *   // Initialize Appwrite client
 * }
 */
export const isAppwriteConfigured =
    env.appwriteEndpoint.length > 0 && env.appwriteProjectId.length > 0;
