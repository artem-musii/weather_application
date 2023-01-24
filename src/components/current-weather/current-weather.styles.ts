import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';
import { SIZES } from '../../consts/sizes';

export const currentWeatherStyles = StyleSheet.create({
  temp: {
    fontSize: SIZES.xl,
    color: COLORS.WHITE,
    marginBottom: SIZES.s,
  },
  description: {
    fontSize: SIZES.m,
    lineHeight: SIZES.m + 4,
    color: COLORS.WHITE,
    marginBottom: SIZES.l,
    textAlign: 'center',
  },
});
