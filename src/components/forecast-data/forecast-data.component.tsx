import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Text, View, FlatList, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native';
import { requestLocationPermission } from '../../services/permissions.service';
import { getForecast } from '../../services/forecast.service';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherIcon } from '../../helpers/weather-icon';
import { forecastStyles } from './forecast-data.styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { IWeather } from '../../types/forecast.type';
import { useSelector } from 'react-redux';
import { WeatherState } from '../../store/reducer';
import { setLat, setLon } from '../../store/reducer';
import { useDispatch } from 'react-redux';
import { Header } from '../header/header.component';
import { WeatherBlock } from '../weather-block/weather-block';

export const ForecastData: React.FC = () => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);
  const dispatch = useDispatch();
  const { lat, lon } = useSelector((state: { weather: WeatherState }) => state.weather);
  const { data: forecastData, refetch } = useQuery('forecast', async () => {
    if (lat && lon) {
      const response = await getForecast(lat, lon);
      console.log(lat, lon);

      return response;
    } else {
      const { lat: latitude, lon: longtitude }: { lat: number; lon: number } =
        await requestLocationPermission();
      dispatch(setLat(String(latitude)));
      dispatch(setLon(String(longtitude)));
      const response = await getForecast(String(latitude), String(longtitude));
      console.log(lat, lon);

      return response;
    }
  });

  const getMonthName = (monthName: string) => {
    return Platform.OS === 'ios' ? monthName : monthName.slice(3, 7);
  };

  const getDay = (day: string, index: number) => {
    return Platform.OS === 'ios' ? day : day.slice(index, index + 3);
  };

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

  const getMin = (forecast: IWeather[]) => {
    return forecast.reduce((min, day) => Math.min(min, day.main.temp_min), Infinity);
  };

  const getMax = (forecast: IWeather[]) => {
    return forecast.reduce((max, day) => Math.max(max, day.main.temp_min), -Infinity);
  };

  useEffect(() => {
    void (async () => refetch())();
  }, [refetch, weather]);

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
              <Header cityName={forecastData.city.name} />

              <View>
                <WeatherIcon width="250px" height="180px" condition={currentCondition} />
              </View>

              <Text style={forecastStyles.temp}>{convertTemp(forecastInfo[0].main.temp)}°</Text>

              <Text style={forecastStyles.description}>
                {forecastInfo[0].weather[0].main}
                {'\n'}
                Max.{convertTemp(getMax(forecastInfo.slice(0, 8)))}° Min.
                {convertTemp(getMin(forecastInfo.slice(0, 8)))}°
              </Text>

              <WeatherBlock weatherData={forecastInfo[0]} />

              <View style={forecastStyles.weatherBlock}>
                <View style={forecastStyles.weatherBlockTitle}>
                  <Text style={forecastStyles.title}>Today</Text>

                  <Text style={forecastStyles.titleData}>
                    {getMonthName(monthName)}, {getDay(day, 8)}
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
                      {getDay(
                        new Date(day.dt * 1000).toLocaleString('en-US', { weekday: 'short' }),
                        0,
                      )}
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
