import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Heaps from '../heaps';

const VolgaMap = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/maps/Volga.png')}
      style={styles.mapImage}
    >
      <Heaps />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default VolgaMap;
