import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import apptheme from 'app/theme';
import AccountStack from 'pages/Routes/AccountStack';
import HomeStack from 'pages/Routes/HomeStack';
import LoginStack from 'pages/Routes/LoginStack';
import StreamsStack from 'pages/Routes/StreamsStack';
import React from 'react';
import { Appearance } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthContext from 'src/store/AuthContext';
import {
  authenticate,
  user as apiFetchUser,
  login as apiLogin,
  register as apiRegister,
} from 'utils/api';
import TVGuide from '../pages/TVGuide/pages/TVGuide';
import DrawerContent from './drawerComp/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_IN':
          AsyncStorage.setItem('userToken', action.token);
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('userToken');
          return {
            ...prevState,
            userToken: null,
            user: null,
          };

        default:
          break;
      }
    },
    { userToken: null, user: null }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          try {
            const _user = await authenticate(userToken);
            dispatch({ type: 'RESTORE_TOKEN', token: userToken, user: _user });
          } catch (err) {
            console.log('Invalid user token; signing out.');
            authContext.signOut();
          }
        }
      } catch (err) {
        console.log('restore token failed');
        console.log(err);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    user: state.user,
    isSignedIn: !!state.user,
    signIn: async ({ username, password }) => {
      const _token = await apiLogin({ username, password });
      const _user = await apiFetchUser();

      state.userToken = _token;
      state.user = _user;

      dispatch({ type: 'SIGN_IN', token: _token, user: _user });
    },
    signOut: () => {
      state.userToken = null;
      state.user = null;
      dispatch({ type: 'SIGN_OUT' });
    },
    signUp: async ({ username, password }) => {
      const _token = await apiRegister({ username, password });
      const _user = await apiFetchUser();

      dispatch({ type: 'SIGN_IN', token: _token, user: _user });
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider
        theme={Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default}
      >
        <NavigationContainer
          theme={Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default}
        >
          <Drawer.Navigator
            theme={Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default}
            drawerContent={(props) => <DrawerContent {...props} />}
            drawerType="front"
            drawerStyle={{
              backgroundColor:
                Appearance.getColorScheme() === 'dark'
                  ? apptheme.dark.colors.drawer
                  : apptheme.default.colors.drawer,
            }}
            overlayColor="rgba(0,0,0,0.5)"
          >
            {authContext.user ? (
              <>
                <Drawer.Screen name="Guide" component={HomeStack} />
                <Drawer.Screen name="Account" component={AccountStack} />
                <Drawer.Screen name="Streams" component={StreamsStack} />
                <Drawer.Screen name="TVGuide" component={TVGuide} />
              </>
            ) : (
              //TV GUIDE
              // <Drawer.Screen name="Guide" component={HomeStack} />

              <>
                <Drawer.Screen name="TVGuide" component={TVGuide} />
                <Drawer.Screen name="Login" component={LoginStack} />
              </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
