import { FC } from 'react';

import { SvgProps } from 'react-native-svg';

export type AddonsCardProps = {
  name: string;
  icon: FC<SvgProps>;
};
export type DotIndexProps = {
  active: boolean;
};
