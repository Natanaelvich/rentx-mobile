import { TextInput } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

import { StyledContainerProps, StyledIconProps } from './types';

export const Container = styled.View<StyledContainerProps>`
  ${({ theme: { colors }, isFocused }) => css`
    width: 100%;
    flex-direction: row;
    margin-bottom: 8px;
    border-bottom-width: 2px;
    border-bottom-color: transparent;
    ${isFocused &&
    css`
      border-bottom-color: ${colors.main};
    `}
  `}
`;

export const IconContainer = styled.View`
  ${({ theme: { colors } }) => css`
    width: 54px;
    height: 56px;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    background-color: ${colors.shape};
  `}
`;

// eslint-disable-next-line prettier/prettier
export const Icon = styled(Feather) <StyledIconProps>`
  ${({ theme: { colors }, isFocused, isFilled }) => css`
    font-size: ${RFValue(24)}px;
    color: ${colors.textDetails};
    ${(isFocused || isFilled) &&
    css`
      color: ${colors.main};
    `}
  `}
`;

export const InputText = styled(TextInput)`
  ${({ theme: { colors, fonts } }) => css`
    flex: 1;
    height: 56px;
    font-family: ${fonts.primary_400};
    font-size: ${RFValue(15)}px;
    color: ${colors.text};
    background-color: ${colors.shape};
    padding: 0 16px;
  `}
`;
