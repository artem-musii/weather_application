import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';
import { SIZES } from '../../consts/sizes';

export const locationStyles = StyleSheet.create({
  container: {
    paddingTop: SIZES.l,
    paddingHorizontal: SIZES.l,
  },
  back: {
    marginBottom: SIZES.l,
    fontSize: SIZES.m,
    color: COLORS.WHITE,
  },
  input: {
    width: '100%',
    padding: SIZES.m,
    backgroundColor: 'rgba(16, 64, 132, 0.3)',
    marginBottom: SIZES.l,
    borderRadius: SIZES.m,
    color: COLORS.WHITE,
  },
  suggestion: {
    justifyContent: 'space-between',
    padding: SIZES.m,
    backgroundColor: 'rgba(16, 64, 132, 0.3)',
    color: COLORS.WHITE,
    marginBottom: SIZES.s,
  },
});
