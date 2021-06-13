import { StyleProp, ViewStyle } from 'react-native';

import { RectButtonProps } from 'react-native-gesture-handler';

export type LabelButtonProps = RectButtonProps & {
  label: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
  addStyle?: StyleProp<ViewStyle>;
};
export type StyledProps = {
  color?: string;
};
export type StyledTextProps = {
  light?: boolean;
};
