import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './../Home/index';
import Streamer from './../Streamer/index';
import Viewer from './../Viewer/index';
import Header from './Header';

const Stack = createStackNavigator();

export default function HomeStack() {
  //screenOptions={Header(navigation)}
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation, previous }) => (
          <Header scene={scene} navigation={navigation} previous={previous} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Streamer" component={Streamer} options={{ headerShown: false }} />
      <Stack.Screen name="Viewer" component={Viewer} />
    </Stack.Navigator>
  );
}
