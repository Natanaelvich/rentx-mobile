import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  AuthContextData,
  AuthProviderProps,
  AuthState,
  SignInCredentials,
  User,
} from './types';
import { database } from '../../databases';
import { User as ModelUser } from '../../databases/model/User';
import api from '../../services/api';

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [userData, setUserData] = useState<User>({} as User);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await api.post<AuthState>('/sessions', {
        email,
        password,
      });
      const { user, token } = data;
      api.defaults.headers.authorization = `Bearer ${token}`;
      // const userFormatted = {}
      // Object.assign(userFormatted, {
      //   ...user,
      //   user_id: user.id,
      //   token,
      // })
      // console.log(userFormatted)
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      // await database.action(async () => {
      //   await userCollection.create(newUser => {
      //     Object.assign(newUser, {
      //       ...user,
      //       user_id: user.id,
      //       token,
      //     })
      //   })
      // })

      setUserData({ ...user, token });
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    setUserData({} as User);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection = database.get<ModelUser>('users');
      const users = await userCollection.query().fetch();
      if (users.length > 0) {
        const userDataDB = users[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userDataDB.token}`;
        setUserData(userDataDB);
      }
    };
    loadUserData();
  }, []);

  const providerValues = {
    signIn,
    signOut,
    user: userData,
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
