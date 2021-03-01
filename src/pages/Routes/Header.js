import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

export default function Header({ navigation, title }) {
  const openMenu = () => {
    navigation.openMenu();
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{title.ToString()}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    header: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icons: {
      position: 'absolute',
      left: 16,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#333',
      letterSpacing: 1,
    },
  });
}
