import {StyleSheet, Animated, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
const DATA = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#FF0000', '#FD00F0'];
const {height, width} = Dimensions.get('window');
const Carosol = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
      }}>
      <Animated.View></Animated.View>
      {DATA.map((item, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        const opacity1 = scrollX.interpolate({
          inputRange: [
            (index - 1) * width,
            // (index - 1) * width + width / 4,
            (index - 1) * width + width / 2,
            // (index - 1) * width + width / 4 + width / 2,
            index * width,
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        return (
          <>
            <Animated.View
              key={`carosol-${index}`}
              style={{
                height: 5,
                width: 30,
                margin: 2.5,

                backgroundColor: 'white',
                opacity: opacity1,
                // opacity: opacity1,
              }}></Animated.View>
            <Animated.View
              key={`carosol-${index}`}
              style={{
                height: 10,
                width: 10,
                // margin: 10,
                borderRadius: 5,
                backgroundColor: 'white',
                opacity,
              }}></Animated.View>
          </>
        );
      })}
    </View>
  );
};
const App = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1}}>
      {/* <View style={{flex: 0.7}}> */}
      <View style={[StyleSheet.absoluteFillObject]}>
        <Animated.FlatList
          data={DATA}
          horizontal
          pagingEnabled={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <View
                  style={{
                    height,
                    width,
                    backgroundColor: item,
                  }}></View>
              </View>
            );
          }}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Carosol scrollX={scrollX} />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
