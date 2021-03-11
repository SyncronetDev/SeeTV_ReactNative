import { StyleSheet } from 'react-native';
import constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: constants.CONTENT_OFFSET,
  },
  timeRow: {
    flex: 0,
    height: constants.ROW_HEIGHT,
  },
  timeLabelLine: {
    height: 1,
    backgroundColor: constants.GREY_COLOR,
    position: 'absolute',
    right: 0,
    left: 0,
  },
  event: {
    flex: 1,
    overflow: 'hidden',
    borderColor: constants.GREY_COLOR,
    borderLeftWidth: 1,
  },
  events: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
});

export default styles;
