import { createStackNavigator } from 'react-navigation-stack';
import Header from './Header';
import React from 'react';
import Home from '../Home/index';

const title = 'Home';
const screens = {
  Home: {
    screen: Home,
    navigationOptions: (navigation, { title }) => {
      return {
        headerTitle: (navigation, { title }) => <Header />,
      };
    },
  },
};

export default screens;
