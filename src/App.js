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
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import TVGuidePage from './pages/TVGuidePage';

const Stack = createStackNavigator();

// The entry point using a react navigation stack navigation
// gets wrapped by the I18nextProvider enabling using translations
// https://github.com/i18next/react-i18next#i18nextprovider
const App: () => React$Node = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <StatusBar
        barStyle={scheme === 'dark' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer theme={scheme === 'dark' ? theme.dark : theme.light}>
        <Stack.Navigator>
          <I18nextProvider i18n={i18n}>
            <Stack.Screen Name="TVGuide" component={TVGuidePage} />
          </I18nextProvider>
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
