import React, { useState } from 'react';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { Container, Footer, Form, Header, Title } from './styles';

export function SecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigation = useNavigation();
  async function handleSignUp() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Insira a senha')
          .min(6, 'Insira uma senha forte com no mínimo 6 caracteres'),
        passwordConfirmation: Yup.string()
          .required('Insira a confirmação da senha')
          .min(6, 'Insira uma senha forte com no mínimo 6 caracteres')
          .oneOf([Yup.ref('password'), null], 'As senhas devem ser coincidir'),
      });
      await schema.validate({ password, passwordConfirmation });
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
      </Header>
      <Form>
        <Title>2.Senha</Title>
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
          placeholder="Confirmar a senha"
          autoCorrect={false}
          onChangeText={setPasswordConfirmation}
          autoCapitalize="none"
          value={passwordConfirmation}
        />

        <Footer>
          <Button title="Próximo" onPress={handleSignUp} />
        </Footer>
      </Form>
    </Container>
  );
}
