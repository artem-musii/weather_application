import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { headerStyles } from './header.styles';

type Props = {
  cityName: string;
};

export const Header: React.FC<Props> = ({ cityName }) => {
  const navigation = useNavigation();

  return (
    <View style={headerStyles.header}>
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate('Location' as never)} style={headerStyles.title}>
          {cityName}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text onPress={() => navigation.navigate('Settings' as never)} style={headerStyles.title}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};
