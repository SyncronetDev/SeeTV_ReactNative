import { useIsFocused, useTheme } from '@react-navigation/native';
import { addDays, eachDayOfInterval } from 'date-fns';
import { tr } from 'date-fns/locale';
import { map } from 'lodash';
import React, { createRef, useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import FlatListDropDown from '../components/DropdownList';

import { getBroadcasts } from 'utils/api';

// async function FetchGuideData(Munic) {
//   return await fetchGuideBroadcasts(Munic);
// }

export default function TVGuide({ municipalityId = 1 }) {
  const [GuideData, setGuideData] = React.useState([]);
  const [TimeHeaderWidth, setTimeHeaderWidth] = React.useState(0);

  let refScrollView = React.createRef();

  React.useEffect(() => {
    const bootstrap = async () => {
      const data = await getBroadcasts({ id: municipalityId, date: '03/12/2021' });

      setGuideData(data);
    };

    bootstrap();
  }, [municipalityId]);

  useEffect(() => {
    function handleStatusChange(status) {
      refScrollView.scrollTo((TimeHeaderWidth / parseInt(1440)) * (16 * 60));
    }
  });

  // GuideData.map((item) => {
  //   console.log(item.name);
  // });
  // console.log(GuideData); //.broadcasts[0].starts_at

  const dayList = eachDayOfInterval({
    start: new Date(),
    end: addDays(new Date(), 6),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            height: 54,
          }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 24, marginLeft: 8 }}>Din Kommune</Text>
          {/* <Searchbar placeholder="wowie" /> */}
          <FlatListDropDown />
        </View>
        <View>
          <FlatList
            numColumns={7}
            data={dayList}
            renderItem={({ item }) => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <Text>{listOfDays[item.getDay()]}</Text>
                <Text>
                  {(item.getDate() < 10 ? '0' + item.getDate() : item.getDate()) +
                    '-' +
                    (item.getMonth() + 1 < 10 ? '0' + (item.getMonth() + 1) : item.getMonth() + 1)}
                </Text>
              </View>
            )}
          />
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <View style={{ height: 20, backgroundColor: '#f03060' }}></View>
              <View style={{ backgroundColor: '#606060' }}>
                {GuideData.map((item) => {
                  return (
                    <>
                      <View style={styles.publisherContainer}>
                        <View
                          style={{
                            ...styles.publisherContainer,
                            backgroundColor: '#406080',
                            flex: 1,
                          }}
                        >
                          <Text>{item.name}</Text>
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>
            <ScrollView
              ref={(ref) => (refScrollView = ref)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onLayout={() => {
                refScrollView.scrollTo({
                  x:
                    (TimeHeaderWidth / parseInt(1440)) *
                    (new Date().getHours() * 60 + parseInt(new Date().getMinutes())),
                });
              }}
            >
              <View
                style={styles.tvGuideItemHeight}
                onLayout={(event) => {
                  var { width } = event.nativeEvent.layout;
                  setTimeHeaderWidth(width);
                }}
              >
                <View style={{ flexDirection: 'row', height: 20, backgroundColor: '#f03060' }}>
                  {timesList().map((item) => {
                    return (
                      <Text style={{ ...styles.timesListStyle, width: 200 }}>{item.time}</Text>
                    );
                  })}
                </View>

                <View style={{ ...styles.tvGuideItemHeight }}>
                  {GuideData.map((broadcast) => {
                    return (
                      <View
                        style={{
                          ...styles.tvGuideItemHeight,
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          borderBottomColor: 'gray',
                        }}
                      >
                        {broadcast.broadcasts.map((item) => {
                          // console.log(item.starts_at);
                          let first = item.starts_at.split(' ');
                          let sec = first[1].split(':');
                          // console.log(sec);
                          // console.log('raehgiur');
                          var out =
                            (TimeHeaderWidth / parseInt(1440)) *
                            (parseInt(sec[0]) * 60 + parseInt(sec[1]));
                          return (
                            <View
                              style={{
                                position: 'absolute',
                                left: out,
                                top: 0,
                                width: 100,
                                height: 60,
                                backgroundColor: '#A60402',
                                borderWidth: 1,
                                borderRadius: 4,
                              }}
                            >
                              <Text>{item.title}</Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                  <View></View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 8,
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
  timesListStyle: {
    borderLeftWidth: 2,
    borderLeftColor: '#FFF',
    paddingLeft: 15,
    marginRight: 100,
  },
  publisherContainer: {
    width: 60,
    height: 60,
  },
  tvGuideItemHeight: {
    height: 60,
  },
});

//{} in parameters means we access that object directly from props. so in below case we can write broad.map instead of props.broad.map because the parameter is enclosed in ({}) instead of ().

function DisplayBroadcasts({ broadcast }) {
  return broadcast.map((item) => {
    return (
      <View
        style={{
          position: 'absolute',
          left: item.rect.x,
          top: item.rect.y,
          width: item.rect.width,
          height: item.rect.height,
          backgroundColor: '#A60402',
          borderWidth: 1,
          borderRadius: 4,
        }}
      >
        <Text>{item.title}</Text>
      </View>
    );
  });
}

function DisplayTVGuideItems({ allBroadcasts }) {
  return allBroadcasts.map((item) => {
    return (
      <>
        <View style={{ ...styles.tvGuideItemHeight, flexDirection: 'row', borderBottomWidth: 1 }}>
          <DisplayBroadcasts broadcast={item} />
        </View>
      </>
    );
  });
}

function DisplayPublishers() {
  return pubTest.map((item) => {
    return (
      <>
        <View style={styles.publisherContainer}>
          <View style={{ ...styles.publisherContainer, backgroundColor: '#406080', flex: 1 }}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </>
    );
  });
}

//Have the broadcast calculate a rect based on the date object that they have.
const broad2Test = [
  { title: 'broadtest11', rect: { x: 130, y: -1, width: 200, height: 61 } },
  { title: 'broadtest12', rect: { x: 470, y: 0, width: 200, height: 60 } },
];

const broad1Test = [
  { title: 'broadtest1', startTime: '', rect: { x: 100, y: 0, width: 200, height: 60 } },
  { title: 'broadtest2', rect: { x: 400, y: 0, width: 200, height: 60 } },
  { title: 'broadtest3', rect: { x: 1000, y: 0, width: 200, height: 60 } },
];

const allBroads = [broad1Test, broad2Test];

const pubTest = [
  { name: 'test1', broad: broad1Test, rect: { x: 0, y: 0, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
  { name: 'test2', broad: broad2Test, rect: { x: 0, y: 70, width: 70, height: 70 } },
];

function DisplayTimesList() {
  return timesList().map((item) => {
    return <Text style={{ ...styles.timesListStyle, width: 200 }}>{item.time}</Text>;
  });
}

//Calculates the time list.
const timesList = () => {
  let xIncrement = 0;

  let list = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let halfHour = 0; halfHour < 2; halfHour++) {
      let hourTime = hour < 10 ? '0' + hour : '' + hour;
      let halfHourTime = halfHour % 2 == 0 ? '00' : '30';

      list.push({
        time: hourTime + ':' + halfHourTime,
        rect: { x: xIncrement, y: 0 },
      });

      xIncrement += 100;
    }
  }

  return list;
};

// const timesList = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00",
//     "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
//     "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00",
//     "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]

const listOfDays = {
  0: 'søn',
  1: 'man',
  2: 'tirs',
  3: 'ons',
  4: 'tors',
  5: 'fre',
  6: 'lør',
};
