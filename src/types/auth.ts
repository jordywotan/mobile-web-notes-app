import type { Models } from 'appwrite';

export type AuthSession = Models.Session | null;
export type AuthUser = Models.User<Models.Preferences> | null;

export type SignInPayload = {
    email: string;
    password: string;
};

/**
 * Payload object for user sign-up operations.
 *
 * @typedef {Object} SignUpPayload
 * @property {string} email - The user's email address used for account creation and authentication.
 * @property {string} password - The user's password for securing the account.
 * @property {string} name - The user's full name or display name.
 */
export type SignUpPayload = {
    email: string;
    password: string;
    name: string;
};
