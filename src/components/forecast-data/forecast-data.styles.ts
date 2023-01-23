import { StyleSheet } from 'react-native';

export const forecastStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
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
  nextForecastDayOpacity: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.5,
  },
});
