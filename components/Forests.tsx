import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  forest: {
    position: 'absolute',
    width: 20,
    height: 30,
    resizeMode: 'contain',
    zIndex: 500,
  },
  // Static styles for 40 forest positions with left range 1-80%
  forest1Style: { top: '35%', left: '10%' },
  forest2Style: { top: '65%', left: '72%' },
  forest3Style: { top: '48%', left: '58%' },
  forest4Style: { top: '50%', left: '30%' },
  forest5Style: { top: '40%', left: '65%' },
  forest6Style: { top: '60%', left: '20%' },
  forest7Style: { top: '45%', left: '78%' },
  forest8Style: { top: '32%', left: '8%' },
  forest9Style: { top: '68%', left: '45%' },
  forest10Style: { top: '55%', left: '1%' },
  forest11Style: { top: '38%', left: '52%' },
  forest12Style: { top: '59%', left: '33%' },
  forest13Style: { top: '42%', left: '69%' },
  forest14Style: { top: '61%', left: '19%' },
  forest15Style: { top: '52%', left: '79%' },
  forest16Style: { top: '30%', left: '24%' },
  forest17Style: { top: '70%', left: '52%' },
  forest18Style: { top: '44%', left: '14%' },
  forest19Style: { top: '66%', left: '61%' },
  forest20Style: { top: '37%', left: '47%' },
  forest21Style: { top: '33%', left: '59%' },
  forest22Style: { top: '58%', left: '11%' },
  forest23Style: { top: '47%', left: '46%' },
  forest24Style: { top: '62%', left: '22%' },
  forest25Style: { top: '49%', left: '35%' },
  forest26Style: { top: '31%', left: '50%' },
  forest27Style: { top: '69%', left: '19%' },
  forest28Style: { top: '41%', left: '41%' },
  forest29Style: { top: '54%', left: '26%' },
  forest30Style: { top: '36%', left: '38%' },
  forest31Style: { top: '63%', left: '52%' },
  forest32Style: { top: '46%', left: '12%' },
  forest33Style: { top: '57%', left: '34%' },
  forest34Style: { top: '39%', left: '21%' },
  forest35Style: { top: '64%', left: '45%' },
  forest36Style: { top: '43%', left: '56%' },
  forest37Style: { top: '67%', left: '17%' },
  forest38Style: { top: '34%', left: '44%' },
  forest39Style: { top: '51%', left: '30%' },
  forest40Style: { top: '60%', left: '5%' },
});

const forestData = [
  { key: 'forest_1', source: require('@/assets/images/forests/forest1.png'), style: styles.forest1Style },
  { key: 'forest_2', source: require('@/assets/images/forests/forest2.png'), style: styles.forest2Style },
  { key: 'forest_3', source: require('@/assets/images/forests/forest3.png'), style: styles.forest3Style },
  { key: 'forest_4', source: require('@/assets/images/forests/forest4.png'), style: styles.forest4Style },
  { key: 'forest_5', source: require('@/assets/images/forests/forest5.png'), style: styles.forest5Style },
  { key: 'forest_6', source: require('@/assets/images/forests/line.png'), style: styles.forest6Style },
  { key: 'forest_7', source: require('@/assets/images/forests/line2.png'), style: styles.forest7Style },
  { key: 'forest_8', source: require('@/assets/images/forests/forest1.png'), style: styles.forest8Style },
  { key: 'forest_9', source: require('@/assets/images/forests/forest2.png'), style: styles.forest9Style },
  { key: 'forest_10', source: require('@/assets/images/forests/forest3.png'), style: styles.forest10Style },
  { key: 'forest_11', source: require('@/assets/images/forests/forest4.png'), style: styles.forest11Style },
  { key: 'forest_12', source: require('@/assets/images/forests/forest5.png'), style: styles.forest12Style },
  { key: 'forest_13', source: require('@/assets/images/forests/line.png'), style: styles.forest13Style },
  { key: 'forest_14', source: require('@/assets/images/forests/line2.png'), style: styles.forest14Style },
  { key: 'forest_15', source: require('@/assets/images/forests/forest1.png'), style: styles.forest15Style },
  { key: 'forest_16', source: require('@/assets/images/forests/forest2.png'), style: styles.forest16Style },
  { key: 'forest_17', source: require('@/assets/images/forests/forest3.png'), style: styles.forest17Style },
  { key: 'forest_18', source: require('@/assets/images/forests/forest4.png'), style: styles.forest18Style },
  { key: 'forest_19', source: require('@/assets/images/forests/forest5.png'), style: styles.forest19Style },
  { key: 'forest_20', source: require('@/assets/images/forests/line.png'), style: styles.forest20Style },
  { key: 'forest_21', source: require('@/assets/images/forests/forest1.png'), style: styles.forest21Style },
  { key: 'forest_22', source: require('@/assets/images/forests/forest2.png'), style: styles.forest22Style },
  { key: 'forest_23', source: require('@/assets/images/forests/forest3.png'), style: styles.forest23Style },
  { key: 'forest_24', source: require('@/assets/images/forests/forest4.png'), style: styles.forest24Style },
  { key: 'forest_25', source: require('@/assets/images/forests/forest5.png'), style: styles.forest25Style },
  { key: 'forest_26', source: require('@/assets/images/forests/line.png'), style: styles.forest26Style },
  { key: 'forest_27', source: require('@/assets/images/forests/line2.png'), style: styles.forest27Style },
  { key: 'forest_28', source: require('@/assets/images/forests/forest1.png'), style: styles.forest28Style },
  { key: 'forest_29', source: require('@/assets/images/forests/forest2.png'), style: styles.forest29Style },
  { key: 'forest_30', source: require('@/assets/images/forests/forest3.png'), style: styles.forest30Style },
  { key: 'forest_31', source: require('@/assets/images/forests/forest4.png'), style: styles.forest31Style },
  { key: 'forest_32', source: require('@/assets/images/forests/forest5.png'), style: styles.forest32Style },
  { key: 'forest_33', source: require('@/assets/images/forests/line.png'), style: styles.forest33Style },
  { key: 'forest_34', source: require('@/assets/images/forests/line2.png'), style: styles.forest34Style },
  { key: 'forest_35', source: require('@/assets/images/forests/forest1.png'), style: styles.forest35Style },
  { key: 'forest_36', source: require('@/assets/images/forests/forest2.png'), style: styles.forest36Style },
  { key: 'forest_37', source: require('@/assets/images/forests/forest3.png'), style: styles.forest37Style },
  { key: 'forest_38', source: require('@/assets/images/forests/forest4.png'), style: styles.forest38Style },
  { key: 'forest_39', source: require('@/assets/images/forests/forest5.png'), style: styles.forest39Style },
  { key: 'forest_40', source: require('@/assets/images/forests/line.png'), style: styles.forest40Style },
];

const Forests = () => {
  return (
    <View style={styles.container}>
      {/* Map over the forestData array to render each place */}
      {forestData.map(item => (
        <Image
          key={item.key}
          source={item.source}
          style={[styles.forest, item.style]}
        />
      ))}
    </View>
  );
};

export default Forests;
