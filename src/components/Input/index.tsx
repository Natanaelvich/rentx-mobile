import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Container, InputText, IconContainer } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  fieldValid: boolean;
}

export function Input({ iconName, fieldValid, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={fieldValid ? theme.colors.main : theme.colors.title}
        />
      </IconContainer>

      <InputText {...rest} />
    </Container>
  );
}
