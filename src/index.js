import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import store from './store/auth';

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

/*screenOptions={({ navigation }) => ({
      headerRight: () => <HeaderRight navigation={navigation} />,
    })}*/

/* ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ) */
