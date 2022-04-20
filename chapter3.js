import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

export default function App() {
  let {width,height} = Dimensions.get('window');
  let initialValue=100;
  const widthSheet=useSharedValue(initialValue);
  const translateX=useSharedValue(0)
  const translateY=useSharedValue(0)
  const translateX1=useSharedValue(0)
  const translateY1=useSharedValue(0)
  const context=useSharedValue({x:0,y:0})
  const gestureHandler = Gesture.Pan().onStart((e)=>{
    context.value={x:translateX.value,y:translateY.value}
  }).onUpdate((e)=>{
    // console.log(e)
    translateX.value=e.translationX+context.value.x
    translateY.value=e.translationY+context.value.y
  })
  const derivedX=useDerivedValue(()=>{
    return withSpring(translateX.value);
  })
  const derivedY=useDerivedValue(()=>{
    return withSpring( translateY.value);
  })
  const animatedStyle=useAnimatedStyle(()=>{
   
    return {
      transform:[{
        translateX:derivedX.value
      },{
        translateY:derivedY.value
      }],
      
    }
  })
  const derivedXX = useDerivedValue(()=>{
    return withSpring(derivedX.value)
  })
  const derivedYY = useDerivedValue(()=>{
    return withSpring(derivedY.value)
  })
  const animatedStyle1=useAnimatedStyle(()=>{
    return {
      transform:[{
        translateX:derivedXX.value
      },{
        translateY:derivedYY.value
      }],
      
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
    <Animated.View style={[styles.square1,animatedStyle1]}/>
      <GestureDetector gesture={gestureHandler}>

        <Animated.View style={[styles.square,animatedStyle]}/>
      </GestureDetector>
    </View>
    </GestureHandlerRootView>
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //  <PanGestureHandler onGestureEvent={gestureHandler}>
    //    <Animated.View>
    //  <Animated.View style={[styles.belowSpace,animatedStyle1]}>
    //    </Animated.View> 
       
    //    </Animated.View> 
    //    </PanGestureHandler>
    //    {/* <PanGestureHandler onGestureEvent={gestureHandler}>
      
    //    </PanGestureHandler> */}

    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  belowSpace:{
    backgroundColor:"blue",
  },
  bootomSheet:{
    width:"100%",
    // height:100,
    backgroundColor:'red',
    // position:'absolute',
    // bottom:0
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
    position:'absolute'
  },
  square1: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 100, 0, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
});