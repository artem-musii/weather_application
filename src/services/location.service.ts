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

    return { lat, lon };
  } catch {
    const lat = 50.4333;
    const lon = 30.5167;

    return { lat, lon };
  }
};
