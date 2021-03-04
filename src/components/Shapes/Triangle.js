import React from 'react';
import { StyleSheet, TextPropTypes, useWindowDimensions, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Triangle() {
  return (
    <View
      style={{
        height: 0,
        borderBottomWidth: 112,
        borderBottomColor: useTheme().colors.primary,
        borderRightWidth: useWindowDimensions().width,
        borderRightColor: 'rgba(0,0,0,0)',
      }}
    ></View>
  );
}
