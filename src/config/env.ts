const appwriteEndpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? '';
const appwriteProjectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? '';
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

export const env = {
  appwriteEndpoint,
  appwriteProjectId,
  apiBaseUrl,
} as const;

export const isAppwriteConfigured =
  env.appwriteEndpoint.length > 0 && env.appwriteProjectId.length > 0;
