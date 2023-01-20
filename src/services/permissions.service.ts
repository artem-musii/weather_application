import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude || 0;
      const lon = location.coords.longitude || 0;
      console.log(lat, lon);
      await AsyncStorage.setItem('lat', String(lat));
      await AsyncStorage.setItem('lon', String(lon));
    } else {
      console.log('Permission to access location denied');
    }
  } catch {
    throw new Error('Something went wrong');
  }
};
