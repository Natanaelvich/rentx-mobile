import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Input } from '../../../components/Input';
import {
  Container,
  Step,
  Header,
  Form,
  Footer,
  Steps,
  Title,
  Subtitle,
} from './styles';
import { Button } from '../../../components/Button';
import { Bullet } from '../../../components/Bullet';

interface PageProps {
  name: string;
  position: number;
}

export function FirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnh, setcnh] = useState('');
  const navigation = useNavigation();

  const pages = [
    {
      name: 'FirstStep',
      position: 0,
    },
    { name: 'SecondStep', position: 1 },
  ];

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .required('O email é obrigatório')
          .email('O email deve ser válido'),
        cnh: Yup.string()
          .required('A CNH é obrigatória')
          .min(6, 'Necessário uma CNH válida'),
      });
      await schema.validate({ name, email, cnh });
      navigation.navigate('SecondStep');
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        Alert.alert('Opa', e.message);
      } else {
        Alert.alert('Erro', 'Erro ao validar os dados');
      }
    }
  }
  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            {/** iterate over pages and activate when index == page pos */}
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua {'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>
          <Form>
            <Step>1.Dados</Step>
            <Input
              iconName="user"
              autoCorrect={false}
              autoCapitalize="none"
              value={name}
              placeholder="Nome"
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              placeholder="Email"
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              autoCorrect={false}
              autoCapitalize="none"
              value={cnh}
              placeholder="CNH"
              onChangeText={setcnh}
            />
            <Footer>
              <Button title="Próximo" onPress={handleNextStep} />
            </Footer>
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
