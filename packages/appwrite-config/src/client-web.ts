import { Client, Account } from 'appwrite';

export const createWebClient = (endpoint: string, projectId: string) => {
    const client = new Client().setEndpoint(endpoint).setProject(projectId);

    return {
        client,
        account: new Account(client),
    };
};
