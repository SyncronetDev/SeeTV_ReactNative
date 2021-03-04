import { StyleSheet } from 'react-native';
import theme from '../../theme';
import { useTheme } from 'react-native-paper';

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

export default styles;
