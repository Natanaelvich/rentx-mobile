import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';

import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAcessoryIcons } from '../../utils/getAcessoryIcons';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import api from '../../services/api';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface Params {
  car: CarDTO;
  dates: string[];
}
interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDatails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );
  const [sendRequest, setSendRequest] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as Params;
  const rentalTotal = {
    diarias: Number(dates.length),
    total: (dates.length * car.rent.price).toFixed(2),
  };
  async function handleRentalComplete() {
    setSendRequest(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];
    await api.post(`schedules_byuser`, {
      user_id: 1,
      car,
      startDate: rentalPeriod.start,
      endDate: rentalPeriod.end,
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(response => navigation.navigate('SchedulingComplete'))
      .catch(() => {
        Alert.alert('Não foi possivel confirmar o agendamento.');
        setSendRequest(false);
      });
  }
  function handleBack() {
    navigation.goBack();
  }
  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd-MM-yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd-MM-yyyy',
      ),
    });
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map(acessory => (
            <Accessory
              key={acessory.name}
              name={acessory.name}
              icon={getAcessoryIcons(acessory.type)}
            />
          ))}
          <RentalPeriod>
            <CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>
            <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />
            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>
          </RentalPeriod>
          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>{`R$ ${car.rent.price} x${rentalTotal.diarias} diárias`}</RentalPriceQuota>
              <RentalPriceTotal>R$ {rentalTotal.total}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Accessories>
      </Content>
      <Footer>
        <Button
          title="Alugar Agora"
          onPress={handleRentalComplete}
          color={theme.colors.success}
          enabled={!sendRequest}
          loading={sendRequest}
        />
      </Footer>
    </Container>
  );
}
