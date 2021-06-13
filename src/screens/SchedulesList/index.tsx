import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import { LoadAnimate } from '../../components/LoadAnimate';
import { IconButton } from '../../components/IconButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

export const SchedulesList = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const { data } = await api.get('/schedules_byuser?user_id=1');
      setCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <IconButton color={colors.shape} onPress={() => navigate('Home')} />
        <S.Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </S.Title>
        <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
      </S.Header>
      {isLoading ? (
        <LoadAnimate />
      ) : (
        <S.Content>
          <S.Appointments>
            <S.AppointmentTitle>Agendamentos feitos</S.AppointmentTitle>
            <S.AppointmentQuantity>{cars.length}</S.AppointmentQuantity>
          </S.Appointments>
          <S.CarsList
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item: { car, startDate, endDate } }) => (
              <S.CarWrapper>
                <Car data={car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{startDate}</S.CarFooterDate>
                    <S.ArrowIcon />
                    <S.CarFooterDate>{endDate}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      )}
    </S.Container>
  );
};
