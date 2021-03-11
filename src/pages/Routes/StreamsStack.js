import Header from './Header';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { Streams, Create } from '../Streams';

const Stack = createStackNavigator();

export default function StreamsStack() {
  //screenOptions={Header(navigation)}
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation, previous }) => (
          <Header scene={scene} navigation={navigation} previous={previous} />
        ),
      }}
      initialRouteName="Streams"
    >
      <Stack.Screen name="Streams" component={Streams} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  );
}
