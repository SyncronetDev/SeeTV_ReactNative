import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';
import AuthContext from 'src/store/AuthContext';
import MDDrawerListItem from './MDDrawerListItem';

export default function DrawerContent(props) {
  const { signOut, user } = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      {user ? (
        <View>
          <Avatar.Text
            label={user.initials.toString().toUpperCase()}
            size={64}
            style={{ marginHorizontal: 20, marginTop: 20 }}
          />
          <List.Section
            style={{ marginHorizontal: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 4 }}
          >
            <List.Accordion
              title={user.username}
              description={user.email}
              style={{ marginLeft: 0 }}
            >
              <Divider style={{ marginLeft: 16 }} />
              <MDDrawerListItem
                {...props}
                title="Administrer konto"
                route="Account"
                parentRoute="Account"
                icon="account-circle-outline"
                communityIcon
                isNested
              />

              <MDDrawerListItem
                {...props}
                title="Indstillinger"
                route="Settings"
                parentRoute="Account"
                icon="menu"
                communityIcon={false}
                isNested
              />
              <MDDrawerListItem
                {...props}
                title="Log ud"
                icon="logout"
                communityIcon
                isNested
                onPress={() => {
                  props.navigation.closeDrawer();
                  signOut();
                }}
              />
            </List.Accordion>
            <Divider />
          </List.Section>
          <MDDrawerListItem
            {...props}
            title="Guide"
            route="Guide"
            icon="television-guide"
            communityIcon
            style={{ marginTop: 0 }}
          />
          <Divider />
          <Text style={{ marginLeft: 24, fontSize: 12, marginTop: 16, color: 'gray' }}>
            VÆLG UDGIVER OG KANAL
          </Text>
          <MDDrawerListItem
            {...props}
            title="Kultur og Fritid"
            icon="layers-search"
            communityIcon={false}
            style={{ marginTop: 0 }}
            iconRight
            onPress={() => console.log('display channels')}
          />
          <Divider />
          <Text style={{ marginLeft: 24, fontSize: 12, marginTop: 16, color: 'gray' }}>
            Kultur og Fritid
          </Text>
          <MDDrawerListItem
            {...props}
            title="Opret"
            route="Create"
            parentRoute="Streams"
            icon="plus"
            communityIcon
            style={{ marginTop: 0, alignItems: 'center', justifyContent: 'center' }}
          />
          <MDDrawerListItem
            {...props}
            title="Streams"
            route="Streams"
            icon="view-stream"
            communityIcon={false}
            style={{ marginTop: 0 }}
          />
        </View>
      ) : (
        <View>
          <MDDrawerListItem
            {...props}
            title="Login"
            route="Login"
            icon="login"
            communityIcon
            style={{ marginTop: 0 }}
          />
          <MDDrawerListItem
            {...props}
            title="Guide"
            route="Guide"
            icon="television-guide"
            communityIcon
            style={{ marginTop: 0 }}
          />
          <MDDrawerListItem
            {...props}
            title="TVGuide"
            route="TVGuide"
            icon="television-guide"
            communityIcon
            style={{ marginTop: 0 }}
          />
        </View>
      )}
      {/* {<DrawerItemList {...props}></DrawerItemList>} */}
    </DrawerContentScrollView>
  );
}
