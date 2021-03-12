import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import LiveStreamCard from './LiveStreamCard';
import styles from './styles';
import AuthContext from '../../store/AuthContext';

class Home extends React.Component {
  state = {
    refreshing: false,
    listLiveStream: [],
  };

  async componentDidMount() {
    const streams = await this.fetchStreams();

    this.setState({
      listLiveStream: streams,
    });
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
    const { route, user } = this.props;
    // console.log({ user });
    const userName = "get(route, 'params.userName', 'Default');";
    const { listLiveStream } = this.state;

    // console.dir(listLiveStream);
    // console.log(userName);
    return (
      <AuthContext.Consumer>
        {(authcontext) => {
          return (
            <SafeAreaView style={styles.container}>
              <Text style={styles.welcomeText}>Welcome : {authcontext.user.username}</Text>
              <Text style={styles.title}>List live stream video</Text>
              <FlatList
                refreshControl={
                  <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
                contentContainerStyle={styles.flatList}
                data={listLiveStream}
                renderItem={({ item }) => (
                  <LiveStreamCard data={item} onPress={this.onPressCardItem} />
                )}
              />
              <TouchableOpacity style={styles.liveStreamButton} onPress={this.onPressLiveStreamNow}>
                <Text style={styles.textButton}>LiveStream Now</Text>
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default Home;
