import React, { createContext, useContext, useState } from 'react';
import api from '../../services/api';

import {
  AuthContextData,
  AuthProviderProps,
  SignInCredentials,
  User,
} from './types';

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User>({} as User);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    setUser({} as User);
  };

  const providerValues = {
    signIn,
    signOut,
    user,
  };

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
