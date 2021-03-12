import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Params: icon, color, size, style, communityIcon
// const MaterialIcon = ({ iconSize, style, communityIcon, icon, color }) => {
//   //   console.log(props);
//   //   if (communityIcon === false) {
//   //     console.log('MaterialIcon denied');
//   //     return;
//   //   }
//   //console.log(iconSize);
//   return communityIcon ? (
//     <MaterialCommunityIcons
//       name={icon || 'menu'}
//       color={color || 'black'}
//       size={iconSize || 24}
//       style={style || defaultStyle.icon}
//     />
//   ) : (
//     <MaterialIcons
//       name={icon || 'menu'}
//       color={color || 'black'}
//       size={iconSize || 24}
//       style={style || defaultStyle.icon}
//     />
//   );
// };
//size={size !== null ? size : 24}
//size={size !== null ? size : 24}

const defaultStyle = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

// export default MaterialIcon;

export default class MaterialIcon extends React.Component {
  render() {
    const { iconSize, style, communityIcon, icon, color } = this.props;
    return !!communityIcon ? (
      <MaterialCommunityIcons
        name={icon || 'menu'}
        color={color || 'black'}
        size={iconSize || 24}
        style={style || defaultStyle.icon}
      />
    ) : (
      <MaterialIcons
        name={icon || 'menu'}
        color={color || 'black'}
        size={iconSize || 24}
        style={style || defaultStyle.icon}
      />
    );
  }
}
