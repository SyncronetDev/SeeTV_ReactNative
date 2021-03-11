import AsyncStorage from '@react-native-async-storage/async-storage';
import { default as React, useContext } from 'react';
import {
  Provider as PaperProvider,
  Drawer as PaperDrawer,
  Avatar,
  Button,
  TouchableRipple,
  List,
  Divider,
} from 'react-native-paper';
import { fetchUser as apiFetchUser, login as apiLogin } from 'utils/api';
import AuthContext from 'src/store/AuthContext';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance, Dimensions, View, Text } from 'react-native';
import HomeStack from 'pages/Routes/HomeStack';
import LoginStack from 'pages/Routes/LoginStack';
import AccountStack from 'pages/Routes/AccountStack';
import StreamsStack from 'pages/Routes/StreamsStack';
import apptheme from 'app/theme';
import MaterialIcon from 'components/Icon/index';
import DrawerContent from './drawerComp/DrawerContent';

import TVGuide from '../pages/TVGuide/pages/TVGuide';

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: action.user,
            isSignedIn: true,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
            isSignedIn: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isSignedIn: false,
            user: null,
          };

        default:
          break;
      }
    },
    { isLoading: true, isSignout: false, userToken: null, user: null }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');

        // console.log({ userToken, _user });
      } catch (e) {
        console.log(e);
      }

      const _user = await apiFetchUser(userToken);

      dispatch({ type: 'RESTORE_TOKEN', token: userToken, user: _user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      user: () => {
        // console.log('juetraggbhnui');
        // console.log(state.user);
        // return state.user;
        if (state.user !== null) return state.user;
        else return !!console.log('ERROR: User is null');
      },
      isLoggedIn: () => {
        //const vstate = dispatch({ type: 'IS_SIGNED_IN' });
        // console.log('state: ');
        // console.log(state.isSignout);
        return !!state.user;
      },
      isSignedIn: () => {
        //const vstate = dispatch({ type: 'IS_SIGNED_IN' });
        // console.log('state: ');
        // console.log(state.isSignout);
        return state.isSignout;
      },
      signIn: async (data) => {
        const { username, password } = data;
        const _token = await apiLogin({ username, password });
        // console.log(_token);
        // console.log(_token);
        const _user = await apiFetchUser(_token);
        // console.log(_user);
        if (_token !== null) AsyncStorage.setItem('userToken', _token);
        // console.log(_user);
        if (_user !== null) console.log('Api log in');
        else console.log('Didnt log in');
        state.userToken = _token;
        state.user = _user;
        state.isSignout = false;
        state.isSignedIn = true;

        dispatch({ type: 'SIGN_IN', token: _token, user: _user });

        // console.log(state.user);
      },
      signOut: () => {
        state.userToken = null;
        state.user = null;
        state.isSignout = true;
        state.isSignedIn = false;
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'signupToken' });
      },
    }),
    []
  );

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
            {authContext.isLoggedIn() ? (
              <>
                <Drawer.Screen name="Guide" component={HomeStack} />
                <Drawer.Screen name="Account" component={AccountStack} />
                <Drawer.Screen name="Streams" component={StreamsStack} />
                <Drawer.Screen name="TVGuide" component={TVGuide} />
              </>
            ) : (
              //TV GUIDE
              <>
                <Drawer.Screen name="Guide" component={HomeStack} />
                <Drawer.Screen name="Login" component={LoginStack} />
                <Drawer.Screen name="TVGuide" component={TVGuide} />
              </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}

// function CustomDrawerContent(props) {
//   const { isLoggedIn, signOut, user } = useContext(AuthContext);

//   const theme = Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default;

//   // console.log(user());
//   //user().username.toString()
//   // console.log(colors);
//   return (
//     <DrawerContentScrollView {...props}>
//       {user() ? (
//         <View>
//           <Avatar.Text
//             label={user().initials.toString().toUpperCase()}
//             size={64}
//             style={{ marginHorizontal: 20, marginTop: 20 }}
//           />
//           <List.Section
//             style={{ marginHorizontal: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 4 }}
//           >
//             <List.Accordion
//               title={user().username}
//               description={user().email}
//               style={{ marginLeft: 0 }}
//             >
//               <Divider style={{ marginLeft: 16 }} />
//               <MDDrawerListItem
//                 {...props}
//                 title="Administrer konto"
//                 route="Account"
//                 parentRoute="Account"
//                 icon="account-circle-outline"
//                 communityIcon={true}
//                 isNested={true}
//               />

//               <MDDrawerListItem
//                 {...props}
//                 title="Konto instillinger"
//                 route="Settings"
//                 parentRoute="Account"
//                 icon="menu"
//                 communityIcon={false}
//                 isNested={true}
//               />
//               <MDDrawerListItem
//                 {...props}
//                 title="Log ud"
//                 icon="logout"
//                 communityIcon={true}
//                 isNested={true}
//                 onPress={() => {
//                   props.navigation.closeDrawer();
//                   signOut();
//                 }}
//               />
//             </List.Accordion>
//             <Divider />
//           </List.Section>
//           <MDDrawerListItem
//             {...props}
//             title="Guide"
//             route="Guide"
//             icon="television-guide"
//             communityIcon={true}
//             style={{ marginTop: 0 }}
//           />
//           <Divider />

//           <MDDrawerListItem
//             {...props}
//             title="Kultur og Fritid"
//             icon="layers-search"
//             communityIcon={false}
//             style={{ marginTop: 0 }}
//             iconRight={true}
//             onPress={() => console.log('display channels')}
//           />
//           <Divider />
//           <Text style={{ marginLeft: 24, fontSize: 12, marginTop: 16, color: 'gray' }}>
//             Kultur og Fritid
//           </Text>
//           <MDDrawerListItem
//             {...props}
//             title="Opret"
//             route="Create"
//             parentRoute="Streams"
//             icon="plus"
//             communityIcon={true}
//             style={{ marginTop: 0, alignItems: 'center', justifyContent: 'center' }}
//           />
//           <MDDrawerListItem
//             {...props}
//             title="Streams"
//             route="Streams"
//             icon="view-stream"
//             communityIcon={false}
//             style={{ marginTop: 0 }}
//           />
//         </View>
//       ) : (
//         <View>
//           <MDDrawerListItem
//             {...props}
//             title="Login"
//             route="Login"
//             icon="login"
//             communityIcon={true}
//             style={{ marginTop: 0 }}
//           />
//           <MDDrawerListItem
//             {...props}
//             title="Guide"
//             route="Guide"
//             icon="television-guide"
//             communityIcon={true}
//             style={{ marginTop: 0 }}
//           />
//         </View>
//       )}
//       {/* {<DrawerItemList {...props}></DrawerItemList>} */}
//     </DrawerContentScrollView>
//   );
// }

const DrawerItemStyle = (props, routeName) => {
  return props.state.routes[props.state.index].name === routeName
    ? { backgroundColor: 'black', borderRadius: 4, overflow: 'hidden' }
    : { backgroundColor: 'transparent', borderRadius: 4, overflow: 'hidden' };
};

// function MDDrawerListItem(props) {
//   /**
//       onPress={() => props.navigation.navigate(route)}

//    * */
//   const theme = Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default;
//   const isSelected = props.state.routes[props.state.index].name === props.route;
//   //console.log(MaterialIcon());
//   return (
//     <List.Item
//       {...props}
//       onPress={
//         props.onPress
//           ? props.onPress
//           : () =>
//               !!props.parentRoute
//                 ? props.navigation.navigate(props.parentRoute, {
//                     screen: props.route,
//                     initial: false,
//                   })
//                 : props.navigation.navigate(props.route)
//       }
//       title={props.title}
//       theme={{
//         colors: {
//           text: isSelected ? theme.colors.drawerTextSelected : theme.colors.drawerText,
//         },
//       }}
//       style={[
//         props.style,
//         props.isNested
//           ? {}
//           : {
//               marginHorizontal: 8,
//               marginVertical: 4,
//             },
//         isSelected
//           ? {
//               backgroundColor: theme.colors.drawerHighlight,
//             }
//           : { backgroundColor: 'transparent' },
//         { borderRadius: 4, overflow: 'hidden', justifyContent: 'center' },
//       ]}
//       left={() =>
//         !props.iconRight ? (
//           <MaterialIcon
//             color={theme.colors.drawerIcon}
//             icon={props.icon}
//             iconSize={24}
//             communityIcon={props.communityIcon}
//             style={[
//               props.isNested
//                 ? { marginLeft: -4, marginVertical: 0 }
//                 : { marginLeft: -4, marginVertical: 0 },
//               { marginLeft: 8, paddingVertical: 4 },
//             ]}
//           />
//         ) : (
//           <></>
//         )
//       }
//       right={() =>
//         props.iconRight ? (
//           <List.Icon
//             color={theme.colors.drawerIcon}
//             icon={props.icon}
//             style={
//               props.isNested
//                 ? { marginRight: -4, marginVertical: 0 }
//                 : { marginRight: -4, marginVertical: 0 }
//             }
//           />
//         ) : (
//           <></>
//         )
//       }
//     />
//   );
// }

/*
{isLoggedIn() ? (
        <DrawerItem
          label="Log ud"
          onPress={() => {
            props.navigation.closeDrawer();
            signOut();
          }}
          icon={({ color, size }) => <MaterialIcons name="logout" size={size} color={color} />}
        />
      ) : (
        <></>
      )}
*/
