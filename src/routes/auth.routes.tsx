import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AppTabRoutes } from './app.tab.routes';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { FirstStep as SignUpFirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep as SignUpSecondStep } from '../screens/SignUp/SecondStep';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

export const AuthRoutes = () => (
  <Navigator headerMode="none" initialRouteName="Splash">
    <Screen name="Splash" component={Splash} />
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
    <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
    <Screen name="AppTabRoutes" component={AppTabRoutes} />
    <Screen name="Confirmation" component={Confirmation} />
  </Navigator>
);
