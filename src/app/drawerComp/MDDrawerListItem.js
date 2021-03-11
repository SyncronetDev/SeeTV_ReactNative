import apptheme from 'app/theme';
import MaterialIcon from 'components/Icon/index';
import { default as React } from 'react';
import { Appearance } from 'react-native';
import { List } from 'react-native-paper';

export default function MDDrawerListItem(props) {
  /**
      onPress={() => props.navigation.navigate(route)}
      
   * */
  const theme = Appearance.getColorScheme() === 'dark' ? apptheme.dark : apptheme.default;
  const isSelected = props.state.routes[props.state.index].name === props.route;
  //console.log(MaterialIcon());
  return (
    <List.Item
      {...props}
      onPress={
        props.onPress
          ? props.onPress
          : () =>
              !!props.parentRoute
                ? props.navigation.navigate(props.parentRoute, {
                    screen: props.route,
                    initial: false,
                  })
                : props.navigation.navigate(props.route)
      }
      title={props.title}
      theme={{
        colors: {
          text: isSelected ? theme.colors.drawerTextSelected : theme.colors.drawerText,
        },
      }}
      style={[
        props.style,
        props.isNested
          ? {}
          : {
              marginHorizontal: 8,
              marginVertical: 4,
            },
        isSelected
          ? {
              backgroundColor: theme.colors.drawerHighlight,
            }
          : { backgroundColor: 'transparent' },
        { borderRadius: 4, overflow: 'hidden', justifyContent: 'center' },
      ]}
      left={() =>
        !props.iconRight ? (
          <MaterialIcon
            color={theme.colors.drawerIcon}
            icon={props.icon}
            iconSize={24}
            communityIcon={props.communityIcon}
            style={[
              props.isNested
                ? { marginLeft: -4, marginVertical: 0 }
                : { marginLeft: -4, marginVertical: 0 },
              { marginLeft: 8, paddingVertical: 4 },
            ]}
          />
        ) : (
          <></>
        )
      }
      right={() =>
        props.iconRight ? (
          <List.Icon
            color={theme.colors.drawerIcon}
            icon={props.icon}
            style={
              props.isNested
                ? { marginRight: -4, marginVertical: 0 }
                : { marginRight: -4, marginVertical: 0 }
            }
          />
        ) : (
          <></>
        )
      }
    />
  );
}
