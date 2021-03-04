import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Appearance, Dimensions } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './pages/Routes/HomeStack';
import LoginStack from './pages/Routes/LoginStack';
import apptheme from './theme';
import { Provider } from 'react-redux';
import { store } from './store/auth';

const Drawer = createDrawerNavigator();

class App extends Component {
  render() {
    const width = Dimensions.get('window').width;
    const isLargeScreen = width >= 768;
    return (
      <Provider store={store}>
        <PaperProvider
          theme={Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default}
        >
          <NavigationContainer
            theme={Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default}
          >
            <Drawer.Navigator
              theme={Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default}
              drawerContent={(props) => <CustomDrawerContent {...props} />}
              drawerType="front"
              drawerStyle={{
                backgroundColor:
                  Appearance.getColorScheme() === 'dark'
                    ? apptheme.dark.colors.drawer
                    : apptheme.default.colors.drawer,
              }}
              overlayColor="rgba(0,0,0,0.5)"
              initialRouteName="Login"
            >
              <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="menu" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Login"
                component={LoginStack}
                drawerType={isLargeScreen ? 'permanent' : 'back'}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="menu" size={size} color={color} />
                  ),
                }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}

/*
{isSignedIn ? (
              //Guest
              <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="menu" size={size} color={color} />
                  ),
                }}
              />
            ) : (
              //Viewer
              <Drawer.Screen
                name="Login"
                component={LoginStack}
                drawerType={isLargeScreen ? 'permanent' : 'back'}
                options={{
                  drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="menu" size={size} color={color} />
                  ),
                }}
              />
            )}
*/

function CustomDrawerContent(props) {
  // console.log(colors);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Close Menu"
        onPress={() => props.navigation.closeDrawer()}
        icon={({ color, size }) => <MaterialIcons name="close" size={size} color={color} />}
      />
      <DrawerItemList {...props}></DrawerItemList>
    </DrawerContentScrollView>
  );
}

export default App;

/*screenOptions={({ navigation }) => ({
      headerRight: () => <HeaderRight navigation={navigation} />,
    })}*/

/* ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ) */
