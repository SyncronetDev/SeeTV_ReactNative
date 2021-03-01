import React, { Component } from 'react';
import { Button } from 'react-native';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, openDrawer } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        <Drawer.Navigator>
          <Drawer.Screen
            name="Login"
            component={LoginStack}
            options={({ navigation }) => ({
              title: 'Products',
              drawerIcon: ({ focused, size }) => <Icon name="rocket" size={30} color="#900" />,
              headerLeftContainerStyle: { paddingLeft: 10 },
            })}
          />
          <Drawer.Screen
            name="Home"
            component={() => (
              <Stack.Navigator screenOptions={Header}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                  name="Streamer"
                  component={Streamer}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Viewer" component={Viewer} />
              </Stack.Navigator>
            )}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
const Header = ({ navigation }) => ({
  headerShown: true,
  headerLeft: () => <Button title="info" color="#AAAAAA" onPress={() => navigation.openDrawer()} />,
});
/*function Header({ navigation }) {
  return {
    headerShown: true,
    headerLeft: () => (
      <Button title="info" color="#AAAAAA" onPress={() => navigation.openDrawer()} />
    ),
  };
}*/

export default App;

/*
function HomeStack() {
  //screenOptions={Header(navigation)}
  return (
    <Stack.Navigator screenOptions={Header}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Streamer" component={Streamer} options={{ headerShown: false }} />
      <Stack.Screen name="Viewer" component={Viewer} />
    </Stack.Navigator>
  );
}*/

const LoginStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} headerShown={true} />
  </Stack.Navigator>
);
/*screenOptions={({ navigation }) => ({
      headerRight: () => <HeaderRight navigation={navigation} />,
    })}*/
