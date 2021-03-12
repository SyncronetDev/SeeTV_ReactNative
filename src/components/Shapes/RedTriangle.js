import React from 'react';
import { StyleSheet, TextPropTypes, useWindowDimensions, View } from "react-native";

export default function triangle() {
    return(
        <View style={{
            height: 0,
            borderBottomWidth: 112,
            borderBottomColor: "#A60402",
            borderRightWidth: useWindowDimensions().width,
            borderRightColor: "rgba(0,0,0,0)"
        }}>
        </View>
    );
}