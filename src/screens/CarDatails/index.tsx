import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useNetInfo } from '@react-native-community/netinfo';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAcessoryIcons } from '../../utils/getAcessoryIcons';
import { CarDTO, Photo } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  AddonsContainer,
  Footer,
  OffLineMsg,
} from './styles';
import api from '../../services/api';
import { Car } from '../../databases/model/Car';
import { AddonsCard } from '../../components/AddonsCard';

interface Params {
  car: CarDTO;
}
export function CarDatails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isConnected } = useNetInfo();

  const { car } = route.params as Params;
  const scrollY = useSharedValue(0);
  const sizes = {
    initial: RFValue(70),
    finally: RFValue(200),
  };
  const theme = useTheme();

  const [onlineCar, setOnlineCar] = useState({} as CarDTO);

  const scrollHandle = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const HeaderStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, sizes.finally],
        [sizes.finally, sizes.initial],
        Extrapolate.CLAMP,
      ),
    };
  });
  const slidercarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });
  function handleSelectPeriod() {
    navigation.navigate('Scheduling', { car });
  }
  function handleBack() {
    navigation.goBack();
  }

  const checkedPhotos = onlineCar.photos
    ? onlineCar.photos
    : ([{ id: car.thumbnail, photo: car.thumbnail }] as Photo[]);

  useEffect(() => {
    const loadOnlineCar = async () => {
      const { data } = await api.get<CarDTO>(`cars/${car.id}`);
      setOnlineCar(data);
    };
    if (isConnected === true) {
      loadOnlineCar();
    }
  }, [car, isConnected]);
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          HeaderStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View style={[slidercarStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={checkedPhotos} />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + RFValue(160),
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${isConnected === true ? car.price : '...'}`}</Price>
          </Rent>
        </Details>
        {onlineCar.accessories && (
          <AddonsContainer>
            {onlineCar.accessories.map(({ name, type }) => (
              <AddonsCard
                key={type}
                name={name}
                icon={getAcessoryIcons(type)}
              />
            ))}
          </AddonsContainer>
        )}
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do alugel"
          onPress={handleSelectPeriod}
        />

        {isConnected === false && (
          <OffLineMsg>
            💬 você precisar estar conectado{`\n`}
            para ver mais detalhes e agendar seu carro.
          </OffLineMsg>
        )}
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
