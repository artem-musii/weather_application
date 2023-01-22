import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { requestLocationPermission } from '../../services/permissions.service';
import { useNavigation } from '@react-navigation/native';
import { getForecast } from '../../services/forecast.service';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherIcon } from '../../helpers/weather-icon';
import { WeatherCondition } from '../../enums/weather-conditions';
import { forecastStyles } from './forecast-data.styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { IWeather } from '../../types/forecast.type';
import { useSelector } from 'react-redux';
import { WeatherState } from '../../store/reducer';

export const ForecastData: React.FC = () => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);
  const navigation = useNavigation();
  const { lat, lon } = useSelector((state: { weather: WeatherState }) => state.weather);
  const { data: forecastData, refetch } = useQuery('forecast', async () => {
    if (lat && lon) {
      const response = await getForecast(lat, lon);
      console.log(lat, lon);

      return response;
    } else {
      const response = await getForecast('0', '0');

      return response;
    }
  });

  const convertTemp = (temp: number) => {
    switch (weather.temperatureUnit) {
      case 'Celsius':
        return Math.round(temp - 273.15);
      case 'Fahrenheit':
        return Math.round((temp - 273.15) * (9 / 5) + 32);
      default:
        return Math.round(temp);
    }
  };

  const convertSpeed = (speed: number) => {
    switch (weather.windSpeedUnit) {
      case 'km/h':
        return Math.round(speed * 3.6);
      case 'Mph':
        return Math.round(speed * 2.237);
      default:
        return Math.round(speed);
    }
  };

  const getMin = (forecast: IWeather[]) => {
    return forecast.reduce((min, day) => Math.min(min, day.main.temp_min), Infinity);
  };

  const getMax = (forecast: IWeather[]) => {
    return forecast.reduce((max, day) => Math.max(max, day.main.temp_min), -Infinity);
  };

  useEffect(() => {
    void (async () => refetch())();
  }, [refetch, weather]);

  useEffect(() => {
    void (async () => requestLocationPermission())();
  }, []);

  if (forecastData) {
    const dayForecast = forecastData.list.slice(0, 8);
    const nextForecast = forecastData.list.filter((_, i) => i % 8 === 0);
    const date = new Date(forecastData.list[0].dt * 1000);
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const currentCondition = forecastData.list[0].weather[0].main;
    const forecastInfo = forecastData.list;
    const currentTempLetter = weather.temperatureUnit.slice(0, 1);

    return (
      <LinearGradient colors={['#29b2dd', '#3ad', '#2dc8ea']}>
        <SafeAreaView>
          <ScrollView>
            <StatusBar />
            <View style={forecastStyles.container}>
              <View style={forecastStyles.header}>
                <TouchableOpacity>
                  <Text
                    onPress={() => navigation.navigate('Location' as never)}
                    style={forecastStyles.text}
                  >
                    {forecastData.city.name}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    onPress={() => navigation.navigate('Settings' as never)}
                    style={forecastStyles.text}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <WeatherIcon width="250px" height="180px" condition={currentCondition} />
              </View>

              <Text style={forecastStyles.temp}>
                {convertTemp(forecastData.list[0].main.temp)}°
              </Text>

              <Text style={forecastStyles.description}>
                {forecastInfo[0].weather[0].main}
                {'\n'}
                Max.{convertTemp(getMax(forecastInfo.slice(0, 8)))}° Min.
                {convertTemp(getMin(forecastInfo.slice(0, 8)))}°
              </Text>

              <View style={forecastStyles.weatherBlock}>
                <View style={forecastStyles.currentWeather}>
                  <View style={forecastStyles.currentWeatherData}>
                    <WeatherIcon
                      condition={WeatherCondition.Precipitation}
                      height="28px"
                      width="28px"
                    />
                    <Text style={forecastStyles.currentWeatherText}>
                      {Math.round(forecastInfo[0].pop * 100)}%
                    </Text>
                  </View>

                  <View style={forecastStyles.currentWeatherData}>
                    <WeatherIcon condition={WeatherCondition.Humidity} height="28px" width="20px" />
                    <Text style={forecastStyles.currentWeatherText}>
                      {forecastInfo[0].main.humidity}%
                    </Text>
                  </View>

                  <View style={forecastStyles.currentWeatherData}>
                    <WeatherIcon condition={WeatherCondition.Wind} height="28px" width="28px" />
                    <Text style={forecastStyles.currentWeatherText}>
                      {convertSpeed(forecastInfo[0].wind.speed)}
                      {weather.windSpeedUnit}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={forecastStyles.weatherBlock}>
                <View style={forecastStyles.weatherBlockTitle}>
                  <Text style={forecastStyles.title}>Today</Text>

                  <Text style={forecastStyles.titleData}>
                    {monthName.slice(3, 7)}, {day.slice(8, 10)}
                  </Text>
                </View>

                <FlatList
                  data={dayForecast}
                  horizontal={true}
                  keyExtractor={(item) => String(item.dt)}
                  ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={forecastStyles.infoText}>
                        {convertTemp(item.main.temp)}°{currentTempLetter}
                      </Text>

                      <WeatherIcon condition={item.weather[0].main} height="56px" width="56px" />

                      <Text style={forecastStyles.infoText}>
                        {new Date(item.dt * 1000).getHours().toFixed(2)}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <View style={forecastStyles.weatherBlock}>
                <Text style={forecastStyles.nextForecastTitle}>Next Forecast</Text>

                {nextForecast.map((day, i) => (
                  <View style={forecastStyles.nextForecast} key={day.dt}>
                    <Text style={forecastStyles.nextForecastDay}>
                      {new Date(day.dt * 1000)
                        .toLocaleString('en-US', { weekday: 'short' })
                        .slice(0, 3)}
                    </Text>

                    <WeatherIcon condition={day.weather[0].main} height="56px" width="56px" />

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={forecastStyles.nextForecastDay}>
                        {convertTemp(getMax(forecastInfo.slice(8 * i, 8 * i + 8)))}°
                        {currentTempLetter}
                        {'  '}
                      </Text>

                      <Text style={forecastStyles.nextForecastDayOpacity}>
                        {convertTemp(getMin(forecastInfo.slice(8 * i, 8 * i + 8)))}°
                        {currentTempLetter}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return <Spinner visible={true} />;
};
