import React from 'react';

import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';

import LoadCar from '../../assets/loader.json';

import { Container } from './styles';

export function LoadAnimate() {
  return (
    <Container>
      <LottieView
        source={LoadCar}
        style={{
          height: RFValue(200),
        }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
