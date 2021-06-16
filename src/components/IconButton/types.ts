import { ComponentProps } from 'react';

import { Feather } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export type IconButtonProps = BorderlessButtonProps & {
  name?: ComponentProps<typeof Feather>['name'];
  color?: string;
};
