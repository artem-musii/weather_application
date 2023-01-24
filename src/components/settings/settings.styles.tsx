import { StyleSheet } from 'react-native';
import { COLORS } from '../../consts/colors';
import { SIZES } from '../../consts/sizes';

export const settingsStyles = StyleSheet.create({
  container: {
    padding: SIZES.l,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: SIZES.s,
    color: COLORS.WHITE,
  },
  picker: {
    height: SIZES.xl,
    width: '100%',
    borderWidth: 0,
    borderColor: 'gray',
    padding: SIZES.s,
  },
  back: {
    marginBottom: SIZES.l,
    fontSize: SIZES.m,
    color: COLORS.WHITE,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: SIZES.m,
    padding: SIZES.m,
    backgroundColor: 'rgba(16, 64, 132, 0.3)',
    borderRadius: SIZES.s,
    color: COLORS.WHITE,
    marginBottom: SIZES.m,
  },
  inputAndroid: {
    fontSize: SIZES.m,
    paddingHorizontal: SIZES.s,
    paddingVertical: SIZES.s,
    backgroundColor: 'rgba(16, 64, 132, 0.3)',
    borderRadius: SIZES.s,
    color: COLORS.WHITE,
    paddingRight: SIZES.l,
    marginBottom: SIZES.m,
  },
});
