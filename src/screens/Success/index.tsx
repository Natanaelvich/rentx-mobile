import React from 'react';
import { useWindowDimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Content, Title, Message, Footer } from './styles';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmeButton } from '../../components/ConfirmeButton';

export interface SuccessProps {
  data: {
    title: string;
    message?: string;
    navigateTo: string;
  };
}

export function Success() {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params as SuccessProps;
  function handleCarSchedulingHome() {
    navigation.navigate(data.navigateTo);
  }

  return (
    <Container>
      <LogoSvg width={dimensions.width} />
      <Content>
        <DoneSvg width={RFValue(80)} height={RFValue(80)} />
        <Title>{data.title}</Title>
        <Message>{data.message}</Message>
      </Content>
      <Footer>
        <ConfirmeButton title="Ok" onPress={handleCarSchedulingHome} />
      </Footer>
    </Container>
  );
}
