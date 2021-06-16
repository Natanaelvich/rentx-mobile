import React from 'react';

import * as S from './styles';
import { AddonsCardProps } from './types';

export const AddonsCard = (props: AddonsCardProps) => {
  const { icon: Icon, name } = props;
  return (
    <S.Container>
      <Icon width={32} height={32} />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
};
