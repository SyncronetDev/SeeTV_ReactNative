import { StyleSheet } from 'react-native';
import * as Utility from '../../utils/utility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  contentWrapper: { flex: 1 },
  header: {
    height: 56,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  sideBarRight: {
    flexDirection: 'column',
    width: 56,
    right: 12,
    height: 'auto',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { flex: 0.1 },
  center: { flex: 0.8 },
  streamerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  btnStartStop: { backgroundColor: 'blue', alignSelf: 'center', width: '25%', height: '25%' },
  btnClose: {
    position: 'absolute',
    top: 12,
    left: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icoClose: { width: 24, height: 24 },
  bottomGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  btnBeginLiveStream: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 5,
  },
  beginLiveStreamText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default styles;
