import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Create, Streams } from '../Streams';
import Header from './Header';

const Stack = createStackNavigator();

export default function StreamsStack() {
  // screenOptions={Header(navigation)}
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
