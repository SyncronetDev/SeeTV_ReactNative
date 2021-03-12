// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import RedTriangle from '../components/Shapes/RedTriangle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  logoImage: {
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 32,
    marginTop: 48,
  },
  bottomRedContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#A60402',
    justifyContent: 'center',
  },
  bottomContainer2Texts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  subtextOnPrimary: {
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'none',
    color: '#fff',
  },
});

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // If we do NOT want a stylesheet that acts as a function with a props array, then we should remove this, props array, and remove all props var calls in all places where the stylesheet is used,
  // this however means that we can't use for example deviceWidth in the stylesheet.

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require('../assets/zome-red.png')} style={styles.logoImage} />
        <TextInput
          value={email}
          onChangeText={(val) => setEmail(val)}
          autoCompleteType="email"
          mode="outlined"
          label="Email"
          dense
          theme={{ colors: { primary: '#A60402' } }}
        />
        <TextInput
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={{ marginTop: 5 }}
          autoCompleteType="password"
          mode="outlined"
          label="Password"
          dense
          secureTextEntry
          theme={{ colors: { primary: '#A60402' } }}
        />
        <View style={{ marginTop: 24 }}>
          <Button theme={{ colors: { primary: '#A60402' } }} mode="contained">
            hello world
          </Button>
        </View>
      </View>
      <RedTriangle />
      <View style={styles.bottomRedContainer}>
        <View style={styles.bottomContainer2Texts}>
          <Button>
            <Text style={styles.subtextOnPrimary}>Opret ny bruger</Text>
          </Button>
          <Button>
            <Text style={styles.subtextOnPrimary}>Har du glemt dit kodeord?</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
