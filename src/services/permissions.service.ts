import * as Location from 'expo-location';
import { setCurrentLocation as getCurrentLocation } from './location.service';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await getCurrentLocation();
      console.log('You can use location');

      return location;
    } else {
      console.log('Permission to access location denied');
      const location = await getCurrentLocation();

      return location;
    }
  } catch {
    throw new Error('Something went wrong');
  }
};
