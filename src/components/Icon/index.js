import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const defaultStyle = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

export default function MaterialIcon({ iconSize, style, communityIcon, icon, color }) {
  return communityIcon ? (
    <MaterialCommunityIcons name={icon} color={color} size={iconSize} style={style} />
  ) : (
    <MaterialIcons name={icon} color={color} size={iconSize} style={style} />
  );
}

MaterialIcon.propTypes = {
  iconSize: PropTypes.string,
  style: Object,
  communityIcon: PropTypes.bool,
  icon: PropTypes.string,
  color: PropTypes.string,
};

MaterialIcon.defaultProps = {
  iconSize: 24,
  style: defaultStyle.icon,
  communityIcon: false,
  icon: 'menu',
  color: 'black',
};
