import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  openDrawer,
  DrawerContentItem,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './pages/Login';
import Home from './pages/Home';
import Streamer from './pages/Streamer';
import Viewer from './pages/Viewer';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import TVGuide from './pages/TVGuide/TVGuide';

import { Appbar } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Login" component={LoginStack} />
            <Drawer.Screen name="HomeStack" component={HomeStack} />
            <Drawer.Screen name="Loginpage" component={LoginPage} />
            <Drawer.Screen name="TVGuide" component={TVGuide} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

const CloseDrawerElement = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = '';
  let newGroup = true;
  return (
    <SafeAreaView>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const { drawerLabel, activeTintColor, groupName } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View>
                  <Text key={groupName} style={{ marginLeft: 16 }}>
                    {groupName}
                  </Text>
                  <View />
                </View>
              ) : null}
              <DrawerItem
                key={route.key}
                label={({ color }) => <Text style={{ color }}>{drawerLabel}</Text>}
                focused={state.routes.findIndex((e) => e.name === route.name) === state.index}
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const Header = ({ scene, navigation, previous }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={{ height: 56 }}>
      {previous ? (
        <Appbar.BackAction onPress={navigation.pop} color={theme.colors.primary} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <MaterialIcons name="menu" size={24} style={{ paddingLeft: 8, paddingRight: 16 }} />
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} size={16} style={{ paddingLeft: 0, marginLeft: 0 }} />
    </Appbar.Header>
  );
};
/*
<Drawer.Screen
              name="Login"
              component={LoginStack}
              options={({ navigation }) => ({
                title: 'Products',
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons name="login" size={30} color="#900" />
                ),
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









*/
/*const Header = ({ navigation }) => ({
  headerShown: true,
  headerLeft: () => <Button title="info" color="#AAAAAA" onPress={() => navigation.openDrawer()} />,
});
function Header({ navigation }) {
  return {
    headerShown: true,
    headerLeft: () => (
      <Button title="info" color="#AAAAAA" onPress={() => navigation.openDrawer()} />
    ),
  };
}*/

export default App;

function HomeStack() {
  //screenOptions={Header(navigation)}
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: Header,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Streamer" component={Streamer} options={{ headerShown: false }} />
      <Stack.Screen name="Viewer" component={Viewer} />
    </Stack.Navigator>
  );
}

const LoginStack = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      header: Header,
    }}
  >
    <Stack.Screen name="Login" component={Login} headerShown={true} />
  </Stack.Navigator>
);
/*screenOptions={({ navigation }) => ({
      headerRight: () => <HeaderRight navigation={navigation} />,
    })}*/

/* ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ) */
