import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Text, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { requestLocationPermission } from '../../services/permissions.service';
import { useNavigation } from '@react-navigation/native';
import { getForecast } from '../../services/forecast.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherIcon } from '../../helpers/weather-icon';
import { WeatherCondition } from '../../enums/weather-conditions';
import { forecastStyles } from './forecast-data.styles';
import Spinner from 'react-native-loading-spinner-overlay';

export const ForecastData: React.FC = () => {
  const { data: forecastData } = useQuery('forecast', getForecast);
  const [lat, setLat] = useState<null | string>(null);
  const [lon, setLon] = useState<null | string>(null);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState('Km/h');
  const navigation = useNavigation();

  void (async () => {
    const temp = await AsyncStorage.getItem('temp');
    const wind = await AsyncStorage.getItem('wind');

    if (!temp) {
      await AsyncStorage.setItem('temp', temperatureUnit);

      return;
    }

    if (!wind) {
      await AsyncStorage.setItem('wind', windSpeedUnit);

      return;
    }

    setTemperatureUnit(temp);
    setWindSpeedUnit(wind);
  })();

  const convertTemp = (temp: number) => {
    switch (temperatureUnit) {
      case 'Celsius':
        return Math.round(temp - 273.15);
      case 'Fahrenheit':
        return Math.round((temp - 273.15) * (9 / 5) + 32);
      default:
        return Math.round(temp);
    }
  };

  useEffect(() => {
    void (async () => {
      await requestLocationPermission();
      console.log(lat, lon);

      setLat(await AsyncStorage.getItem('lat'));
      setLon(await AsyncStorage.getItem('lon'));
    })();
  }, [lat, lon, temperatureUnit, windSpeedUnit]);

  if (forecastData) {
    const dayForecast = forecastData.list.slice(0, 8);
    const nextForecast = forecastData.list.filter((_, i) => i % 8 === 0);
    const date = new Date(forecastData.list[0].dt * 1000);
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const currentCondition = forecastData.list[0].weather[0].main;
    const forecastInfo = forecastData.list;
    const currentTempLetter = temperatureUnit.slice(0, 1);

    return (
      <LinearGradient colors={['#29b2dd', '#3ad', '#2dc8ea']}>
        <SafeAreaView>
          <ScrollView>
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
                Max.{convertTemp(forecastData.list[0].main.temp_max)}° Min.
                {convertTemp(forecastInfo[0].main.temp_min)}°
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
                      {Math.round(forecastInfo[0].wind.speed * 3.6)}km/h
                    </Text>
                  </View>
                </View>
              </View>

              <View style={forecastStyles.weatherBlock}>
                <View style={forecastStyles.weatherBlockTitle}>
                  <Text style={forecastStyles.title}>Today</Text>

                  <Text style={forecastStyles.titleData}>
                    {monthName}, {day}
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

                {nextForecast.map((day) => (
                  <View style={forecastStyles.nextForecast} key={day.dt}>
                    <Text style={forecastStyles.nextForecastDay}>
                      {
                        new Date(day.dt * 1000)
                          .toLocaleString('en-US', { weekday: 'short' })
                          .split(',')[0]
                      }
                    </Text>

                    <WeatherIcon condition={day.weather[0].main} height="56px" width="56px" />

                    <Text style={forecastStyles.nextForecastDay}>
                      {convertTemp(day.main.temp)}°{currentTempLetter}
                    </Text>
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
