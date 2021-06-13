import React from 'react';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import { IconButtonProps } from './types';

export const IconButton = (props: IconButtonProps) => {
  const { name = 'chevron-left', color, onPress, ...attrs } = props;
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  return (
    <S.Container onPress={onPress || goBack} {...attrs}>
      <Feather name={name} color={color || colors.text} size={28} />
    </S.Container>
  );
};
