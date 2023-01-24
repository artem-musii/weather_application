import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { requestLocationPermission } from '../../services/permissions.service';
import { getForecast } from '../../services/forecast.service';
import { LinearGradient } from 'expo-linear-gradient';
import { forecastStyles } from './forecast-data.styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { WeatherState } from '../../store/reducer';
import { setLat, setLon } from '../../store/reducer';
import { useDispatch } from 'react-redux';
import { Header } from '../header/header.component';
import { CurrentWeatherConditions } from '../current-weather-conditions/current-weather-conditions.component';
import { WeatherDay } from '../weather-day/weather-day.component';
import { NextForecast } from '../next-forecast/next-forecast.component';
import { CurrentWeather } from '../current-weather/current-weather.component';
import { getMin } from '../../helpers/get-min';
import { getMax } from '../../helpers/get-max';
import { getMonthName } from '../../helpers/get-month-name';
import { getDay } from '../../helpers/get-day';
import { COLORS } from '../../consts/colors';

export const ForecastData: React.FC = () => {
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);
  const dispatch = useDispatch();
  const { lat, lon } = useSelector((state: { weather: WeatherState }) => state.weather);

  const { data: forecastData, refetch } = useQuery('forecast', async () => {
    if (lat && lon) {
      const response = await getForecast(lat, lon);

      return response;
    } else {
      const { lat: latitude, lon: longtitude }: { lat: number; lon: number } =
        await requestLocationPermission();

      dispatch(setLat(String(latitude)));
      dispatch(setLon(String(longtitude)));

      const response = await getForecast(String(latitude), String(longtitude));

      return response;
    }
  });

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

    return (
      <LinearGradient style={{ flex: 1 }} colors={COLORS.GRADIENT}>
        <SafeAreaView>
          <StatusBar />
        </SafeAreaView>
        <ScrollView>
          <View style={forecastStyles.container}>
            <Header cityName={forecastData.city.name} />

            <CurrentWeather
              minTemp={getMin(forecastInfo.slice(0, 8))}
              maxTemp={getMax(forecastInfo.slice(0, 8))}
              currentCondition={currentCondition}
              currentWeather={forecastInfo[0]}
            />

            <View style={forecastStyles.weatherContainer}>
              <CurrentWeatherConditions weatherData={forecastInfo[0]} />
            </View>

            <View style={forecastStyles.weatherContainer}>
              <WeatherDay
                monthName={getMonthName(monthName)}
                day={getDay(day, 8)}
                data={dayForecast}
              />
            </View>

            <View style={forecastStyles.weatherContainer}>
              <Text style={forecastStyles.nextForecastTitle}>Next Forecast</Text>

              {nextForecast.map((day, i) => (
                <NextForecast
                  dayName={getDay(
                    new Date(day.dt * 1000).toLocaleString('en-US', { weekday: 'short' }),
                    0,
                  )}
                  key={day.dt}
                  day={day}
                  maxTemp={getMax(forecastInfo.slice(8 * i, 8 * i + 8))}
                  minTemp={getMin(forecastInfo.slice(8 * i, 8 * i + 8))}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return <Spinner visible={true} />;
};
