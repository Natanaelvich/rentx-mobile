import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibility,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  fieldValid: boolean;
}

export function PasswordInput({ iconName, fieldValid, ...rest }: InputProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);

  function handleChangePasswordVisibility() {
    setVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={fieldValid ? theme.colors.main : theme.colors.title}
        />
      </IconContainer>
      <InputText {...rest} secureTextEntry={visible} />
      <ChangePasswordVisibility onPress={handleChangePasswordVisibility}>
        <IconContainer>
          <Feather
            name={visible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.title}
          />
        </IconContainer>
      </ChangePasswordVisibility>
    </Container>
  );
}
