import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 0 24px;
`;
export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Form = styled.View``;

export const Step = styled.Text`
  margin-top: 32px;
  margin-bottom: 24px;
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`;
export const Footer = styled.View`
  margin-top: 16px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};
  margin-top: 32px;
`;
export const Subtitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  margin-top: 16px;
  line-height: ${RFValue(25)}px;
`;
