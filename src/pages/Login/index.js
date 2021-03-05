import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Image, SafeAreaView, View } from 'react-native';
import { Button, TextInput, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from '../../store/auth';
import { fetchUser, login as apiLogin } from '../../utils/api';
import styles from './styles';
import config from '~/config';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: config.LOGIN_USERNAME,
      password: config.LOGIN_PASSWORD,
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

  render() {
    const { username, password } = this.state;
    // console.log(this.props.theme.asset);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={this.props.theme.asset.logobig} style={styles.logoImage} />
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
          <Button style={{ marginTop: 24 }} mode="contained" onPress={this.onPressLogin}>
            Login
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
/*
<Triangle />
<View style={styles.bottomRedContainer}>
          <View style={styles.bottomContainer2Texts}>
            <Button>
              <Text style={styles.subtextOnPrimary}>Ny bruger</Text>
            </Button>
            <Button>
              <Text style={styles.subtextOnPrimary}>Glemt kodeord?</Text>
            </Button>
          </View>
        </View>
*/

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signIn,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Login));
