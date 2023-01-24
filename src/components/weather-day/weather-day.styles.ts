import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';

export const weatherDayStyles = StyleSheet.create({
  weatherDayTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  weatherDaySubtitle: {
    color: COLORS.WHITE,
    fontSize: 20,
    shadowOffset: { width: -2, height: 3 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 1,
  },
  weatherDayDate: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
  weatherDayInfo: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.WHITE,
  },
});
