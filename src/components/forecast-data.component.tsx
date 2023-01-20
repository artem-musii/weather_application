import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { requestLocationPermission } from '../services/permissions.service';
import { useNavigation } from '@react-navigation/native';
import { getForecast } from '../services/forecast.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import Logo from '../assets/images/sun-cloud.svg';
import Humidity from '../assets/images/humidity.svg';
import Rain from '../assets/images/rain.svg';
import Wind from '../assets/images/wind.svg';

export const ForecastData: React.FC = () => {
  const { data: forecastData } = useQuery('forecast', getForecast);
  const [lat, setLat] = useState<null | string>(null);
  const [lon, setLon] = useState<null | string>(null);
  const navigation = useNavigation();

  useEffect(() => {
    void (async () => {
      await requestLocationPermission();

      setLat(await AsyncStorage.getItem('lat'));
      setLon(await AsyncStorage.getItem('lon'));
    })();
  }, [lat, lon]);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 64,
      paddingHorizontal: 40,
    },
    header: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    text: {
      fontSize: 18,
      color: '#fff',
    },
    temp: {
      fontSize: 64,
      color: '#fff',
      marginBottom: 8,
    },
    description: {
      fontSize: 18,
      lineHeight: 22,
      color: '#fff',
      marginBottom: 32,
      textAlign: 'center',
    },
    currentWeather: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    currentWeatherText: {
      fontSize: 18,
      color: '#fff',
      paddingLeft: 8,
    },
    currentWeatherData: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 8,
    },
    weatherBlock: {
      padding: 16,
      width: '100%',
      backgroundColor: 'rgba(16, 64, 132, 0.3)',
      borderRadius: 20,
      marginBottom: 20,
    },
    weatherBlockTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    title: {
      color: '#fff',
      fontSize: 20,
      shadowOffset: { width: -2, height: 3 },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowRadius: 1,
    },
    titleData: {
      color: '#fff',
      fontSize: 18,
    },
    infoText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#fff',
    },
    nextForecast: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 64,
    },
    nextForecastTitle: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 20,
    },
    nextForecastDay: {
      fontSize: 18,
      color: '#fff',
    },
  });

  if (forecastData) {
    const dayForecast = forecastData.list.slice(0, 8);
    const nextForecast = forecastData.list.filter((_, i) => i % 8 === 0);
    const date = new Date(forecastData.list[0].dt * 1000);
    const day = date.toLocaleString('default', { day: 'numeric' });
    const monthName = date.toLocaleString('default', { month: 'short' });
    console.log(lat, lon);

    return (
      <LinearGradient colors={['#29b2dd', '#3ad', '#2dc8ea']}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.text}>{forecastData.city.name}</Text>

              <Text onPress={() => navigation.navigate('Settings' as never)} style={styles.text}>
                Settings
              </Text>
            </View>

            <View>
              <Logo height="180px" />
            </View>

            <Text style={styles.temp}>{Math.round(forecastData.list[0].main.temp - 273.15)}°</Text>

            <Text style={styles.description}>
              {forecastData.list[0].weather[0].main}
              {'\n'}
              Max.{Math.round(forecastData.list[0].main.temp_max - 273.15)}° Min.
              {Math.round(forecastData.list[0].main.temp_min - 273.15)}°
            </Text>

            <View style={styles.weatherBlock}>
              <View style={styles.currentWeather}>
                <View style={styles.currentWeatherData}>
                  <Rain height="28px" width="28px" />
                  <Text style={styles.currentWeatherText}>{forecastData.list[0].pop * 100}%</Text>
                </View>

                <View style={styles.currentWeatherData}>
                  <Humidity height="28px" width="20px" />
                  <Text style={styles.currentWeatherText}>
                    {forecastData.list[0].main.humidity}%
                  </Text>
                </View>

                <View style={styles.currentWeatherData}>
                  <Wind height="28px" width="28px" />
                  <Text style={styles.currentWeatherText}>
                    {Math.round(forecastData.list[0].wind.speed * 3.6)}km/h
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.weatherBlock}>
              <View style={styles.weatherBlockTitle}>
                <Text style={styles.title}>Today</Text>

                <Text style={styles.titleData}>
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
                    <Text style={styles.infoText}>{Math.round(item.main.temp - 273.15)}°C</Text>

                    <Logo height="56px" width="56px" />

                    <Text style={styles.infoText}>
                      {new Date(item.dt * 1000).getHours().toFixed(2)}
                    </Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.weatherBlock}>
              <Text style={styles.nextForecastTitle}>Next Forecast</Text>

              {nextForecast.map((day) => (
                <View style={styles.nextForecast} key={day.dt}>
                  <Text style={styles.nextForecastDay}>
                    {
                      new Date(day.dt * 1000)
                        .toLocaleString('default', { weekday: 'short' })
                        .split(',')[0]
                    }
                  </Text>

                  <Logo height="56px" width="56px" />

                  <Text style={styles.nextForecastDay}>{Math.round(day.main.temp - 273.15)}°C</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return <Text>Loading...</Text>;
};
