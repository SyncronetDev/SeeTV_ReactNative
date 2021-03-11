import get from 'lodash/get';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import ChatInputGroup from 'components/ChatInputGroup';
import MessagesList from 'components/MessagesList/MessagesList';
import { RTMP_SERVER } from 'src/app/config';
import SocketManager from '../../socketManager';
import { audioConfig, LIVE_STATUS, videoConfig } from 'utils/constants';
import Logger from 'utils/logger';
import styles from './styles';

class Streamer extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props;
    const roomName = get(route, 'params.roomName');
    const userName = get(route, 'params.userName', '');
    // console.log(userName);
    this.state = {
      currentLiveStatus: LIVE_STATUS.PREPARE,
      enabledFlash: false,
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      isLive: false,
      //btnStartStopProgress: new Animated.Value(0),
    };
    this.roomName = roomName;
    this.userName = userName;
  }

  componentDidMount() {
    this.requestCameraPermission();
    SocketManager.instance.emitPrepareLiveStream({
      userName: this.userName,
      roomName: this.roomName,
    });
    SocketManager.instance.emitJoinRoom({
      userName: this.userName,
      roomName: this.roomName,
    });
    SocketManager.instance.listenBeginLiveStream((data) => {
      const currentLiveStatus = get(data, 'liveStatus', '');
      this.setState({ currentLiveStatus });
    });
    SocketManager.instance.listenFinishLiveStream((data) => {
      const currentLiveStatus = get(data, 'liveStatus', '');
      this.setState({ currentLiveStatus });
    });
    SocketManager.instance.listenSendHeart(() => {
      this.setState((prevState) => ({ countHeart: prevState.countHeart + 1 }));
    });
    SocketManager.instance.listenSendMessage((data) => {
      const messages = get(data, 'messages', []);
      this.setState({ messages });
    });

    /*Animated.timing(this.state.btnStartStopProgress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();*/
  }

  componentWillUnmount() {
    if (this.nodeCameraViewRef) this.nodeCameraViewRef.stop();
    SocketManager.instance.emitLeaveRoom({
      userName: this.userName,
      roomName: this.roomName,
    });
  }

  onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: this.roomName,
    });
  };

  onPressSend = (message) => {
    SocketManager.instance.emitSendMessage({
      roomName: this.roomName,
      userName: this.userName,
      message,
    });
    this.setState({ isVisibleMessages: true });
  };

  onEndEditing = () => this.setState({ isVisibleMessages: true });

  onFocusChatGroup = () => {
    this.setState({ isVisibleMessages: false });
  };

  onPressClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onPressLiveStreamButton = () => {
    const { navigation, route } = this.props;
    const userName = get(route, 'params.userName', '');
    const { currentLiveStatus } = this.state;
    if (Number(currentLiveStatus) === Number(LIVE_STATUS.PREPARE)) {
      /**
       * Waiting live stream
       */
      // SocketManager.instance.emitBeginLiveStream({ userName, roomName: userName });
      // SocketManager.instance.emitJoinRoom({ userName, roomName: userName });
      if (this.nodeCameraViewRef) this.nodeCameraViewRef.start();
    } else if (Number(currentLiveStatus) === Number(LIVE_STATUS.ON_LIVE)) {
      /**
       * Finish live stream
       */
      // SocketManager.instance.emitFinishLiveStream({ userName, roomName: userName });
      if (this.nodeCameraViewRef) this.nodeCameraViewRef.stop();
      Alert.alert(
        'Alert ',
        'Thanks for your live stream',
        [
          {
            text: 'Okay',
            onPress: () => {
              navigation.goBack();
              //SocketManager.instance.emitLeaveRoom({ userName, roomName: userName });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        {
          title: 'LiveStreamExample need Camera And Microphone Permission',
          message:
            'LiveStreamExample needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (this.nodeCameraViewRef) this.nodeCameraViewRef.startPreview();
      } else {
        Logger.log('Camera permission denied');
      }
    } catch (err) {
      Logger.warn(err);
    }
  };

  renderChatGroup = () => {
    return (
      <ChatInputGroup
        onPressHeart={this.onPressHeart}
        onPressSend={this.onPressSend}
        onFocus={this.onFocusChatGroup}
        onEndEditing={this.onEndEditing}
      />
    );
  };

  renderListMessages = () => {
    const { messages, isVisibleMessages } = this.state;
    if (!isVisibleMessages) return null;
    return <MessagesList messages={messages} />;
  };

  setCameraRef = (ref) => {
    this.nodeCameraViewRef = ref;
  };

  render() {
    const { route } = this.props;
    const { currentLiveStatus, countHeart } = this.state;

    const userName = this.props.user.username; //get(route, 'params.userName', '');
    const outputUrl = `rtmp://${RTMP_SERVER}/show/${userName}`;

    // console.log({ outputUrl });

    /*
    <TouchableOpacity
              onPress={() => {
                const { enabledFlash } = this.state;
                this.setState({ enabledFlash: !enabledFlash });
                console.log(enabledFlash);
                this.nodeCameraViewRef.flashEnable(enabledFlash);
              }}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            */
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <NodeCameraView
          style={styles.streamerView}
          ref={this.setCameraRef}
          outputUrl={outputUrl}
          camera={{ cameraId: 0, cameraFrontMirror: true }}
          audio={audioConfig}
          video={videoConfig}
          smoothSkinLevel={3}
          autopreview={true}
        />

        <SafeAreaView style={styles.contentWrapper}>
          <View>
            <View style={styles.header}>
              <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.sideBarRight}>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => {
                  this.nodeCameraViewRef.switchCamera();
                }}
              >
                <MaterialIcons name="flip-camera-android" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              const { isLive } = this.state;
              if (!this.state.isLive) {
                this.setState({ btnStartStopProgress: 150 });
                this.btn_record.play(51, 150);
                this.onPressLiveStreamButton();
                this.setState({ isLive: !isLive });
              } else {
                this.onPressClose();
              }
            }}
          >
            <LottieView
              //progress={this.state.btnStartStopProgress}
              style={styles.btnStartStop}
              ref={(animation) => {
                this.btn_record = animation;
              }}
              source={require('../../assets/Streaming/recordstop-button.json')}
              loop={false}
              progress={50}
            ></LottieView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </SafeAreaView>
    );

    /*
<LiveStreamActionButton
                currentLiveStatus={currentLiveStatus}
                onPress={this.onPressLiveStreamButton}
              />
    */
    /*
<View style={styles.btnStartStop}>
            <TouchableWithoutFeedback
              style={styles.btnStartStop}
              onPress={() => {
                this.nodeCameraViewRef.switchCamera();
                if (this.state.isLive) {
                  this.btn_record.play(0, 150);
                } else {
                  this.btn_record.play(151, 241);
                }
              }}
            >
              <LottieView
                ref={(animation) => {
                  this.btn_record = animation;
                }}
                source={require('../../assets/Streaming/recordstop-button.json')}
                loop={false}
              ></LottieView>
            </TouchableWithoutFeedback>
          </View>
    */
    /* 
              <MaterialIcons name="fiber-manual-record" size={48} color="red" />
<SafeAreaView style={styles.contentWrapper}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
              <Image
                style={styles.icoClose}
                source={require('../../assets/close.png')}
                tintColor="white"
              />
            </TouchableOpacity>
            <LiveStreamActionButton
              currentLiveStatus={currentLiveStatus}
              onPress={this.onPressLiveStreamButton}
            />
          </View>
          <View style={styles.center} />
          <View style={styles.footer}>
            {this.renderChatGroup()}
            {this.renderListMessages()}
          </View>
        </SafeAreaView>
        <FloatingHearts count={countHeart} />
    */
  }
}

Streamer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  route: PropTypes.shape({}),
};

Streamer.defaultProps = {
  navigation: {
    goBack: null,
  },
  route: null,
};
const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(Streamer);
