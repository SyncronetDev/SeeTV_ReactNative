import { StyleSheet } from 'react-native';
import constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'purple',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F8F8F8',
    borderTopWidth: 1,
    width: constants.CHANNELHEADER.width,
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F8F8F8',
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  text: {
    color: '#F8F8F8',
  },
});
