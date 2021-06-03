import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import {
	Container,
} from './styles';
import { useTheme } from 'styled-components';

interface Props extends BorderlessButtonProps{
	color?: string;
}

export function BackButton({ color, ...rest }: Props){
	const theme = useTheme();
	return (
		<Container {...rest} >
			<MaterialIcons
				name="chevron-left"
				size={24}
				color={color ? color : theme.colors.text}
			/>
		</Container>

	)

}
