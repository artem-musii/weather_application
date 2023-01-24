import { Platform } from 'react-native';

export const getMonthName = (monthName: string) => {
  return Platform.OS === 'ios' ? monthName : monthName.slice(3, 7);
};
