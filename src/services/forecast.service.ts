import axios from 'axios';
import { IForecast } from '../types/forecast.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getForecast = async () => {
  let lat = await AsyncStorage.getItem('lat');
  let lon = await AsyncStorage.getItem('lon');

  if (!lat) {
    lat = '0';
  }

  if (!lon) {
    lon = '0';
  }

  const weatherAPIKey = '35bcd86aaa2f86e435cf470a0a344c7e';
  const weatherAPIUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
  const response: { data: IForecast } = await axios.get(weatherAPIUrl);
  const forecastData: IForecast = response.data;

  return forecastData;
};
