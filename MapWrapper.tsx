import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Characters from './Characters';
import CountrySvg from './CountrySvg';
import Forests from './Forests';
import Heaps from './heaps';
import Landmarks from './Landmark';
import Map2 from './Map2';
import Montains from './Montains';
import Places from './Places';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const MapWrapper = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState('Characters');

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
          source={require('@/assets/images/kid/map-cloud.png')}
          style={styles.cloudImage}
        />
        <ThemedView style={styles.tabContainer}>
         
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'Characters' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('Characters')}
          >
            <ThemedText 
              style={[
                styles.tabText, 
                activeTab === 'Characters' && styles.activeTabText
              ]}
            >
              Characters
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'Landmarks' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('Landmarks')}
          >
            <ThemedText 
              style={[
                styles.tabText, 
                activeTab === 'Landmarks' && styles.activeTabText
              ]}
            >
              Landmarks
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
               <Image
          source={require('@/assets/images/kid/map-background.png')}
          // style={styles.mapImage}
        />
       
        {/* <Image
          source={require('@/assets/images/kid/map-cloud.png')}
          style={styles.cloudImage}
        /> */}
      
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.animatedView, animatedStyle]}>
      
            <CountrySvg/>
            <Map2/>
            <Forests />
            <Heaps/>
            <Montains/>
            <Places/>
            
            
           
             {activeTab === 'Characters' && < Characters/>}
            {/* Conditionally render Landmarks for Landmarks tab */}
            {activeTab === 'Landmarks' && <Landmarks/>}
          
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

    tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    bottom: -170,
    marginBottom: 20,
    borderRadius: 999, // Makes it a full pill shape
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    padding: 2,
    zIndex: 900
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 999,
  },
  activeTabButton: {
    backgroundColor: '#F4A672', // White background for the active button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabText: {
    fontSize: 14,
    color: '#fff', // White text for inactive
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#053B4A', // Dark text for active
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
    top: 70,
    left: 0,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default MapWrapper;
