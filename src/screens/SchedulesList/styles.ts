import { FlatList } from 'react-native';

import styled, { css } from 'styled-components/native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import { CarByUser } from '../../dtos/CarDTO';

export const Container = styled.View`
  ${({ theme: { colors } }) => css`
    flex: 1;
    align-items: center;
    background-color: ${colors.bgSecondary};
  `}
`;

export const Header = styled.View`
  ${({ theme: { colors } }) => css`
    width: 100%;
    justify-content: center;
    background-color: ${colors.header};
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 16}px;
  `}
`;

export const Title = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.secondary_600};
    font-size: ${RFValue(28)}px;
    color: ${colors.shape};
    margin: 24px 0;
  `}
`;
export const SubTitle = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.secondary_400};
    font-size: ${RFValue(14)}px;
    color: ${colors.shape};
    margin: 24px 0;
  `}
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const AppointmentTitle = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.primary_400};
    font-size: ${RFValue(14)}px;
    color: ${colors.text};
  `}
`;
export const AppointmentQuantity = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.primary_500};
    font-size: ${RFValue(14)}px;
    color: ${colors.text};
  `}
`;
export const CarsList = styled(FlatList as new () => FlatList<CarByUser>).attrs(
  {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace() + 4,
    },
  },
)``;

export const CarWrapper = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  ${({ theme: { colors } }) => css`
    width: 100%;
    padding: 8px 16px;
    margin-top: -16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.bgPrimary};
  `}
`;

export const CarFooterTitle = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.secondary_500};
    font-size: ${RFValue(12)}px;
    color: ${colors.textDetails};
    text-transform: uppercase;
  `}
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.primary_400};
    font-size: ${RFValue(12)}px;
    color: ${colors.title};
  `}
`;

export const ArrowIcon = styled(AntDesign).attrs({
  name: 'arrowright',
})`
  ${({ theme: { colors } }) => css`
    font-size: ${RFValue(18)}px;
    color: ${colors.text};
    margin: 0 10px;
  `}
`;
