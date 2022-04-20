import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#FF0000', '#FD00F0'];

const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image:
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image:
      'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image:
      'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image:
      'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image:
      'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  },
];

let BackgroudColor = ({scrollX}) => {
  let inputRange = [];
  let outputRange = [];
  DATA.map((item, index) => {
    inputRange.push(index * width);
    outputRange.push(bgs[index]);
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange,
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {elevation: 1},
        {
          backgroundColor: translateX,
        },
      ]}></Animated.View>
  );
};
let Carosol = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 100,
        elevation: 6,
      }}>
      {DATA.map((item, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        const scale = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index}
            style={{
              width: 10,
              height: 10,
              backgroundColor: 'white',
              borderRadius: 5,
              margin: 10,
              opacity,
              transform: [{scale}],
            }}></Animated.View>
        );
      })}
    </View>
  );
};
const Square = ({scrollX}) => {
  // const rotate=scrollX.interpolate({
  //   [width]
  // })
  // const YOLO = Animated.modulo(
  //   Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
  //   1,
  // );
  const yolo = Animated.modulo(scrollX, width);
  const YOLOInterpolate = yolo.interpolate({
    inputRange: [0, width / 2, width],
    outputRange: ['-35deg', '0deg', '-35deg'],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        width: width + 120,
        elevation: 2,
        height,
        borderRadius: 86,
        transform: [{rotate: YOLOInterpolate}],
        top: -300,
        left: -100,
      }}></Animated.View>
  );
};
export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Square scrollX={scrollX} />
      <BackgroudColor scrollX={scrollX} />
      <View style={{flex: 0.7, elevation: 4}}>
        <Animated.FlatList
          data={DATA}
          horizontal
          pagingEnabled={true}
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            scrollX.setValue(e.nativeEvent.contentOffset.x);
            console.log(scrollX, Animated.modulo(scrollX, width));
          }}
          keyExtractor={item => item.key}
          renderItem={({item, index}) => {
            return (
              <Animated.View
                style={[
                  {
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  // {backgroundColor: bgTransition},
                ]}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={{
                    uri: item.image,
                  }}
                />
              </Animated.View>
            );
          }}
        />
      </View>
      <View style={{flex: 0.3, alignItems: 'center'}}>
        <Carosol scrollX={scrollX} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    height,
    width,
  },
});
