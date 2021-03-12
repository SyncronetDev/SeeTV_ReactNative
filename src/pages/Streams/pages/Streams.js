import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import AuthContext from 'src/store/AuthContext';
import styles from './styles';
import { getPlannedBroadcasts } from 'src/utils/api';
import PropTypes from 'prop-types';

const statuses = {
  idle: '',
  loading: 'loading',
  rejected: 'rejected',
  resolved: 'resolved',
};

function StreamsView({ user, navigation }) {
  const [status, setStatus] = React.useState(statuses.idle);
  const [error, setError] = React.useState(null);
  const [currentPublisher, setCurrentPublisher] = React.useState();
  const [currentChannel, setCurrentChannel] = React.useState();
  const [plannedBroadcasts, setPlannedBroadcasts] = React.useState();

  const fetchPlannedBroadcasts = async () => {
    try {
      setStatus(statuses.loading);

      const { broadcasts } = await getPlannedBroadcasts(currentChannel);

      setPlannedBroadcasts(broadcasts);

      setStatus(statuses.resolved);
    } catch (err) {
      setStatus(statuses.rejected);
      setError(err.message || err);
    }
  };

  React.useEffect(() => {
    if (user && user.publishers && user.publishers.length > 0) {
      setCurrentPublisher(user.publishers[0]);
      setCurrentChannel(user.publishers[0].channels[0]);
    }
  }, [user]);

  React.useEffect(() => {
    if (currentChannel) {
      fetchPlannedBroadcasts();
    }
  }, [currentChannel]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{status}</Text>
      {error && <Text style={styles.title}>{error}</Text>}

      <Text style={styles.welcomeText}>Welcome : {user.username}</Text>
      <Text style={styles.title}>List live stream video</Text>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={status === statuses.loading}
            onRefresh={fetchPlannedBroadcasts}
          />
        }
        contentContainerStyle={styles.flatList}
        data={plannedBroadcasts}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.liveStreamButton}
            onPress={navigation.navigate('Streamer', {
              broadcast: item,
              navigation,
            })}
          >
            <Text style={styles.textButton}>LiveStream Now</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

StreamsView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    publishers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        channels: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.Number,
            name: PropTypes.string,
            channel_key: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,

  navigation: PropTypes.shape({}).isRequired,
};

export default function Streams({ navigation }) {
  return (
    <AuthContext.Consumer>
      {(authcontext) => (
        <StreamsView user={authcontext.user} styles={styles} navigation={navigation} />
      )}
    </AuthContext.Consumer>
  );
}

Streams.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};
