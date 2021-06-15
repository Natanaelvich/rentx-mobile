import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { CarDTO } from '../../dtos/CarDTO';
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
  data: CarDTO;
}
export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAcessoryIcons(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price> {`R$ ${data.price}`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CardImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
