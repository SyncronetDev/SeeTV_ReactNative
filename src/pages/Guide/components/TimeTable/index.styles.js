import { Dimensions, StyleSheet } from 'react-native';

import { ROW_HEIGHT } from '../Broadcasts/index.styles';
import channelHeaderStyle from '../ChannelHeader/index.styles';
import constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  scrollViewContent: {
    flexDirection: 'column',
  },
  header: {
    top: constants.CHANNELHEADER.width,
    flexDirection: 'column',
    width: 64,
    backgroundColor: 'blue',
  },
  timeLabel: {
    flex: -1,
    width: constants.ROW_HEIGHT,
  },
  timeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  timeColumn: {
    paddingTop: 4,
    height: constants.CHANNELHEADER.width,
    flexDirection: 'row',
  },
  eventsContainer: {
    flex: 1,
    width: eventWidth,
  },
});

const eventWidth = constants.SCREEN_WIDTH - constants.CHANNELHEADER.width;

export default styles;
