import { IWeather } from '../types';

export const getMin = (forecast: IWeather[]) => {
  return forecast.reduce((min, day) => Math.min(min, day.main.temp_min), Infinity);
};
