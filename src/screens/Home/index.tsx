import React from 'react';
import { StatusBar } from 'react-native';
import {
	Container,
	Header,
	HeaderContent,
	TotalCars,
	CarList
} from './styles';


import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';

export function Home(){
	const carData = [
		{
			brand: 'Audi',
			name: 'RS 5 Coupé',
			rent: {
				period: 'Ao dia',
				price: 120
			},
			thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
		}
	]
	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Header>
				<HeaderContent>
					<Logo
						width={RFValue(108)}
						height={RFValue(12)}
						/>
					<TotalCars>
						Total de 12 carros
					</TotalCars>
				</HeaderContent>
			</Header>
			<CarList
				data={[1,2,3]}
				keyExtractor={item => String(item)}
				renderItem={({ item }) => <Car data={carData[0]}/>}
			/>

		</Container>

	)

}
