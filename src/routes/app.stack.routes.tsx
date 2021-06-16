import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Scheduling } from '../screens/Scheduling';
import { Splash } from '../screens/Splash';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { CarDatails } from '../screens/CarDatails';
import { Confirmation } from '../screens/Confirmation';
import { SchedulesList } from '../screens/SchedulesList';

const { Navigator, Screen } = createStackNavigator();

export const AppStackRoutes = () => (
  <Navigator headerMode="none" initialRouteName="Splash">
    <Screen name="Splash" component={Splash} />
    <Screen name="Home" component={Home} />
    <Screen name="CarDetails" component={CarDatails} />
    <Screen name="Scheduling" component={Scheduling} />
    <Screen name="SchedulingDetails" component={SchedulingDetails} />
    <Screen name="Confirmation" component={Confirmation} />
    <Screen name="SchedulesList" component={SchedulesList} />
  </Navigator>
);
