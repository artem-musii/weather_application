import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { WeatherIcon } from '../../helpers/weather-icon';
import { convertTemp } from '../../helpers/convert-temp';
import { WeatherState } from '../../store/reducer';
import { useSelector } from 'react-redux';
import { IWeather } from '../../types';
import { weatherDayStyles } from './weather-day.styles';
import { SIZES } from '../../consts/sizes';

type Props = {
  monthName: string;
  day: string;
  data: IWeather[];
};

export const WeatherDay: React.FC<Props> = ({ monthName, day, data }) => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);

  return (
    <>
      <View style={weatherDayStyles.weatherDayTitle}>
        <Text style={weatherDayStyles.weatherDaySubtitle}>Today</Text>

        <Text style={weatherDayStyles.weatherDayDate}>
          {monthName}, {day}
        </Text>
      </View>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => String(item.dt)}
        ItemSeparatorComponent={() => <View style={{ width: SIZES.m }} />}
        renderItem={({ item }) => (
          <View>
            <Text style={weatherDayStyles.weatherDayInfo}>
              {convertTemp(item.main.temp, weather.temperatureUnit)}°
              {weather.temperatureUnit.slice(0, 1)}
            </Text>

            <WeatherIcon condition={item.weather[0].main} height="56px" width="56px" />

            <Text style={weatherDayStyles.weatherDayInfo}>
              {new Date(item.dt * 1000).getHours().toFixed(2)}
            </Text>
          </View>
        )}
      />
    </>
  );
};
