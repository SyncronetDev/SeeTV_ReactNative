import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';

import { genTimeBlock } from '../../utils';
import { getFormattedDate } from 'utils';

import styles from './index.styles';

const getColumns = (numberOfDays, selectedDate) => {
  const columns = [];
  let initial = 0;
  for (let i = initial; i < numberOfDays + initial; i += 1) {
    let date = moment(selectedDate);
    date = date.add(i, 'd');
    columns.push(date.toDate());
  }
  return columns;
};

const getFontSizeHeader = (numberOfDays) => {
  if (numberOfDays > 1) {
    return 12;
  }

  return 16;
};

const getDayTextStyles = (numberOfDays) => {
  const fontSize = numberOfDays === 6 ? 10 : 12;
  return {
    fontSize,
  };
};

const Column = ({ column, numberOfDays, format }) => {
  return (
    <View style={styles.column}>
      <Text style={[styles.text, getDayTextStyles(numberOfDays)]}>smt</Text>
    </View>
  );
};
//{getFormattedDate(column, format)}

const Columns = ({ columns, numberOfDays, format }) => {
  return (
    <View style={styles.columns}>
      {columns.map((column) => {
        return <Column key={column} column={column} numberOfDays={numberOfDays} format={format} />;
      })}
    </View>
  );
};

const Title = ({ numberOfDays }) => {
  return (
    <View style={styles.title}>
      <Text style={[styles.text, { fontSize: getFontSizeHeader(numberOfDays) }]}></Text>
    </View>
  );
};

const WeekViewHeader = ({ numberOfDays, selectedDate, formatDate, style }) => {
  const columns = getColumns(numberOfDays, selectedDate);
  numberOfDays = 5;
  style = {};
  selectedDate = genTimeBlock('mon');
  console.log({ numberOfDays, selectedDate, formatDate, style });
  return (
    <View style={styles.container}>
      <Title numberOfDays={numberOfDays} selectedDate={selectedDate} />
      {columns && (
        <View style={styles.columns}>
          {columns.map((column) => {
            return (
              <View style={styles.column}>
                <Text style={[styles.text, getDayTextStyles(numberOfDays)]}>smt</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf([1, 3, 5, 6, 7]).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  formatDate: PropTypes.string,
  style: PropTypes.object,
};

WeekViewHeader.defaultProps = {
  formatDate: 'dddd', // day of week
};

export default WeekViewHeader;
