import * as Location from 'expo-location';
import { setCurrentLocation } from './location.service';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      await setCurrentLocation();
      console.log('You can use location');
    } else {
      console.log('Permission to access location denied');
    }
  } catch {
    throw new Error('Something went wrong');
  }
};
