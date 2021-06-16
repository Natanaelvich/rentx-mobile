import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ModelCar } from '../../databases';

import { getAcessoryIcons } from '../../utils/getAcessoryIcons';
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CardImage,
} from './styles';

interface Props extends RectButtonProps {
  data: ModelCar;
}
export function Car({ data, ...rest }: Props) {
  const { isConnected } = useNetInfo();

  const MotorIcon = getAcessoryIcons(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${isConnected === true ? data.price : '...'}`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CardImage
        source={{ uri: data.thumbnail }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </Container>
  );
}
