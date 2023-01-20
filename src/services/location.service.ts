import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const setLocation = async () => {
  try {
    const position: Position = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      });
    });
    const lat = position.coords.latitude || 0;
    const lon = position.coords.longitude || 0;
    console.log(lat, lon);
    await AsyncStorage.setItem('lat', String(lat));
    await AsyncStorage.setItem('lon', String(lon));
  } catch {
    throw new Error('Something went wrong');
  }
};
