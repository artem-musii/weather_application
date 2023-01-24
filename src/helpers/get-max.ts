import { IWeather } from '../types';

export const getMax = (forecast: IWeather[]) => {
  return forecast.reduce((min, day) => Math.max(min, day.main.temp_min), -Infinity);
};
