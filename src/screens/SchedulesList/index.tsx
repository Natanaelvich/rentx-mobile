import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components/native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { format, parseISO } from 'date-fns';
import * as S from './styles';
import { LoadAnimate } from '../../components/LoadAnimate';
import { IconButton } from '../../components/IconButton';
import { Car } from '../../components/Car';
import { CarByUser } from '../../dtos/CarDTO';
import api from '../../services/api';

export const SchedulesList = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const isScreenFocused = useIsFocused();

  const [cars, setCars] = useState<CarByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const { data } = await api.get<CarByUser[]>(
        '/schedules_byuser?user_id=1',
      );
      const formattedData = data.map(rent => ({
        ...rent,
        start_date: format(parseISO(rent.start_date), 'dd/MM/yyyy'),
        end_date: format(parseISO(rent.end_date), 'dd/MM/yyyy'),
      }));
      setCars(formattedData);
      setCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [isScreenFocused]);

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
            renderItem={({ item: { car, start_date, end_date } }) => (
              <S.CarWrapper>
                <Car data={car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{start_date}</S.CarFooterDate>
                    <S.ArrowIcon />
                    <S.CarFooterDate>{end_date}</S.CarFooterDate>
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
