import { ReactNode } from 'react';

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
};

export type User = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthState = {
  user: User;
  token: string;
};
