import React, { Component } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './pages/Login';
import Home from './pages/Home';
import Streamer from './pages/Streamer';
import Viewer from './pages/Viewer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          headerShown={true}
          screenOptions={{
            headerRight: () => <Button title="info" color="#A60402" />,
          }}
        >
          <Drawer.Screen name="Login" component={Login} headerShown={true} />
          <Drawer.Screen name="Home" component={HomeStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
/*
const Header = {
  screenOptions = {{}}
}*/

/*
    screenOptions={{
      headerShown: true,
      headerLeft: () => <Button title="info" color="#AAAAAA" />,
    }}
  )
}*/

export default App;

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => <Button title="info" color="#AAAAAA" />,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Streamer" component={Streamer} options={{ headerShown: false }} />
      <Stack.Screen name="Viewer" component={Viewer} />
    </Stack.Navigator>
  );
}

function LoginStack() {
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerLeft: () => <Button title="info" color="#AAAAAA" />,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Streamer" component={Streamer} options={{ headerShown: false }} />
    <Stack.Screen name="Viewer" component={Viewer} />
  </Stack.Navigator>;
}
