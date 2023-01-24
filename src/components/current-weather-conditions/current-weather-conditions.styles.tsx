import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';
import { SIZES } from '../../consts/sizes';

export const currentConditionsStyles = StyleSheet.create({
  currentWeatherConditions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentWeatherConditionsTitle: {
    fontSize: SIZES.m,
    color: COLORS.WHITE,
    paddingLeft: SIZES.s,
  },
  currentWeatherConditionsData: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
