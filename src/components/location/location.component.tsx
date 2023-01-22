import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ISuggestions, ISuggestion, ICoords } from '../../types/forecast.type';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { locationStyles } from './location.styles';
import { useDispatch } from 'react-redux';
import { setLat, setLon } from '../../store/reducer';

export const Location: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSelection = (coords: ICoords) => {
    dispatch(setLat(String(coords.lat)));
    dispatch(setLon(String(coords.lon)));
    navigation.navigate('Forecast' as never);
  };

  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const getSuggestions = async (text: string) => {
    console.log(text);
    const weatherAPIKey = '35bcd86aaa2f86e435cf470a0a344c7e';
    const weatherAPIUrl = `http://api.openweathermap.org/data/2.5/find?q=${text}&appid=${weatherAPIKey}`;
    try {
      const response: { data: ISuggestions } = await axios.get(weatherAPIUrl);
      const currentSuggestions: ISuggestions = response.data;
      console.log(currentSuggestions);

      setSuggestions(currentSuggestions.list);
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#29b2dd', '#3ad', '#2dc8ea']}>
      <SafeAreaView>
        <View style={locationStyles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Forecast' as never)}>
            <Text style={locationStyles.back}>{'<'} Go back</Text>
          </TouchableOpacity>

          <TextInput
            style={locationStyles.input}
            onChange={(e) => {
              void (async () => await getSuggestions(e.nativeEvent.text))();
            }}
            placeholder="Type a location"
            returnKeyType="search"
          />

          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelection(item.coord)}>
                <Text style={locationStyles.suggestion}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
