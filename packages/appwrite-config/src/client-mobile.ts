import { Client } from 'react-native-appwrite';

export const createMobileClient = (endpoint: string, projectId: string, platform: string) => {
    return new Client().setEndpoint(endpoint).setProject(projectId).setPlatform(platform);
};
