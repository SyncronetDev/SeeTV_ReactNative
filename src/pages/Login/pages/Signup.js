import React from 'react';
import { Text, Appearance, Image, StyleSheet, View, SafeAreaView, Linking } from 'react-native';
import apptheme from 'app/theme';
import styles from '../styles';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import Triangle from '../../../components/Shapes/Triangle';
import Links from 'app/links';

export default class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
    eightTeenConfirm: false,
    readPolicy: false,
  };

  onChangeUserName = (username) => this.setState({ username });

  onChangePassword = (password) => this.setState({ password });
  onChangePasswordRepeat = (passwordRepeat) => this.setState({ passwordRepeat });
  onChangeEightTeenConfirm = (eightTeenConfirm) => this.setState({ eightTeenConfirm });
  onChangereadPolicy = (readPolicy) => this.setState({ readPolicy });

  render() {
    const { username, password, repeatPassword, eightTeenConfirm, readPolicy } = this.state;
    const theme = Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default;
    return (
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
            textContentType="password"
            autoCompleteType="password"
            label="kodeord"
            value={password}
            onChangeText={this.onChangePassword}
            secureTextEntry
            style={{ marginTop: 5 }}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            dense={true}
            autoCompleteType="password"
            label="Gentag kodeord"
            value={repeatPassword}
            onChangeText={this.onChangePasswordRepeat}
            secureTextEntry
            style={{ marginTop: 5 }}
            mode="outlined"
          />
          <Checkbox.Item
            label="Ja, jeg er over 18"
            style={styles.checkBox}
            status={eightTeenConfirm ? 'checked' : 'unchecked'}
            onPress={() => this.onChangeEightTeenConfirm(!eightTeenConfirm)}
            color={theme.colors.primary}
          />
          <Checkbox.Item
            label="Ja, Jeg har læst og accepterer vilkårene for brug"
            style={styles.checkBox}
            status={readPolicy ? 'checked' : 'unchecked'}
            onPress={() => this.onChangereadPolicy(!readPolicy)}
            color={theme.colors.primary}
          />
          <Button
            style={{ marginTop: 24 }}
            mode="contained"
            onPress={() => {
              console.log('Sign up');
            }}
          >
            Opret
          </Button>
        </View>
        <Triangle />
        <View style={styles.bottomRedContainer}>
          <View style={styles.bottomContainer2Texts}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}
            >
              <Text style={styles.subtextOnPrimary}>Allerede en bruger?</Text>
            </Button>
            <Button
              onPress={() => {
                Linking.openURL(Links.Conditions);
              }}
            >
              <Text style={styles.subtextOnPrimary}>Betingelser</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
