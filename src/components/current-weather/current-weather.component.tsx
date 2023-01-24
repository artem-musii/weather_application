import React from 'react';
import { View, Text } from 'react-native';
import { convertTemp } from '../../helpers/convert-temp';
import { WeatherIcon } from '../../helpers/weather-icon';
import { useSelector } from 'react-redux';
import { WeatherState } from '../../store/reducer';
import { IWeather } from '../../types';
import { currentWeatherStyles } from './current-weather.styles';

type Props = {
  currentCondition: string;
  maxTemp: number;
  minTemp: number;
  currentWeather: IWeather;
};

export const CurrentWeather: React.FC<Props> = ({
  currentCondition,
  maxTemp,
  minTemp,
  currentWeather,
}) => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);

  return (
    <>
      <View>
        <WeatherIcon width="250px" height="180px" condition={currentCondition} />
      </View>
      <Text style={currentWeatherStyles.temp}>
        {convertTemp(currentWeather.main.temp, weather.temperatureUnit)}°
      </Text>
      <Text style={currentWeatherStyles.description}>
        {currentWeather.weather[0].main}
        {'\n'}
        Max.{convertTemp(maxTemp, weather.temperatureUnit)}° Min.
        {convertTemp(minTemp, weather.temperatureUnit)}°
      </Text>
    </>
  );
};
