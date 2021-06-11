import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;
export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;
export const Form = styled.View`
  padding: 0 24px;
`;

export const Title = styled.Text`
  margin-top: 48px;
  margin-bottom: 24px;
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`;
export const Footer = styled.View`
  margin-top: 16px;
`;
