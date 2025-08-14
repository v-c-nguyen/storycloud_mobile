import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  landmarkContainer: {
    position: 'absolute',
    width: 160,
    height: 160,
    zIndex: 600,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // All 26 static landmark positions defined separately with a scattered layout.
  landmark1Style: { top: '10%', left: '5%' },
  landmark2Style: { top: '35%', left: '80%' },
  landmark3Style: { top: '55%', left: '15%' },
  landmark4Style: { top: '80%', left: '60%' },
  landmark5Style: { top: '20%', left: '45%' },
  landmark6Style: { top: '70%', left: '30%' },
  landmark7Style: { top: '40%', left: '5%' },
  landmark8Style: { top: '5%', left: '70%' },
  landmark9Style: { top: '65%', left: '25%' },
  landmark10Style: { top: '30%', left: '55%' },
  landmark11Style: { top: '85%', left: '10%' },
  landmark12Style: { top: '15%', left: '20%' },
  landmark13Style: { top: '50%', left: '75%' },
  landmark14Style: { top: '75%', left: '50%' },
  landmark15Style: { top: '25%', left: '10%' },
  landmark16Style: { top: '60%', left: '85%' },
  landmark17Style: { top: '5%', left: '40%' },
  landmark18Style: { top: '45%', left: '35%' },
  landmark19Style: { top: '70%', left: '55%' },
  landmark20Style: { top: '80%', left: '20%' },
  landmark21Style: { top: '10%', left: '60%' },
  landmark22Style: { top: '60%', left: '5%' },
  landmark23Style: { top: '20%', left: '70%' },
  landmark24Style: { top: '50%', left: '45%' },
  landmark25Style: { top: '30%', left: '5%' },
  landmark26Style: { top: '5%', left: '85%' },
});

// The data array now references the separately defined styles.
const landmarksData = [
  { key: 'landmark_1', source: require('@/assets/images/Landmarks/Group 163248.png'), style: styles.landmark1Style },
  { key: 'landmark_2', source: require('@/assets/images/Landmarks/Group 163250.png'), style: styles.landmark2Style },
  { key: 'landmark_3', source: require('@/assets/images/Landmarks/Group 163251.png'), style: styles.landmark3Style },
  { key: 'landmark_4', source: require('@/assets/images/Landmarks/Group 163252.png'), style: styles.landmark4Style },
  { key: 'landmark_5', source: require('@/assets/images/Landmarks/Group 163254.png'), style: styles.landmark5Style },
  { key: 'landmark_6', source: require('@/assets/images/Landmarks/Group 163255-1.png'), style: styles.landmark6Style },
  { key: 'landmark_7', source: require('@/assets/images/Landmarks/Group 163255.png'), style: styles.landmark7Style },
  { key: 'landmark_8', source: require('@/assets/images/Landmarks/Group 163257-1.png'), style: styles.landmark8Style },
  { key: 'landmark_9', source: require('@/assets/images/Landmarks/Group 163257.png'), style: styles.landmark9Style },
  { key: 'landmark_10', source: require('@/assets/images/Landmarks/Group 163258.png'), style: styles.landmark10Style },
  { key: 'landmark_11', source: require('@/assets/images/Landmarks/Group 163259.png'), style: styles.landmark11Style },
  { key: 'landmark_12', source: require('@/assets/images/Landmarks/Group 163260.png'), style: styles.landmark12Style },
  { key: 'landmark_13', source: require('@/assets/images/Landmarks/Group 163262.png'), style: styles.landmark13Style },
  { key: 'landmark_14', source: require('@/assets/images/Landmarks/Group 163264.png'), style: styles.landmark14Style },
  { key: 'landmark_15', source: require('@/assets/images/Landmarks/Group 163265.png'), style: styles.landmark15Style },
  { key: 'landmark_16', source: require('@/assets/images/Landmarks/Group 163266.png'), style: styles.landmark16Style },
  { key: 'landmark_17', source: require('@/assets/images/Landmarks/Group 163267.png'), style: styles.landmark17Style },
  { key: 'landmark_18', source: require('@/assets/images/Landmarks/Group 163268.png'), style: styles.landmark18Style },
  { key: 'landmark_19', source: require('@/assets/images/Landmarks/Group 163269.png'), style: styles.landmark19Style },
  { key: 'landmark_20', source: require('@/assets/images/Landmarks/Group 163270.png'), style: styles.landmark20Style },
  { key: 'landmark_21', source: require('@/assets/images/Landmarks/Group 163271.png'), style: styles.landmark21Style },
  { key: 'landmark_22', source: require('@/assets/images/Landmarks/Group 163272-1.png'), style: styles.landmark22Style },
  { key: 'landmark_23', source: require('@/assets/images/Landmarks/Group 163285.png'), style: styles.landmark23Style },
  { key: 'landmark_24', source: require('@/assets/images/Landmarks/Group 163287.png'), style: styles.landmark24Style },
  { key: 'landmark_25', source: require('@/assets/images/Landmarks/Group 163300.png'), style: styles.landmark25Style },
  { key: 'landmark_26', source: require('@/assets/images/Landmarks/Group 163301.png'), style: styles.landmark26Style },
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
