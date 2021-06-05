import React, { useState, useRef, useEffect } from 'react';
import { FlatList, ViewToken } from 'react-native';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CardImageWrapper,
  CarImage,
} from './styles';

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export function ImageSlider({ imagesUrl }: Props) {
  const [indexImage, setIndexImage] = useState(0);
  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setIndexImage(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <ImageIndex key={String(index)} active={index === indexImage} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CardImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CardImageWrapper>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  );
}
