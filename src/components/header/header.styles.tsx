import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';

export const headerStyles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
});
