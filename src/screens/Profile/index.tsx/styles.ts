import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.bgSecondary};
  `}
`;

export const Header = styled.View`
  ${({ theme: { colors } }) => css`
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${colors.header};
    padding: 0 24px;
    padding-top: ${getStatusBarHeight() + 16}px;
    margin-bottom: 96px;
  `}
`;

export const TopHeader = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.secondary_600};
    font-size: ${RFValue(22)}px;
    color: ${colors.bgSecondary};
  `}
`;

export const AvatarContainer = styled.View`
  ${({ theme: { colors } }) => css`
    width: 160px;
    height: 160px;
    background-color: ${colors.shape};
    margin-top: 48px;
    margin-bottom: -80px;
    border-radius: 80px;
    position: relative;
  `}
`;

export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const AvatarButton = styled(RectButton)`
  ${({ theme: { colors } }) => css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${colors.main};
    align-items: center;
    justify-content: center;
  `}
`;

export const AvatarIcon = styled(Feather)`
  ${({ theme: { colors } }) => css`
    font-size: ${RFValue(18)}px;
    color: ${colors.shape};
  `}
`;

export const Content = styled.View`
  padding: 0 24px;
  align-items: center;
  position: relative;
`;

export const ContentTabs = styled.View`
  ${({ theme: { colors } }) => css`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.line};
    margin-bottom: 16px;
  `}
`;

export const TabItem = styled(BorderlessButton)`
  padding-bottom: 8px;
  width: 50%;
`;

export const TabTitle = styled(Animated.Text)`
  ${({ theme: { fonts } }) => css`
    font-family: ${fonts.secondary_600};
    font-size: ${RFValue(20)}px;
    text-align: center;
  `}
`;

export const Form = styled.View``;

export const Footer = styled.View`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.bgSecondary};
    padding: 16px 24px ${getBottomSpace() + 24}px;
  `}
`;
