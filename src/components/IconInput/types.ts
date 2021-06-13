import { ComponentProps } from 'react';
import { TextInputProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

export type IconInputProps = TextInputProps & {
  iconName: ComponentProps<typeof Feather>['name'];
  value?: string;
};

export type StyledIconProps = {
  isFocused: boolean;
  isFilled: boolean;
};
export type StyledContainerProps = {
  isFocused: boolean;
};
