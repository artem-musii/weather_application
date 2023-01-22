import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ForecastData } from './src/components/forecast-data/forecast-data.component';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Settings } from './src/components/settings/settings.component';
import { Location } from './src/components/location/location.component';
import { Provider } from 'react-redux';
import store from './src/store/store';

function App() {
  const queryClinet = new QueryClient();
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClinet}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Forecast">
            <Stack.Screen
              name="Forecast"
              component={ForecastData}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
