import { getBottomSpace } from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme: { colors } }) => css`
    flex: 1;
    background-color: ${colors.header};
    padding-top: 96px;
  `}
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: ${getBottomSpace() + 80}px;
`;

export const Title = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-size: ${RFValue(30)}px;
    font-family: ${fonts.secondary_600};
    color: ${colors.shape};
    margin-top: 32px;
  `}
`;
export const Message = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.secondary_500};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(25)}px;
    color: ${colors.textDetails};
    text-align: center;
    margin-top: 16px;
  `}
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 32px 120px ${getBottomSpace() + 80}px;
`;
export const DurationContainer = styled.View`
  ${({ theme: { colors } }) => css`
    height: 6px;
    margin-top: -6px;
    width: 100%;
    background-color: ${colors.title};
    overflow: hidden;
  `}
`;

export const DurationAnimated = styled(Animated.View)`
  ${({ theme: { colors } }) => css`
    height: 6px;
    width: 100%;
    background-color: ${colors.success};
  `}
`;
