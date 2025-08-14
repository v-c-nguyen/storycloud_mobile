import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  landmarkContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    zIndex: 600,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // Static styles for 6 landmark positions
  landmark1Style: { top: '25%', left: '15%' },
  landmark2Style: { top: '55%', left: '70%' },
  landmark3Style: { top: '18%', left: '45%' },
  landmark4Style: { top: '65%', left: '5%' },
  landmark5Style: { top: '40%', left: '60%' },
  landmark6Style: { top: '35%', left: '25%' },
});

// An array to hold the data for each landmark (updated to 6)
const landmarksData = [
  { key: 'landmark_1', source: require('@/assets/images/Landmarks/mark1.png'), style: styles.landmark1Style },
  { key: 'landmark_2', source: require('@/assets/images/Landmarks/mark2.png'), style: styles.landmark2Style },
  { key: 'landmark_3', source: require('@/assets/images/Landmarks/mark3.png'), style: styles.landmark3Style },
  { key: 'landmark_4', source: require('@/assets/images/Landmarks/mark4.png'), style: styles.landmark4Style },
  { key: 'landmark_5', source: require('@/assets/images/Landmarks/mark5.png'), style: styles.landmark5Style },
  { key: 'landmark_6', source: require('@/assets/images/Landmarks/mark6.png'), style: styles.landmark6Style },
];

const Landmarks = () => {
  return (
    <View style={styles.container}>
      {/* Map over the landmarksData array to render each landmark */}
      {landmarksData.map(item => (
        <TouchableOpacity 
          key={item.key} 
          style={[styles.landmarkContainer, item.style]}
          onPress={() => console.log(`${item.key} pressed`)}
        >
          <Image source={item.source} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Landmarks;
