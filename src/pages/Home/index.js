import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import styles from './styles';
import LiveStreamCard from './LiveStreamCard';
import { openDrawer } from '@react-navigation/drawer';

class Home extends React.Component {
  constructor(props) {
    super(props);
    //const [refreshing, setRefreshing] = React.useState(false);
    this.state = {
      refreshing: false,
      listLiveStream: [],
    };
  }

  async componentDidMount() {
    const streams = await this.fetchStreams();

    this.setState({ listLiveStream: streams });
  }

  onPressLiveStreamNow = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', 'Default');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Streamer', { userName, roomName: userName });
  };

  onPressCardItem = (data) => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', 'Default');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Viewer', { userName, data });
  };

  async fetchStreams() {
    const response = await fetch(`https://rtmp.seetv.dk/hls/`);

    const json = await response.json();

    return json.filter((item) => item.name.includes('.m3u8'));
  }

  /*onRefresh() {
    React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  }*/

  onRefresh = async () => {
    this.setState({ refreshing: true });
    const streams = await this.fetchStreams();

    this.setState({ listLiveStream: streams });
    this.setState({ refreshing: false });
  };
  /*
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh()} />}*/

  render() {
    const { route } = this.props;
    const userName = get(route, 'params.userName', 'Default');
    const { listLiveStream } = this.state;
    const refreshing = this.state;

    console.dir(listLiveStream);
    console.log(userName);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome : {userName}</Text>
        <Text style={styles.title}>List live stream video</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
          contentContainerStyle={styles.flatList}
          data={listLiveStream}
          renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
        />
        <TouchableOpacity style={styles.liveStreamButton} onPress={this.onPressLiveStreamNow}>
          <Text style={styles.textButton}>LiveStream Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

Home.propTypes = {
  route: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Home.defaultProps = {
  route: null,
};

export default Home;
