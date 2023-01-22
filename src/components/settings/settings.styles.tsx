import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 40,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 0,
    borderColor: 'gray',
    padding: 10,
  },
  back: {
    marginBottom: 40,
    fontSize: 20,
    color: '#fff',
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(16, 64, 132, 0.3)',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    marginBottom: 24,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(16, 64, 132, 0.3)',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    marginBottom: 20,
  },
});
