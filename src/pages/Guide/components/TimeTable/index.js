import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import moment from 'moment';
import styles from './index.styles';
import Broadcasts from '../Broadcasts';
import { setLocale, addColor, genTimeBlock } from '../../utils';
import ChannelHeader from '../ChannelHeader';

export default class TimeTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMoment: props.pivotDate,
      Channels: ['sm', 'sh', 'gua', 'agh'],
    };
    const { pivotTime, pivotEndTime } = this.props;
    this.calendar = null;
    setLocale(props.locale);
    this.times = this.generateTimes(pivotTime, pivotEndTime);
  }

  componentDidMount() {
    // this.calendar.scrollTo({ y: (300), x: 0, animated: true });
    // requestAnimationFrame(() => {
    //   this.calendar.scrollTo({ y: (SCREEN_HEIGHT - 300), x: 0, animated: false });
    // });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate) {
      this.setState({ currentMoment: nextProps.selectedDate });
    }
    if (nextProps.locale !== this.props.locale) {
      setLocale(nextProps.locale);
    }
  }

  generateTimes = (pivotTime, endPivotTime) => {
    const times = [];
    for (let i = pivotTime; i < endPivotTime; i += 1) {
      times.push(i);
    }
    return times;
  };

  render() {
    const { numberOfDays, headerStyle, formatDateHeader, onEventPress, pivotTime } = this.props;
    const events = addColor(this.props.events);
    const { currentMoment, Channels } = this.state;
    // const dates = this.prepareDates(currentMoment, numberOfDays);
    const date = moment(currentMoment);
    let flip = false;
    // style={styles.container}
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            {console.log(ChannelHeader({ numberOfDays: 5 }))}
            {Channels.map(
              (name) => (
                (flip = !flip),
                (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      height: 60,
                      backgroundColor: flip ? 'green' : 'purple',
                    }}
                  >
                    <Text style={{ alignSelf: 'center' }}>name</Text>
                  </View>
                )
              )
            )}
            <ChannelHeader
              style={headerStyle}
              formatDate={formatDateHeader}
              selectedDate={currentMoment}
              numberOfDays={numberOfDays}
            />
          </View>
          <ScrollView ref={this.props.scrollViewRef} horizontal={true}>
            <View style={styles.scrollViewContent}>
              <View style={styles.timeColumn}>
                {this.times.map((time) => (
                  <View key={time} style={styles.timeLabel}>
                    <Text style={styles.timeText}>{time === 12 ? 12 : time % 12}</Text>
                  </View>
                ))}
              </View>
              <View key={date} style={styles.eventsContainer}>
                <Broadcasts
                  pivotTime={pivotTime}
                  key={date}
                  times={this.times}
                  selectedDate={date.toDate()}
                  numberOfDays={numberOfDays}
                  onEventPress={onEventPress}
                  events={events}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

TimeTableView.propTypes = {
  scrollViewRef: PropTypes.func,
  events: Broadcasts.propTypes.events,
  numberOfDays: PropTypes.oneOf([1, 3, 5, 6, 7]).isRequired,
  pivotTime: PropTypes.number,
  pivotEndTime: PropTypes.number,
  pivotDate: PropTypes.instanceOf(Date).isRequired,
  formatDateHeader: PropTypes.string,
  onEventPress: PropTypes.func,
  headerStyle: PropTypes.object,
  locale: PropTypes.string,
};

TimeTableView.defaultProps = {
  events: [],
  locale: 'en',
  pivotTime: 0,
  pivotEndTime: 24,
  pivotDate: genTimeBlock('mon'),
  formatDateHeader: 'dddd',
};
