import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Forests from '../Forests';

const CentralMap = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/maps/Central.png')}
      style={styles.mapImage}
    >
      <Forests />
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

export default CentralMap;
