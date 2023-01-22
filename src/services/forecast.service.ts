import axios from 'axios';
import { IForecast } from '../types/forecast.type';

export const getForecast = async (lat: string, lon: string) => {
  const weatherAPIKey = '35bcd86aaa2f86e435cf470a0a344c7e';
  const weatherAPIUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
  const response: { data: IForecast } = await axios.get(weatherAPIUrl);
  const forecastData: IForecast = response.data;

  return forecastData;
};
