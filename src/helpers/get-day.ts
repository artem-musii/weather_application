import { Platform } from 'react-native';

export const getDay = (day: string, index: number) => {
  return Platform.OS === 'ios' ? day : day.slice(index, index + 3);
};
