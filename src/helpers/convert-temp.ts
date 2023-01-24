import { WeatherTempUnits } from '../enums/weather-temp-units';

export const convertTemp = (temp: number, units: WeatherTempUnits) => {
  switch (units) {
    case WeatherTempUnits.CELCIUS:
      return Math.round(temp - 273.15);
    case WeatherTempUnits.FAHRENHEIT:
      return Math.round((temp - 273.15) * (9 / 5) + 32);
    default:
      return Math.round(temp);
  }
};
