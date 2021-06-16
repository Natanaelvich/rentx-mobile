import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import * as S from './styles';
import { AnimatedScrollRefProps } from './types';
import { IconButton } from '../../../components/IconButton';
import { IconInput } from '../../../components/IconInput';
import { PasswordInput } from '../../../components/PasswordInput';
import { LabelButton } from '../../../components/LabelButton';
import { updateUserSchema } from '../../../utils/updateUserSchema';
import { useAuth } from '../../../contexts/AuthProvider';

export const Profile = () => {
  const { user, signOut, updateUser } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { colors } = useTheme();

  const { width: sWidth } = useWindowDimensions();
  const barWidth = (sWidth - 48) / 2;
  const scroll = useAnimatedRef<AnimatedScrollRefProps>();
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const currIndex = useDerivedValue(() => x.value / sWidth);

  const animatedUnder = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          currIndex.value,
          [0, 1],
          [0, barWidth],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const animatedText1 = useAnimatedStyle(() => ({
    color: interpolateColor(
      currIndex.value,
      [0, 1],
      [colors.title, colors.textDetails],
    ),
  }));
  const animatedText2 = useAnimatedStyle(() => ({
    color: interpolateColor(
      currIndex.value,
      [1, 0],
      [colors.title, colors.textDetails],
    ),
  }));

  const handleSignOut = () => {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
        },
      ],
    );
  };

  const selectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const handleUpdateUser = async () => {
    try {
      updateUserSchema.validate({ name, driverLicense });
      await updateUser({
        ...user,
        name,
        driver_license: driverLicense,
        avatar,
      });
      return Alert.alert('Sucesso', 'Atualização do perfil concluída');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
      console.log(error);
      return Alert.alert(
        'Erro ao atualizar',
        'Ocorreu um erro ao fazer atualização do perfil',
      );
    }
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
              {!!avatar && <S.Avatar source={{ uri: avatar }} />}
              <S.AvatarButton onPress={selectAvatar}>
                <S.AvatarIcon name="camera" />
              </S.AvatarButton>
            </S.AvatarContainer>
          </S.Header>
          <S.Content>
            <S.ContentTabs>
              <S.TabItem
                rippleColor={colors.line}
                onPress={() => {
                  scroll.current?.scrollTo({
                    x: 0,
                    animated: true,
                  });
                }}
              >
                <S.TabTitle style={animatedText1}>Dados</S.TabTitle>
              </S.TabItem>
              <S.TabItem
                rippleColor={colors.line}
                onPress={() => {
                  scroll.current?.scrollTo({
                    x: sWidth,
                    animated: true,
                  });
                }}
              >
                <S.TabTitle style={animatedText2}>Trocar senha</S.TabTitle>
              </S.TabItem>
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: 3,
                    width: barWidth,
                    backgroundColor: colors.main,
                  },
                  animatedUnder,
                ]}
              />
            </S.ContentTabs>
            <Animated.ScrollView
              horizontal
              ref={scroll}
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              snapToInterval={sWidth}
              decelerationRate="fast"
              bounces={false}
              scrollEventThrottle={16}
            >
              <S.Form style={{ width: sWidth - 48, marginRight: 24 }}>
                <IconInput
                  iconName="user"
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
                  autoCorrect={false}
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  value={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </S.Form>
              <S.Form style={{ width: sWidth - 48, marginLeft: 24 }}>
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
            </Animated.ScrollView>
          </S.Content>
          <S.Footer>
            <LabelButton label="Salvar alterações" onPress={handleUpdateUser} />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
