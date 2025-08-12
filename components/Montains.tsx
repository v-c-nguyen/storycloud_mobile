import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mountainContainer: {
    position: 'absolute',
    width: 60,
    height: 40,
    zIndex: 500,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // Static styles for 15 mountain positions
  mountain1Style: { top: '55%', left: '5%' },
  mountain2Style: { top: '64%', left: '15%' },
  mountain3Style: { top: '38%', left: '25%' },
  mountain4Style: { top: '46%', left: '35%' },
  mountain5Style: { top: '49%', left: '45%' },
  mountain6Style: { top: '31%', left: '55%' },
  mountain7Style: { top: '67%', left: '65%' },
  mountain8Style: { top: '43%', left: '75%' },
  mountain9Style: { top: '59%', left: '80%' },
  mountain10Style: { top: '34%', left: '70%' },
  mountain11Style: { top: '52%', left: '60%' },
  mountain12Style: { top: '61%', left: '50%' },
  mountain13Style: { top: '47%', left: '40%' },
  mountain14Style: { top: '39%', left: '30%' },
  mountain15Style: { top: '68%', left: '20%' },
});

// An array to hold the data for each mountain
const mountainData = [
  { key: 'mountain_1', source: require('@/assets/images/montains/montain1.png'), style: styles.mountain1Style },
  { key: 'mountain_2', source: require('@/assets/images/montains/montain2.png'), style: styles.mountain2Style },
  { key: 'mountain_3', source: require('@/assets/images/montains/montain3.png'), style: styles.mountain3Style },
  { key: 'mountain_4', source: require('@/assets/images/montains/montain4.png'), style: styles.mountain4Style },
  { key: 'mountain_5', source: require('@/assets/images/montains/montain1.png'), style: styles.mountain5Style },
  { key: 'mountain_6', source: require('@/assets/images/montains/montain2.png'), style: styles.mountain6Style },
  { key: 'mountain_7', source: require('@/assets/images/montains/montain3.png'), style: styles.mountain7Style },
  { key: 'mountain_8', source: require('@/assets/images/montains/montain4.png'), style: styles.mountain8Style },
  { key: 'mountain_9', source: require('@/assets/images/montains/montain1.png'), style: styles.mountain9Style },
  { key: 'mountain_10', source: require('@/assets/images/montains/montain2.png'), style: styles.mountain10Style },
  { key: 'mountain_11', source: require('@/assets/images/montains/montain3.png'), style: styles.mountain11Style },
  { key: 'mountain_12', source: require('@/assets/images/montains/montain4.png'), style: styles.mountain12Style },
  { key: 'mountain_13', source: require('@/assets/images/montains/montain1.png'), style: styles.mountain13Style },
  { key: 'mountain_14', source: require('@/assets/images/montains/montain2.png'), style: styles.mountain14Style },
  { key: 'mountain_15', source: require('@/assets/images/montains/montain3.png'), style: styles.mountain15Style },
];

const Montains = () => {
  return (
    <View style={styles.container}>
      {/* Map over the mountainData array to render each mountain */}
      {mountainData.map(item => (
        <TouchableOpacity 
          key={item.key} 
          style={[styles.mountainContainer, item.style]}
          onPress={() => console.log(`${item.key} pressed`)}
        >
          <Image source={item.source} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Montains;
