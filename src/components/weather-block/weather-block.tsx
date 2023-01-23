import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { WeatherCondition } from '../../enums/weather-conditions';
import { WeatherIcon } from '../../helpers/weather-icon';
import { WeatherState } from '../../store/reducer';
import { IWeather } from '../../types/forecast.type';
import { forecastStyles } from '../forecast-data/forecast-data.styles';
import { convertSpeed } from '../../helpers/convert-speed';

type Props = {
  weatherData: IWeather;
};

export const WeatherBlock: React.FC<Props> = ({ weatherData }) => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);
  return (
    <View style={forecastStyles.weatherBlock}>
      <View style={forecastStyles.currentWeather}>
        <View style={forecastStyles.currentWeatherData}>
          <WeatherIcon condition={WeatherCondition.Precipitation} height="28px" width="28px" />
          <Text style={forecastStyles.currentWeatherText}>
            {Math.round(weatherData.pop * 100)}%
          </Text>
        </View>

        <View style={forecastStyles.currentWeatherData}>
          <WeatherIcon condition={WeatherCondition.Humidity} height="28px" width="20px" />
          <Text style={forecastStyles.currentWeatherText}>{weatherData.main.humidity}%</Text>
        </View>

        <View style={forecastStyles.currentWeatherData}>
          <WeatherIcon condition={WeatherCondition.Wind} height="28px" width="28px" />
          <Text style={forecastStyles.currentWeatherText}>
            {convertSpeed(weatherData.wind.speed, weather.windSpeedUnits)}
            {weather.windSpeedUnits}
          </Text>
        </View>
      </View>
    </View>
  );
};
