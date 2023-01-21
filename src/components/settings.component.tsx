import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';

export const Settings: React.FC = () => {
  const navigation = useNavigation();
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState('Km/h');

  const temperatureUnits = [
    { label: 'Celsius', value: 'Celsius' },
    { label: 'Fahrenheit', value: 'Fahrenheit' },
  ];

  const windSpeedUnits = [
    { label: 'Km/h', value: 'Km/h' },
    { label: 'm/s', value: 'm/s' },
    { label: 'Mph', value: 'Mph' },
  ];

  const styles = StyleSheet.create({
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

  const pickerSelectStyles = StyleSheet.create({
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

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#29b2dd', '#3ad', '#2dc8ea']}>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.back} onPress={() => navigation.navigate('Forecast' as never)}>
            {'<'} Go back
          </Text>
          <Text style={styles.label}>Temperature Unit:</Text>
          <RNPickerSelect
            items={temperatureUnits}
            value={temperatureUnit}
            onValueChange={(itemValue: string) => setTemperatureUnit(itemValue)}
            style={pickerSelectStyles}
            placeholder={{}}
          />

          <Text style={styles.label}>Wind Speed Unit:</Text>
          <RNPickerSelect
            items={windSpeedUnits}
            value={windSpeedUnit}
            onValueChange={(itemValue: string) => setWindSpeedUnit(itemValue)}
            style={pickerSelectStyles}
            placeholder={{}}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
