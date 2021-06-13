import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Scheduling } from '../screens/Scheduling';
import { Splash } from '../screens/Splash';
import { SchedulingDetails } from '../screens/SchedulingDatails';

const { Navigator, Screen } = createStackNavigator();

export const AppStackRoutes = () => (
  <Navigator headerMode="none" initialRouteName="Splash">
    <Screen name="Splash" component={Splash} />
    <Screen name="Home" component={Home} />
    <Screen name="Scheduling" component={Scheduling} />
    <Screen name="SchedulingDetails" component={SchedulingDetails} />
  </Navigator>
);
