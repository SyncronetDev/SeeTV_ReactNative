import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import React from 'react';
import styles from './styles';

const permissions = async () => {
  const granted = await PermissionsAndroid.requestMultiple(
    [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
    {
      title: 'LiveStreamExample need Camera And Microphone Permission',
      message: 'LiveStreamExample needs access to your camera so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );

  return (
    granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
    granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
  );
};

export default async function Streamer({ broadcast, navigation }) {
  const permissionsGranted = await permissions();

  if (!permissionsGranted) {
    Alert.alert('Kamera nægtet', 'Kan ikke streame uden kamera og lyd adgang.');

    return (
      <SafeAreaView style={styles.container}>
        <Text>Kamera nægtet</Text>
      </SafeAreaView>
    );
  }

  const nodeCameraViewRef = React.createRef();
  const stopStreaming = () => {
    nodeCameraViewRef.current.stop();
    navigation.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <NodeCameraView
        ref={nodeCameraViewRef}
        style={styles.streamerView}
        outputUrl={broadcast.ingest_url}
        camera={{ cameraId: 0, cameraFrontMirror: true }}
        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
        video={{
          preset: 1,
          bitrate: 500000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        smoothSkinLevel={3}
        autopreview
      />

      <SafeAreaView style={styles.contentWrapper}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.btnClose} onPress={stopStreaming}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.sideBarRight}>
            <TouchableOpacity style={styles.actionIcon} onPress={nodeCameraViewRef.switchCamera}>
              <MaterialIcons name="flip-camera-android" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={stopStreaming}>
          <LottieView
            style={styles.btnStartStop}
            source={require('../../assets/Streaming/recordstop-button.json')}
            loop={false}
            progress={50}
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaView>
  );
}
