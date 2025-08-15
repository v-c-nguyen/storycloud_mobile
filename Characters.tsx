import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  characterContainer: {
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
  // Static styles for 10 character positions with 'top' values in the 30-80 range
  char1Style: { top: '35%', left: '15%' },
  char2Style: { top: '70%', left: '75%' },
  char3Style: { top: '42%', left: '40%' },
  char4Style: { top: '78%', left: '10%' },
  char5Style: { top: '55%', left: '65%' },
  char6Style: { top: '65%', left: '30%' },
  char7Style: { top: '50%', left: '85%' },
  char8Style: { top: '35%', left: '67%' },
  char9Style: { top: '60%', left: '20%' },
  char10Style: { top: '45%', left: '50%' },
});

// An array to hold the data for each character
const charactersData = [
  { key: 'char_1', source: require('@/assets/images/Characters/char1.png'), style: styles.char1Style },
  { key: 'char_2', source: require('@/assets/images/Characters/char2.png'), style: styles.char2Style },
  { key: 'char_3', source: require('@/assets/images/Characters/char3.png'), style: styles.char3Style },
  { key: 'char_4', source: require('@/assets/images/Characters/char4.png'), style: styles.char4Style },
  { key: 'char_5', source: require('@/assets/images/Characters/char5.png'), style: styles.char5Style },
  { key: 'char_6', source: require('@/assets/images/Characters/char6.png'), style: styles.char6Style },
  { key: 'char_7', source: require('@/assets/images/Characters/char7.png'), style: styles.char7Style },
  { key: 'char_8', source: require('@/assets/images/Characters/char8.png'), style: styles.char8Style },
  { key: 'char_9', source: require('@/assets/images/Characters/char9.png'), style: styles.char9Style },
  { key: 'char_10', source: require('@/assets/images/Characters/char10.png'), style: styles.char10Style },
];

const Characters = () => {
  return (
    <View style={styles.container}>
      {/* Map over the charactersData array to render each character */}
      {charactersData.map(item => (
        <TouchableOpacity 
          key={item.key} 
          style={[styles.characterContainer, item.style]}
          onPress={() => console.log(`${item.key} pressed`)}
        >
          <Image source={item.source} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Characters;
