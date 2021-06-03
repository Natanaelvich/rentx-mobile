import React from 'react';
import { useTheme } from 'styled-components';

import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { Button } from '../../components/Button';

export function Scheduling() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton
          onPress={() => {
            console.log('back');
          }}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {`\n`}
          data de inicio e {`\n`}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>01/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}>01/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}
