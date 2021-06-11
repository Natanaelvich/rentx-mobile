import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';
import { Container, ImageIndexes, CardImageWrapper, CarImage } from './styles';

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export function ImageSlider({ imagesUrl }: Props) {
  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setimageIndex(index);
  });

  const [imageIndex, setimageIndex] = useState(0);

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={String(item)} active={imageIndex === index} />
        ))}
      </ImageIndexes>
      <FlatList
        data={imagesUrl}
        horizontal
        onViewableItemsChanged={indexChanged.current}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <CardImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CardImageWrapper>
        )}
        pagingEnabled
      />
    </Container>
  );
}
