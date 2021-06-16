import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const CardImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled(FastImage)`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
