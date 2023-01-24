import React from 'react';
import { Text, View } from 'react-native';
import { convertTemp } from '../../helpers/convert-temp';
import { WeatherIcon } from '../../helpers/weather-icon';
import { IWeather } from '../../types';
import { WeatherState } from '../../store/reducer';
import { useSelector } from 'react-redux';
import { nextForecastStyles } from './next-forecast.styles';

type Props = {
  day: IWeather;
  dayName: string;
  maxTemp: number;
  minTemp: number;
};

export const NextForecast: React.FC<Props> = ({ day, dayName, maxTemp, minTemp }) => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);

  return (
    <View style={nextForecastStyles.nextForecast} key={day.dt}>
      <Text style={nextForecastStyles.nextForecastDay}>{dayName}</Text>

      <WeatherIcon condition={day.weather[0].main} height="56px" width="56px" />

      <View style={nextForecastStyles.nextForecastTemp}>
        <Text style={nextForecastStyles.nextForecastDay}>
          {convertTemp(maxTemp, weather.temperatureUnit)}°{weather.temperatureUnit.slice(0, 1)}
          {'  '}
        </Text>

        <Text style={nextForecastStyles.nextForecastDayOpacity}>
          {convertTemp(minTemp, weather.temperatureUnit)}°{weather.temperatureUnit.slice(0, 1)}
        </Text>
      </View>
    </View>
  );
};
