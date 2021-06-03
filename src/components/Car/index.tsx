import React from 'react';

import GaoslineSvg from '../../assets/gasoline.svg';
import {
	Container,
	Details,
	Brand,
	Name,
	About,
	Rent,
	Period,
	Price,
	Type,
	CardImage,
} from './styles';

interface CarData {
	brand: string;
	name: string;
	rent: {
		period: string;
		price: number;
	},
	thumbnail: string;
}
interface Props {
	data: CarData;
}
export function Car({ data }: Props){

	return (
		<Container>
			<Details>
				<Brand>{ data.brand }</Brand>
				<Name>{ data.name }</Name>
				<About>
					<Rent>
						<Period>{ data.rent.period }</Period>
						<Price> { `R$ ${data.rent.price}` }</Price>
					</Rent>
					<Type>
						<GaoslineSvg />
					</Type>
				</About>
			</Details>
			<CardImage
				source={ { uri: data.thumbnail} }
				resizeMode="contain"
			/>
		</Container>

	)

}
