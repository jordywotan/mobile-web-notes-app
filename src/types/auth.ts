import type { Models } from 'appwrite';

export type AuthSession = Models.Session | null;
export type AuthUser = Models.User<Models.Preferences> | null;

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  name: string;
};
