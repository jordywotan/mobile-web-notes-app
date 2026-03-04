import { Account, Client } from 'appwrite';

import { env, isAppwriteConfigured } from '@/config/env';

const client = new Client();

if (isAppwriteConfigured) {
  client.setEndpoint(env.appwriteEndpoint).setProject(env.appwriteProjectId);
}

export const appwriteClient = client;
export const appwriteAccount = new Account(appwriteClient);

export function assertAppwriteConfigured() {
  if (!isAppwriteConfigured) {
    throw new Error(
      'Appwrite config missing. Set EXPO_PUBLIC_APPWRITE_ENDPOINT and EXPO_PUBLIC_APPWRITE_PROJECT_ID in .env.',
    );
  }
}
