import React, { useState } from 'react';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import {
  Container,
  Footer,
  Form,
  Header,
  Step,
  Steps,
  Subtitle,
  Title,
} from './styles';
import { Bullet } from '../../../components/Bullet';
import api from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    cnh: string;
  };
}

export function SecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const route = useRoute();
  const { user } = route.params as Params;
  const navigation = useNavigation();
  const theme = useTheme();

  async function handleSignUp() {
    try {
      const schema = Yup.object().shape({
        passwordConfirmation: Yup.string()
          .required('Insira a confirmação da senha')
          .min(6, 'Insira uma senha forte com no mínimo 6 caracteres')
          .oneOf([Yup.ref('password'), null], 'As senhas devem ser coincidir'),
        password: Yup.string()
          .required('Insira a senha')
          .min(6, 'Insira uma senha forte com no mínimo 6 caracteres'),
      });
      const result = await schema.validate({ password, passwordConfirmation });

      await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.cnh,
        password,
      });

      const pageData = {
        title: 'Conta criada',
        message: 'Agora é só realizar o login',
        nextScreen: 'SignIn',
      };
      navigation.navigate('Confirmation', pageData);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar usuário');
      }
    }
  }
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
        <Steps>
          <Bullet />
          <Bullet active />
        </Steps>
      </Header>
      <Title>Crie sua {'\n'}conta</Title>
      <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>
      <Form>
        <Step>2. Senha</Step>
        <PasswordInput
          iconName="lock"
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={setPassword}
          autoCapitalize="none"
          value={password}
        />
        <PasswordInput
          iconName="lock"
          placeholder="Repetir senha"
          autoCorrect={false}
          onChangeText={setPasswordConfirmation}
          autoCapitalize="none"
          value={passwordConfirmation}
        />

        <Footer>
          <Button
            title="Confirmar"
            onPress={handleSignUp}
            color={theme.colors.success}
          />
        </Footer>
      </Form>
    </Container>
  );
}
