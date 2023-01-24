import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ISuggestions, ISuggestion, ICoords } from '../../types';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { locationStyles } from './location.styles';
import { useDispatch } from 'react-redux';
import { setLat, setLon } from '../../store/reducer';
import { API_KEYS } from '../../app-keys/app-keys';
import { COLORS } from '../../consts/colors';
import { ROUTER_KEYS } from '../../app-keys/app-keys';

export const Location: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSelection = (coords: ICoords) => {
    dispatch(setLat(String(coords.lat)));
    dispatch(setLon(String(coords.lon)));
    navigation.navigate(ROUTER_KEYS.FORECAST as never);
  };

  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const getSuggestions = async (text: string) => {
    const weatherAPIUrl = `${API_KEYS.API_URL}find?q=${text}&appid=${API_KEYS.API_KEY}`;
    try {
      const response: { data: ISuggestions } = await axios.get(weatherAPIUrl);
      const currentSuggestions: ISuggestions = response.data;

      setSuggestions(currentSuggestions.list);
    } catch {
      setSuggestions([]);
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={COLORS.GRADIENT}>
      <SafeAreaView>
        <View style={locationStyles.container}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTER_KEYS.FORECAST as never)}>
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
                <Text style={locationStyles.suggestion}>
                  {item.name}
                  {', '}
                  {item.sys.country}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.coord.lat)}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
