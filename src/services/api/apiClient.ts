import axios from 'axios';

import { env } from '@/config/env';

// Shared HTTP client abstraction: UI components should consume feature services, not axios directly.
/**
 * HTTP client instance configured for API communication.
 *
 * @remarks
 * This axios instance is pre-configured with sensible defaults for the application's API requests.
 *
 * @example
 * ```typescript
 * const response = await apiClient.get('/users');
 * ```
 *
 * @configuration
 * - **baseURL**: Dynamically set from environment variables, undefined if not configured
 * - **timeout**: 15000ms (15 seconds) - request timeout duration
 * - **headers**: Default JSON content-type header for all requests
 */
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
