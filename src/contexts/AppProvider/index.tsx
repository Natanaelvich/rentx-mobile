import React from 'react';

import { AuthProvider } from '../AuthProvider';
import { AppProviderProps } from './types';

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props;
  return <AuthProvider>{children}</AuthProvider>;
};
