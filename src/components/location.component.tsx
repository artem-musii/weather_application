import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ISuggestions, ISuggestion } from '../types/forecast.type';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { setCurrentLocation } from '../services/location.service';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export const Location: React.FC = () => {
  const navigation = useNavigation();

  const handleSelection = () => {
    void (async () => {
      try {
        await setCurrentLocation();
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('Forecast' as never);
      await setCurrentLocation();
    })();
  };

  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const getSuggestions = async (text: string) => {
    console.log(text);
    const weatherAPIKey = '35bcd86aaa2f86e435cf470a0a344c7e';
    const weatherAPIUrl = `http://api.openweathermap.org/data/2.5/find?q=${text}&appid=${weatherAPIKey}`;
    try {
      const response: { data: ISuggestions } = await axios.get(weatherAPIUrl);
      const currentSuggestions: ISuggestions = response.data;

      setSuggestions(currentSuggestions.list);
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };

  const screenHeight = Dimensions.get('screen').height;

  const styles = StyleSheet.create({
    container: {
      height: screenHeight,
      paddingTop: 40,
      paddingHorizontal: 40,
    },
    back: {
      marginBottom: 40,
      fontSize: 20,
      color: '#fff',
    },
    input: {
      width: '100%',
      padding: 16,
      backgroundColor: 'rgba(16, 64, 132, 0.3)',
      marginBottom: 40,
      borderRadius: 20,
    },
    suggestion: {
      width: '100%',
      padding: 16,
      backgroundColor: 'rgba(16, 64, 132, 0.3)',
      color: '#fff',
      marginBottom: 10,
    },
  });

  return (
    <LinearGradient colors={['#29b2dd', '#3ad', '#2dc8ea']}>
      <SafeAreaView>
        {/* <ScrollView> */}
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Forecast' as never)}>
            <Text style={styles.back}>{'<'} Go back</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            onChange={(e) => {
              void (async () => await getSuggestions(e.nativeEvent.text))();
            }}
            placeholder="Type a location"
            returnKeyType="search"
          />

          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelection()}>
                <Text style={styles.suggestion}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
