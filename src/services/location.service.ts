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
    const position: Position = await Location.getCurrentPositionAsync({});
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    await AsyncStorage.setItem('lat', String(lat));
    await AsyncStorage.setItem('lon', String(lon));
  } catch {
    await AsyncStorage.setItem('lat', String(50.4333));
    await AsyncStorage.setItem('lat', String(30.5167));
  }
};
