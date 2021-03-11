import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { Colors, configureFonts } from 'react-native-paper';
import color from 'color';

const Primary = '#A60402';
const Accent = '#03dac4';

export default theme = {
  default: {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    dark: false,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      primary: Primary,
      accent: Accent,
      background: '#f6f6f6',
      surface: '#f9f9f9',
      card: '#f9f9f9',
      drawer: '#fff',
      drawerIcon: Primary,
      drawerHighlight: color(Primary).alpha(0.14).rgb().string(),
      drawerText: '#000000',
      drawerTextSelected: Primary,
      border: '#00ff00',
      error: '#B00020',
      text: '#000000',
      onBackground: '#000000',
      onSurface: '#000000',
      disabled: '#00000041', //color(colors.black).alpha(0.26).rgb().string(),
      placeholder: '#00000089', //color(colors.black).alpha(0.54).rgb().string(),
      backdrop: '#0000007f', //color(colors.black).alpha(0.5).rgb().string(),
      notification: '#F50057', //colors.pinkA400,
    },
    animation: {
      scale: 1.0,
    },
    asset: {
      logobig: require('assets/theme/default/logo-big.png'),
    },
  },
  dark: {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,

      primary: Primary,
      accent: Accent,
      drawer: '#323232',
      drawerIcon: color(Primary).whiten(35).rgb().string(),
      drawerHighlight: color(Primary).whiten(40).alpha(0.14).rgb().string(),
      drawerText: '#D0D0D0',
      drawerTextSelected: '#D0D0D0',
    },
    asset: {
      logobig: require('assets/theme/dark/logo-big.png'),
    },
  },
};
// export default { apptheme, appdarktheme };
