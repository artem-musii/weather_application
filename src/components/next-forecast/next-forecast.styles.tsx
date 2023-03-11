import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';

export const nextForecastStyles = StyleSheet.create({
  nextForecast: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 64,
  },
  nextForecastTemp: {
    flexDirection: 'row',
  },
  nextForecastDay: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
  nextForecastDayOpacity: {
    fontSize: 18,
    color: COLORS.WHITE,
    opacity: 0.5,
  },
});
