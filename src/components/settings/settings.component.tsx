import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import { pickerSelectStyles, settingsStyles } from './settings.styles';
import { setUnits } from '../../services/units.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Settings: React.FC = () => {
  const navigation = useNavigation();
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState('Km/h');

  void (async () => {
    const temp = await AsyncStorage.getItem('temp');
    const wind = await AsyncStorage.getItem('wind');

    if (!temp) {
      await AsyncStorage.setItem('temp', temperatureUnit);

      return;
    }

    if (!wind) {
      await AsyncStorage.setItem('wind', windSpeedUnit);

      return;
    }

    setTemperatureUnit(temp);
    setWindSpeedUnit(wind);
  })();

  const handleWindSpeedUnitChange = async (value: string) => {
    await setUnits('wind', value);
    setWindSpeedUnit(value);
  };

  const handleTempUnitChange = async (value: string) => {
    await setUnits('temp', value);
    setTemperatureUnit(value);
  };

  const temperatureUnits = [
    { label: 'Celsius', value: 'Celsius' },
    { label: 'Fahrenheit', value: 'Fahrenheit' },
    { label: 'Kelvin', value: 'Kelvin' },
  ];

  const windSpeedUnits = [
    { label: 'Km/h', value: 'Km/h' },
    { label: 'm/s', value: 'm/s' },
    { label: 'Mph', value: 'Mph' },
  ];

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#29b2dd', '#3ad', '#2dc8ea']}>
      <SafeAreaView>
        <View style={settingsStyles.container}>
          <Text
            style={settingsStyles.back}
            onPress={() => navigation.navigate('Forecast' as never)}
          >
            {'<'} Go back
          </Text>
          <Text style={settingsStyles.label}>Temperature Unit:</Text>
          <RNPickerSelect
            items={temperatureUnits}
            value={temperatureUnit}
            onValueChange={(itemValue: string) => {
              void (async () => {
                await handleTempUnitChange(itemValue);
              })();
            }}
            style={pickerSelectStyles}
            placeholder={{}}
          />

          <Text style={settingsStyles.label}>Wind Speed Unit:</Text>
          <RNPickerSelect
            items={windSpeedUnits}
            value={windSpeedUnit}
            onValueChange={(itemValue: string) => {
              void (async () => {
                await handleWindSpeedUnitChange(itemValue);
              })();
            }}
            style={pickerSelectStyles}
            placeholder={{}}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
