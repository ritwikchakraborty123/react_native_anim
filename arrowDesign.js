import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
const CIRCLE_SIZE = 100;

const Circle = ({onPress, animatedValue}) => {
  const containerBg = animatedValue.interpolate({
    inputRange: [0, 0.5, 0.500001, 1],
    outputRange: ['gold', 'gold', '#444', '#444'],
  });
  const circleBg = animatedValue.interpolate({
    inputRange: [0, 0.5, 0.500001, 1],
    outputRange: ['#444', '#444', 'gold', 'gold'],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {
          backgroundColor: containerBg,
        },
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },

              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 1, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            {/* <AntDesign name="arrowright" size={28} color={'white'} /> */}
            <Icon name="forward" size={30} color={'white'} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
const App = () => {
  console.log('red');
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [index, setindex] = React.useState(1);
  const animation = toValue => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
  const onPress = () => {
    setindex(1 ^ index);
    animation(index);

    // Animated.timing(animatedValue, {
    //   toValue: 0,
    //   duration: 1000,
    //   useNativeDriver: false,
    // }).start();
  };
  return (
    <View style={styles.container}>
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: 'trasparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
