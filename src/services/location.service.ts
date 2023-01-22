import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const setCurrentLocation = async () => {
  try {
    await AsyncStorage.removeItem('lat');
    await AsyncStorage.removeItem('lon');
    const position: Position = await Location.getCurrentPositionAsync({});
    const lat = position.coords.latitude || 50.45;
    const lon = position.coords.longitude || 30.523;
    await AsyncStorage.setItem('lat', String(lat));
    await AsyncStorage.setItem('lon', String(lon));
  } catch {
    throw new Error('Something went wrong');
  }
};
