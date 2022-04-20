import * as React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
const ITEM_HEIGHT = height * 0.5;
const ITEM_WIDTH = ITEM_HEIGHT;

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];
const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}],
  // {useNativeDriver:true})
  return (
    <View style={{backgroundColor: 'blue', height}}>
      <Animated.FlatList
        data={data}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.key}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const translateY = scrollY.interpolate({
            inputRange: [
              (index - 1) * height,
              index * height,
              (index + 1) * height,
            ],
            outputRange: [-height * 0.4, 0, height * 0.4],
          });
          return (
            <View
              style={{
                height: height,
                backgroundColor: 'rgb(155, 164, 203)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  overflow: 'hidden',
                  justifyContent: 'center',
                }}>
                <Animated.Image
                  source={{uri: item.photo}}
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT * 1.4,
                    transform: [
                      {
                        translateY: translateY,
                      },
                    ],
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
