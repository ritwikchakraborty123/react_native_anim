import { View, Text } from 'react-native'
import React from 'react'

export default function chapter1() {
    const offset = useSharedValue(0);
  const opacity=useSharedValue(1);
  const offsettest = useSharedValue(0);
  const rotation = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(() => {
    const rotateDeg=(value)=>{
      return value+"deg"
    }
    return {
      transform: [{translateX: offset.value},
        {
          rotate:rotateDeg(rotation.value)
        }],
      opacity:opacity.value
    };
  });



  
  const animatedStylestest = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsettest.value * 255,
          
        }
        
      ],
    };
  });
  return (
    <View>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={() => 
        {

        
        if(offset.value==0){
        offset.value=withTiming(300,{duration:700});
        opacity.value=1
        rotation.value=withSpring(180)
        }
        else{


          offset.value = withTiming(0,{
            duration:700
          })
          opacity.value=withTiming(0.1,{
            duration:700
          })
          rotation.value=withSpring(0)
        }
      }} title="Move" />

      <Animated.View style={[styles.box, animatedStylestest]} />
      <Button
        onPress={() => (offsettest.value = withSpring(Math.random()))}
        title="Move"
      />
      <Button
        onPress={() => {
          cancelAnimation(offset);
        }}
        title="cacel"
      />
    </View>
  )
}