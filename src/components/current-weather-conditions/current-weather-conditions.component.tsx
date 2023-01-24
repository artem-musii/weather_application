import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { WeatherCondition } from '../../enums/weather-conditions';
import { WeatherIcon } from '../../helpers/weather-icon';
import { WeatherState } from '../../store/reducer';
import { IWeather } from '../../types';
import { convertSpeed } from '../../helpers/convert-speed';
import { currentConditionsStyles } from './current-weather-conditions.styles';

type Props = {
  weatherData: IWeather;
};

export const CurrentWeatherConditions: React.FC<Props> = ({ weatherData }) => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);
  return (
    <View style={currentConditionsStyles.currentWeatherConditions}>
      <View style={currentConditionsStyles.currentWeatherConditionsData}>
        <WeatherIcon condition={WeatherCondition.Precipitation} height="28px" width="28px" />

        <Text style={currentConditionsStyles.currentWeatherConditionsTitle}>
          {Math.round(weatherData.pop * 100)}%
        </Text>
      </View>

      <View style={currentConditionsStyles.currentWeatherConditionsData}>
        <WeatherIcon condition={WeatherCondition.Humidity} height="28px" width="20px" />

        <Text style={currentConditionsStyles.currentWeatherConditionsTitle}>
          {weatherData.main.humidity}%
        </Text>
      </View>

      <View style={currentConditionsStyles.currentWeatherConditionsData}>
        <WeatherIcon condition={WeatherCondition.Wind} height="28px" width="28px" />

        <Text style={currentConditionsStyles.currentWeatherConditionsTitle}>
          {convertSpeed(weatherData.wind.speed, weather.windSpeedUnits)}
          {weather.windSpeedUnits}
        </Text>
      </View>
    </View>
  );
};
