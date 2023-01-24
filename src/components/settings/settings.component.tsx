import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import { pickerSelectStyles, settingsStyles } from './settings.styles';
import { useDispatch, useSelector } from 'react-redux';
import { WeatherState } from '../../store/reducer';
import { setTemperatureUnit, setWindSpeedUnit } from '../../store/reducer';
import { WindSpeedUnits } from '../../enums/wind-speed-units';
import { WeatherTempUnits } from '../../enums/weather-temp-units';
import { COLORS } from '../../consts/colors';
import { ROUTER_KEYS } from '../../app-keys/app-keys';

export const Settings: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const weather = useSelector((state: { weather: WeatherState }) => state.weather);
  const { temperatureUnit, windSpeedUnits } = weather;

  const handleWindSpeedUnitChange = (value: WindSpeedUnits) => {
    dispatch(setWindSpeedUnit(value));
  };

  const handleTempUnitChange = (value: WeatherTempUnits) => {
    dispatch(setTemperatureUnit(value));
  };

  const temparatureData = [
    { label: 'Celsius', value: 'Celsius' },
    { label: 'Fahrenheit', value: 'Fahrenheit' },
    { label: 'Kelvin', value: 'Kelvin' },
  ];

  const windSpeedData = [
    { label: 'km/h', value: 'km/h' },
    { label: 'm/s', value: 'm/s' },
    { label: 'Mph', value: 'Mph' },
  ];

  return (
    <LinearGradient style={{ flex: 1 }} colors={COLORS.GRADIENT}>
      <SafeAreaView>
        <View style={settingsStyles.container}>
          <Text
            style={settingsStyles.back}
            onPress={() => navigation.navigate(ROUTER_KEYS.FORECAST as never)}
          >
            {'<'} Go back
          </Text>
          <Text style={settingsStyles.label}>Temperature Unit:</Text>
          <RNPickerSelect
            items={temparatureData}
            value={temperatureUnit}
            onValueChange={handleTempUnitChange}
            style={pickerSelectStyles}
            placeholder={{}}
          />

          <Text style={settingsStyles.label}>Wind Speed Unit:</Text>
          <RNPickerSelect
            items={windSpeedData}
            value={windSpeedUnits}
            onValueChange={handleWindSpeedUnitChange}
            style={pickerSelectStyles}
            placeholder={{}}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
