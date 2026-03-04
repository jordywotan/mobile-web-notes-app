import axios from 'axios';

import { env } from '@/config/env';

// Shared HTTP client abstraction: UI components should consume feature services, not axios directly.
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
