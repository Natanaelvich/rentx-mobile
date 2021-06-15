import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import * as S from './styles';
import { useAuth } from '../../../contexts/AuthProvider';
import { PasswordInput } from '../../../components/PasswordInput';
import { IconInput } from '../../../components/IconInput';
import { IconButton } from '../../../components/IconButton';
import { LabelButton } from '../../../components/LabelButton';

export const Profile = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const { user } = useAuth();

  const [name, setName] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignOut = () => {
    console.log('des logar');
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior="position"
      keyboardVerticalOffset={useBottomTabBarHeight() - 16}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />
            <S.TopHeader>
              <IconButton />
              <S.Title>Editar Perfil</S.Title>
              <IconButton onPress={handleSignOut} name="power" />
            </S.TopHeader>
            <S.AvatarContainer>
              <S.Avatar
                source={{ uri: 'https://github.com/Natanaelvich.png' }}
              />
              <S.AvatarButton>
                <S.AvatarIcon name="camera" />
              </S.AvatarButton>
            </S.AvatarContainer>
          </S.Header>
          <S.Content>
            <S.ContentTabs>
              <S.TabItem active>
                <S.TabTitle active>Dados</S.TabTitle>
              </S.TabItem>
              <S.TabItem active={false}>
                <S.TabTitle active={false}>Trocar senha</S.TabTitle>
              </S.TabItem>
            </S.ContentTabs>
            <S.Form>
              <IconInput
                iconName="user"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="words"
                defaultValue={user.name}
                value={name}
                onChangeText={setName}
              />
              <IconInput
                iconName="mail"
                defaultValue={user.email}
                editable={false}
              />
              <IconInput
                iconName="credit-card"
                placeholder="CNH"
                autoCorrect={false}
                keyboardType="numeric"
                defaultValue={user.driver_license}
                value={driverLicense}
                onChangeText={setDriverLicense}
              />
            </S.Form>
            <S.Form>
              <PasswordInput
                iconName="lock"
                placeholder="Senha atual"
                value={password}
                onChangeText={setPassword}
              />
              <PasswordInput
                iconName="lock"
                placeholder="Senha nova"
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <PasswordInput
                iconName="lock"
                placeholder="Repetir Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </S.Form>
          </S.Content>
          <S.Footer>
            <LabelButton label="Salvar alterações" onPress={() => true} />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
