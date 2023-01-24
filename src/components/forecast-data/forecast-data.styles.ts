import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';
import { SIZES } from '../../consts/sizes';

export const forecastStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: SIZES.l,
    paddingHorizontal: SIZES.l,
  },
  weatherContainer: {
    padding: SIZES.m,
    width: '100%',
    backgroundColor: 'rgba(16, 64, 132, 0.3)',
    borderRadius: SIZES.m,
    marginBottom: SIZES.m,
  },
  nextForecastTitle: {
    fontSize: SIZES.m,
    color: COLORS.WHITE,
    marginBottom: SIZES.m,
  },
});
