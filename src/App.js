/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

const TVGuidePage = React.lazy(() => import('./pages/TVGuidePage'));

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <StatusBar
        barStyle={scheme === 'dark' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer theme={scheme === 'dark' ? theme.dark : theme.light}>
        <Stack.Navigator>
          <Stack.Screen name="TVGuide" component={TVGuidePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

const theme = {
  dark: {
    ...DarkTheme,
  },

  light: {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,
      primary: '#A60402',
      background: '#ffffff',
      card: '#fefefe',
      text: '#0d0d0d',
      border: '#D91828',
      notification: '#CC0000',
    },
  },
};

export default App;
