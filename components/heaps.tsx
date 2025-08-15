import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Heaps = () => {
  return (
    <View style={styles.container}>
      {/* Group 1 */}
      <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.forest1]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, {top: '60%', left: '72%'}]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap1]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap2]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap3]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap4]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap5]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap4]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap5]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap7]} />
     <Image source={require('@/assets/images/heaps/heap1.png')} style={[styles.heaps, styles.heap8]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  heaps: {
    position: 'absolute',
    width: 20,
    height: 30,
    resizeMode: 'contain',
    zIndex:500,
  },
  forest1: {
    top: '55%',
    left: '70%',
  },
 heap1: {
    top: '48%',
    left: '52%',
  },
  heap2: {
    top: '63%',
    left: '68%',
  },
  heap3: {
    top: '32%',
    left: '45%',
  },
  heap4: {
    top: '55%',
    left: '61%',
  },
  heap5: {
    top: '39%',
    left: '42%',
  },
  heap6: {
    top: '69%',
    left: '58%',
  },
  heap7: {
    top: '41%',
    left: '66%',
  },
  heap8: {
    top: '58%',
    left: '49%',
  },
  heap9: {
    top: '35%',
    left: '70%',
  },
  heap10: {
    top: '65%',
    left: '54%',
  },
});

export default Heaps;
