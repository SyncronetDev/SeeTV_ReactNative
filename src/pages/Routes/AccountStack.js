import Header from './Header';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { Account, Settings } from '../Account';

const Stack = createStackNavigator();

export default function AccountStack() {
  //screenOptions={Header(navigation)}
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation, previous }) => (
          <Header scene={scene} navigation={navigation} previous={previous} />
        ),
      }}
      initialRouteName="Account"
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
