import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from 'react-native-vector-icons';

const Header = ({ scene, navigation, previous }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction onPress={navigation.pop} color={theme.colors.primary} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Text>hahahaha</Text>
          <MaterialIcons name="menu" />
        </TouchableOpacity>
      )}
      <Appbar.Content title={previous ? title : <MaterialIcons name="menu" size={40} />} />
    </Appbar.Header>
  );
};

export default Header;
