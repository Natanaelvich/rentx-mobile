import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'react-native';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { CarDTO } from '../../dtos/CarDTO';

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const carData = [
    {
      brand: 'Audi',
      name: 'RS 5 Coupé',
      rent: {
        period: 'Ao dia',
        price: 120,
      },
      thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
    },
  ];

  function handleCarDatails(car: CarDTO) {
    navigation.navigate('CarDatails', { car });
  }
  useEffect(() => {
    async function fetCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetCars();
  }, []);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDatails(item)} />
          )}
        />
      )}
    </Container>
  );
}
