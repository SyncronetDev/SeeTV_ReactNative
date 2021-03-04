import Header from './Header';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login/index';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, navigation, previous }) => (
          <Header scene={scene} navigation={navigation} previous={previous} />
        ),
      }}
    >
      <Stack.Screen name="Login" component={Login} headerShown={true} />
    </Stack.Navigator>
  );
}
