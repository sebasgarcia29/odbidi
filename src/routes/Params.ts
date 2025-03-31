import { StackNavigationProp } from '@react-navigation/stack';
import { PageName } from './PageName';

export type RootStackParamList = {
  [PageName.Welcome]: undefined;
  [PageName.Login]: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
