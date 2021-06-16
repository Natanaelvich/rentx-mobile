import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { StackActions, useNavigation } from '@react-navigation/core';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';
import { useAuth } from '../../contexts/AuthProvider';

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();

  const { user } = useAuth();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const startApp = useCallback(() => {
    navigation.dispatch(StackActions.replace(!user?.id ? 'SignIn' : 'Home'));
  }, [navigation, user]);

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet';

      runOnJS(startApp)();
    });
  }, [splashAnimation.value, startApp]);
  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
