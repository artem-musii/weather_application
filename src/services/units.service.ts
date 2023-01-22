import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUnits = async (key: string, units: string) => {
  await AsyncStorage.setItem(key, units);
};
