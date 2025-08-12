import React from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import CountrySvg from './CountrySvg';
import Forests from './Forests';
import Heaps from './heaps';
import Map2 from './Map2';
import Montains from './Montains';
import Places from './Places';

const MapWrapper = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newX = savedX.value + e.translationX;
      const newY = savedY.value + e.translationY;

      const maxX = (windowWidth * (2.5 - 1)) / 2;
      const minX = -maxX;

      // const maxY = (windowHeight * (2.5 - 1)) / 2;
      // const minY = -maxY;

      x.value = Math.max(minX, Math.min(newX, maxX));
      // y.value = Math.max(minY, Math.min(newY, maxY));
    })
    .onEnd(() => {
      savedX.value = x.value;
      savedY.value = y.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { scale: 1.3 }],
  }));

  return (
    
    <View style={styles.container}>
            <Image
        source={require('@/assets/images/kid/map-background.png')}
        // style={styles.mapImage}
      />
      <Image
        source={require('@/assets/images/kid/map-cloud.png')}
        style={styles.cloudImage}
      />
      
      
       <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.animatedView, animatedStyle]}>
      
          <CountrySvg/>
          <Map2/>
          <Forests />
          <Heaps/>
          <Places/>
          <Montains/>


          
         
        </Animated.View>
      </GestureDetector>
     
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
    imgCloudFar: {
    width: "100%",
    height: 278,
    position: "absolute",
    top: 0,
    left: 0,
  },
  mapImage: {
    width: '100%',
    height: 700,
    resizeMode: 'cover',
  },
  animatedView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cloudImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default MapWrapper;
