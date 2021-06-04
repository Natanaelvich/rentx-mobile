import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Messge, Footer } from './styles';
import { ConfirmeButton } from '../../components/ConfirmeButton';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  function handleGoToHome() {
    navigation.navigate('Home');
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado</Title>

        <Messge>
          Agora você precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Messge>
      </Content>
      <Footer>
        <ConfirmeButton title="OK" onPress={handleGoToHome} />
      </Footer>
    </Container>
  );
}
