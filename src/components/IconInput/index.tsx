import React, { useState } from 'react';

import * as S from './styles';
import { IconInputProps } from './types';

export const IconInput = (props: IconInputProps) => {
  const { iconName, value, ...attrs } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputFocus = () => {
    setIsFocused(true);
  };
  const inputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return (
    <S.Container isFocused={isFocused}>
      <S.IconContainer>
        <S.Icon name={iconName} isFocused={isFocused} isFilled={isFilled} />
      </S.IconContainer>
      <S.InputText onFocus={inputFocus} onBlur={inputBlur} {...attrs} />
    </S.Container>
  );
};
