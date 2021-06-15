import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { BackButton } from '../../components/BackButton';
import {
  Container,
  Header,
  Details,
  RentCarData,
  Brand,
  Model,
  RentCarCost,
  Period,
  Price,
  CarImages,
  Content,
  About,
  Footer,
  Accessories,
  CalendarIcon,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { ImageSlider } from '../../components/ImageSlider';

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { getAcessoryIcons } from '../../utils/getAcessoryIcons';
import api from '../../services/api';

interface Params {
  car: CarDTO;
  dates: string[];
}
interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const navigation = useNavigation();
  const routes = useRoute();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );
  const { car, dates } = routes.params as Params;
  const [loading, setloading] = useState(false);

  async function handleConfirmRental() {
    try {
      setloading(true);
      // post to API
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];
      // posting rent to  user
      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          'dd/MM/yyyy',
        ),
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });

      const pageData = {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar seu automóvel`,
        navigateTo: 'Home',
      };
      navigation.navigate('Success', { data: pageData });
    } catch (error) {
      Alert.alert('Não foi possivel agendar');
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  const theme = useTheme();

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });
  }, [dates]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigation.goBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <RentCarData>
            <Brand>{car.brand}</Brand>
            <Model>{car.name}</Model>
          </RentCarData>
          <RentCarCost>
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price}`}</Price>
          </RentCarCost>
        </Details>
        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAcessoryIcons(accessory.type)}
            />
          ))}
        </Accessories>
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
            <DateTitle>Ate</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>
              {' '}
              {`R$ ${car.price * dates.length}`}{' '}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
