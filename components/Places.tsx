import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  placeContainer: {
    position: 'absolute',
    width: 70,
    height: 60,
    zIndex: 700,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // Static styles for the places positions
  place1Style: { top: '40%', left: '30%' },
  place2Style: { top: '35%', left: '45%' },
  place3Style: { top: '45%', left: '1%' },
  place4Style: { top: '40%', left: '65%' },
  place5Style: { top: '70%', left: '10%' },
  place6Style: { top: '80%', left: '50%' },
});

// An array to hold the data for each place
const placesData = [
  { key: 'place_1', source: require('@/assets/images/places/place1.png'), style: styles.place1Style },
  { key: 'place_2', source: require('@/assets/images/places/place2.png'), style: styles.place2Style },
  { key: 'place_3', source: require('@/assets/images/places/place3.png'), style: styles.place3Style },
  { key: 'place_4', source: require('@/assets/images/places/place4.png'), style: styles.place4Style },
  { key: 'place_5', source: require('@/assets/images/places/place5.png'), style: styles.place5Style },
  { key: 'place_6', source: require('@/assets/images/places/place6.png'), style: styles.place6Style },
];

const Places = () => {
  return (
    <View style={styles.container}>
      {/* Map over the placesData array to render each place */}
      {placesData.map(item => (
        <TouchableOpacity 
          key={item.key} 
          style={[styles.placeContainer, item.style]}
          onPress={() => console.log(`${item.key} pressed`)}
        >
          <Image source={item.source} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Places;
