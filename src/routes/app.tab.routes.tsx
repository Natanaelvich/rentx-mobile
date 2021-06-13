import React from 'react';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

import * as Icon from '../assets/tabIcons';
import * as P from '../pages';
import { AppStackRoutes } from './app.stack.routes';

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
            <Icon.Home width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="SchedulesList"
        component={P.SchedulesList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon.Car width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={P.Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon.Profile width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
};
