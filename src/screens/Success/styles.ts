import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: 96px;
`;
export const Content = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  padding-bottom: ${getBottomSpace()}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  margin-top: 46px;
`;
export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_detail};
  margin-top: 16px;
  text-align: center;
`;
export const Footer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
