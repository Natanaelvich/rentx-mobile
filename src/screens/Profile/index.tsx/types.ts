import Animated from 'react-native-reanimated';

export type StyledTabProps = {
  active?: boolean;
};
export type RentalPeriod = {
  startFormatted: string;
  endFormatted: string;
};

export type AnimatedScrollRefProps = Animated.ScrollView & {
  scrollTo: ({ x, animated }: ScrollToProps) => void;
};

export type ScrollToProps = {
  x: number;
  animated: boolean;
};
