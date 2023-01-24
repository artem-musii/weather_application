import axios from 'axios';
import { IForecast } from '../types';
import { API_KEYS } from '../app-keys/app-keys';

export const getForecast = async (lat: string, lon: string) => {
  const weatherAPIUrl = `${API_KEYS.API_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEYS.API_KEY}`;
  const response: { data: IForecast } = await axios.get(weatherAPIUrl);
  const forecastData: IForecast = response.data;

  return forecastData;
};
