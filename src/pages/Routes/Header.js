import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from 'react-native-vector-icons';

// export default class Header extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       navigation: props.navigation,
//       previous: props.navigation.previous,

//       scene: props.scene,
//       options: props.scene.descriptor,

//       title:
//         props.scene.descriptor.options.headerTitle !== undefined
//           ? props.scene.descriptor.headerTitle
//           : props.scene.descriptor.title !== undefined
//           ? props.scene.descriptor.title
//           : props.scene.route.name,
//     };
//   }

//   render() {
//     return (
//       <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={{ height: 56 }}>
//         {previous ? (
//           <Appbar.BackAction onPress={navigation.pop} color={theme.colors.primary} />
//         ) : (
//           <TouchableOpacity
//             onPress={() => {
//               navigation.openDrawer();
//             }}
//           >
//             <MaterialIcons name="menu" size={24} style={{ paddingLeft: 8, paddingRight: 16 }} />
//           </TouchableOpacity>
//         )}
//         <Appbar.Content title={title} size={16} style={{ paddingLeft: 0, marginLeft: 0 }} />
//       </Appbar.Header>
//     );
//   }
// }

// function Header({ scene, navigation, previous }) {
//   const { options } = scene.descriptor;
//   const title =
//     options.headerTitle !== undefined
//       ? options.headerTitle
//       : options.title !== undefined
//       ? options.title
//       : scene.route.name;

//   return (
//     <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={{ height: 56 }}>
//       {previous ? (
//         <Appbar.BackAction onPress={navigation.pop} color={theme.colors.primary} />
//       ) : (
//         <TouchableOpacity
//           onPress={() => {
//             navigation.openDrawer();
//           }}
//         >
//           <MaterialIcons name="menu" size={24} style={{ paddingLeft: 8, paddingRight: 16 }} />
//         </TouchableOpacity>
//       )}
//       <Appbar.Content title={title} size={16} style={{ paddingLeft: 0, marginLeft: 0 }} />
//     </Appbar.Header>
//   );
// }

// export { Header };
