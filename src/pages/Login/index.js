import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { TextInput, useTheme, withTheme, Button } from 'react-native-paper';
import styles from './styles';
import { login as apiLogin, fetchUser } from '../../utils/api';
import { signIn } from '../../store/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Triangle from './../../components/Shapes/Triangle';
import LoginStack from './../Routes/LoginStack';

class Login extends React.Component {
  state = {
    username: 'tbj',
    password: 'password',
  };

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
