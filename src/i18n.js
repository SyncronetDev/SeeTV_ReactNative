import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import i18nextReactNativeLanguageDetector from 'i18next-react-native-language-detector';
import Backend from 'i18next-fs-backend';

i18n
  .use(i18nextReactNativeLanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    backend: {
      // path where resources get loaded from, or a function
      // returning a path:
      // function(lngs, namespaces) { return customPath; }
      // the returned path will interpolate lng, ns if provided like giving a static path
      loadPath: '/translations/{{lng}}/{{ns}}.json',

      // path to post missing resources
      addPath: '/translations/{{lng}}/{{ns}}.missing.json',
    },

    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
