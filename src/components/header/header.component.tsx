import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { headerStyles } from './header.styles';
import { ROUTER_KEYS } from '../../app-keys/app-keys';

type Props = {
  cityName: string;
};

export const Header: React.FC<Props> = ({ cityName }) => {
  const navigation = useNavigation();

  return (
    <View style={headerStyles.header}>
      <TouchableOpacity>
        <Text
          onPress={() => navigation.navigate(ROUTER_KEYS.LOCATION as never)}
          style={headerStyles.title}
        >
          {cityName}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          onPress={() => navigation.navigate(ROUTER_KEYS.SETTINGS as never)}
          style={headerStyles.title}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};
