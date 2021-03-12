import Pusher from 'pusher-js/react-native';
import Logger from './utils/logger';

const EVENT_JOIN_ROOM = 'join-room';
const EVENT_LEAVE_ROOM = 'leave-room';
const EVENT_LIST_LIVE_STREAM = 'list-live-stream';
const EVENT_BEGIN_LIVE_STREAM = 'begin-live-stream';
const EVENT_FINISH_LIVE_STREAM = 'finish-live-stream';
const EVENT_SEND_HEART = 'send-heart';
const EVENT_SEND_MESSAGE = 'send-message';
const EVENT_PREPARE_LIVE_STREAM = 'prepare-live-stream';
const EVENT_SEND_REPLAY = 'replay';

const streamingEvents = {
  EVENT_LIST_LIVE_STREAM,
  EVENT_BEGIN_LIVE_STREAM,
  EVENT_FINISH_LIVE_STREAM,
  EVENT_PREPARE_LIVE_STREAM,
  EVENT_SEND_REPLAY,
};

const chatEvents = {
  EVENT_JOIN_ROOM,
  EVENT_LEAVE_ROOM,
  EVENT_SEND_HEART,
  EVENT_SEND_MESSAGE,
};

class SocketManager {
  static instances = [];

  streamKey: string = null;

  socket = null;

  streamsChannel = null;

  chatChannel = null;

  callbacks = {};

  static instance(streamKey: string): SocketManager {
    if (SocketManager.instances[streamKey]) {
      return SocketManager.instances[streamKey];
    }

    const instance = new SocketManager(streamKey);

    SocketManager.instances[streamKey] = instance;

    return instance;
  }

  constructor(streamKey: string) {
    this.streamKey = streamKey;

    // Pusher.logToConsole = true;

    this.socket = new Pusher('6a1ba54dd534fd41a4f4', {
      cluster: 'eu',
    });

    this.socket.connect();

    this.streamsChannel = this.socket.subscribe('streams');
    this.streamsChannel.bind('pusher:subscription_succeeded', () => {
      Object.values(streamingEvents).forEach((event) => {
        this.streamsChannel.bind(this.prefixClient(event), (data) => {
          Logger.instance.log(`${event} :`);

          const handlers = this.callbacks[event] || [];

          handlers.forEach((handler) => handler(data));
        });
      });
    });

    this.chatChannel = this.socket.subscribe('chat');
    this.chatChannel.bind('pusher:subscription_succeeded', () => {
      Object.values(chatEvents).forEach((event) => {
        this.chatChannel.bind(this.prefixClient(event), (data) => {
          Logger.instance.log(`${event} :`);

          const handlers = this.callbacks[event] || [];

          handlers.forEach((handler) => handler(data));
        });
      });
    });

    return this;
  }

  //
  // ──────────────────────────────────────────────────────────────── I ──────────
  //   :::::: L I S T E N   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  listen(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(callback);
  }

  listenPrepareLiveStream(callback = () => null) {
    this.listen(EVENT_PREPARE_LIVE_STREAM, callback);
  }

  listenBeginLiveStream(callback = () => null) {
    this.listen(EVENT_BEGIN_LIVE_STREAM, callback);
  }

  listenFinishLiveStream(callback = () => null) {
    this.listen(EVENT_FINISH_LIVE_STREAM, callback);
  }

  listenListLiveStream(callback = () => null) {
    this.listen(EVENT_LIST_LIVE_STREAM, callback);
  }

  listenSendHeart(callback = () => null) {
    this.listen(EVENT_SEND_HEART, callback);
  }

  listenSendMessage(callback = () => null) {
    this.listen(EVENT_SEND_MESSAGE, callback);
  }

  listenReplay(callback = () => null) {
    this.listen(EVENT_SEND_REPLAY, callback);
  }

  //
  // ──────────────────────────────────────────────────────────── I ──────────
  //   :::::: E M I T   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  prefixClient(event) {
    return `client-${event}`;
  }

  emitInChat(event, data) {
    this.chatChannel.trigger(this.prefixClient(event), data);
  }

  emitInStreams(event, data) {
    this.streamsChannel.trigger(this.prefixClient(event), data);
  }

  emitPrepareLiveStream({ userName, roomName }) {
    this.emitInStreams(EVENT_PREPARE_LIVE_STREAM, { userName, roomName });
  }

  emitJoinRoom({ userName, roomName }) {
    this.emitInChat(EVENT_JOIN_ROOM, { userName, roomName });
  }

  emitLeaveRoom({ userName, roomName }) {
    this.emitInChat(EVENT_LEAVE_ROOM, { userName, roomName });
  }

  emitBeginLiveStream({ userName, roomName }) {
    this.emitInStreams(EVENT_BEGIN_LIVE_STREAM, { userName, roomName });
  }

  emitFinishLiveStream({ userName, roomName }) {
    this.emitInStreams(EVENT_FINISH_LIVE_STREAM, { userName, roomName });
  }

  emitListLiveStream() {
    this.emitInStreams(EVENT_LIST_LIVE_STREAM, null);
  }

  emitSendHeart({ roomName }) {
    this.emitInChat(EVENT_SEND_HEART, { roomName });
  }

  emitSendMessage({ roomName, userName, message }) {
    this.emitInStreams(EVENT_SEND_MESSAGE, { userName, roomName, message });
  }

  emitReplay({ roomName, userName }) {
    this.emitInStreams(EVENT_SEND_REPLAY, { roomName, userName });
  }
}

const instance = new SocketManager();
Object.freeze(instance);

export default SocketManager;
