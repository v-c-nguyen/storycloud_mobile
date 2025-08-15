import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Montains from '../Montains';
import Places from '../Places';

const PathMap = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/maps/path5292.png')}
      style={styles.mapImage}
    >
      <Montains />
      <Places />
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

export default PathMap;
