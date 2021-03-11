import React from 'react';
import { Text, View } from 'react-native';
import TimeTable from '../components/TimeTable';
import moment from 'moment';

export default class Guide extends React.Component {
  render() {
    return (
      <View>
        <TimeTable pivotTime={moment().hour()} />
      </View>
    );
  }
}
