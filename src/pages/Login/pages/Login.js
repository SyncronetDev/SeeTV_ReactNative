import React from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Appearance,
} from 'react-native';
import { Button, TextInput, withTheme } from 'react-native-paper';
import config from 'app/config';
import { fetchUser, login as apiLogin } from 'utils/api';
import Triangle from 'components/Shapes/Triangle';
import styles from '../styles';
import AuthContext from '../../../store/AuthContext';
import apptheme from 'app/theme';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'tbj',
      password: 'password',
    };
  }

  onPressLogin = async () => {
    const { username, password } = this.state;

    if (username === '') return Alert.alert('Please input username');
    if (password === '') return Alert.alert('Please input password');

    const {
      navigation: { navigate },
    } = this.props;

    const token = await apiLogin({ username, password });
    const user = await fetchUser(token);

    await this.props.signIn({ token, user });

    return navigate('HomeStack', {
      screen: 'Home',
      params: { username },
    }); //.navigate('Home', { username });
  };

  onChangeUserName = (username) => this.setState({ username });

  onChangePassword = (password) => this.setState({ password });

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidShow);
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow(e) {
    console.log(e);
  }
  keyboardDidHide(e) {
    console.log(e);
  }

  render() {
    const { username, password } = this.state;
    // console.log(this.props.theme.asset);
    // console.log(this.props);

    const theme = Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default;
    return (
      <AuthContext.Consumer>
        {(authContext) => (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <Image source={theme.asset.logobig} style={styles.logoImage} />
              <TextInput
                autoCompleteType="email"
                dense={true}
                style={styles.input}
                placeholderTextColor="gray"
                value={username}
                onChangeText={this.onChangeUserName}
                autoCorrect={false}
                label="Email"
                mode="outlined"
              />
              <TextInput
                style={styles.input}
                dense={true}
                autoCompleteType="password"
                label="Password"
                value={password}
                onChangeText={this.onChangePassword}
                secureTextEntry
                style={{ marginTop: 5 }}
                mode="outlined"
              />
              <Button
                style={{ marginTop: 24 }}
                mode="contained"
                onPress={() => {
                  if (username === '') return Alert.alert('Please input username');
                  if (this.state.password === '') return Alert.alert('Please input password');

                  authContext.signIn({ username, password });
                }}
              >
                Login
              </Button>
              <Text>{authContext.isSignedIn}</Text>
            </View>
            <KeyboardAvoidingView behavior="height">
              <Triangle />
              <View style={styles.bottomRedContainer}>
                <View style={styles.bottomContainer2Texts}>
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('Signup');
                    }}
                  >
                    <Text style={styles.subtextOnPrimary}>Ny bruger</Text>
                  </Button>
                  <Button>
                    <Text style={styles.subtextOnPrimary}>Glemt kodeord?</Text>
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        )}
      </AuthContext.Consumer>
    );
  }
}
