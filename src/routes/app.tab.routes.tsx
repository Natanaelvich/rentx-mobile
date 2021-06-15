import React from 'react';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

import * as Icon from '../assets/tabIcons';
import { AppStackRoutes } from './app.stack.routes';
import { Profile } from '../screens/Profile/index.tsx';
import { SchedulesList } from '../screens/SchedulesList';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabRoutes = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: colors.main,
        inactiveTintColor: colors.textDetails,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 64,
          backgroundColor: colors.bgPrimary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon.HomeIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="SchedulesList"
        component={SchedulesList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon.CarIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon.ProfileIcon width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
};
