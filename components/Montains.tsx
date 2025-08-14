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
  // Static styles for 100 mountain positions
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
  mountain16Style: { top: '50%', left: '85%' },
  mountain17Style: { top: '63%', left: '5%' },
  mountain18Style: { top: '35%', left: '10%' },
  mountain19Style: { top: '70%', left: '30%' },
  mountain20Style: { top: '40%', left: '40%' },
  mountain21Style: { top: '58%', left: '22%' },
  mountain22Style: { top: '45%', left: '62%' },
  mountain23Style: { top: '66%', left: '72%' },
  mountain24Style: { top: '32%', left: '82%' },
  mountain25Style: { top: '53%', left: '92%' },
  mountain26Style: { top: '72%', left: '12%' },
  mountain27Style: { top: '37%', left: '27%' },
  mountain28Style: { top: '60%', left: '42%' },
  mountain29Style: { top: '48%', left: '52%' },
  mountain30Style: { top: '75%', left: '62%' },
  mountain31Style: { top: '41%', left: '7%' },
  mountain32Style: { top: '56%', left: '17%' },
  mountain33Style: { top: '39%', left: '32%' },
  mountain34Style: { top: '68%', left: '48%' },
  mountain35Style: { top: '44%', left: '58%' },
  mountain36Style: { top: '62%', left: '68%' },
  mountain37Style: { top: '49%', left: '78%' },
  mountain38Style: { top: '73%', left: '88%' },
  mountain39Style: { top: '36%', left: '90%' },
  mountain40Style: { top: '51%', left: '1%' },
  mountain41Style: { top: '65%', left: '18%' },
  mountain42Style: { top: '42%', left: '37%' },
  mountain43Style: { top: '57%', left: '51%' },
  mountain44Style: { top: '70%', left: '36%' },
  mountain45Style: { top: '48%', left: '64%' },
  mountain46Style: { top: '61%', left: '76%' },
  mountain47Style: { top: '33%', left: '46%' },
  mountain48Style: { top: '54%', left: '25%' },
  mountain49Style: { top: '69%', left: '55%' },
  mountain50Style: { top: '40%', left: '11%' },
  mountain51Style: { top: '56%', left: '2%' },
  mountain52Style: { top: '65%', left: '13%' },
  mountain53Style: { top: '37%', left: '21%' },
  mountain54Style: { top: '45%', left: '32%' },
  mountain55Style: { top: '48%', left: '43%' },
  mountain56Style: { top: '30%', left: '56%' },
  mountain57Style: { top: '66%', left: '67%' },
  mountain58Style: { top: '42%', left: '74%' },
  mountain59Style: { top: '58%', left: '79%' },
  mountain60Style: { top: '33%', left: '69%' },
  mountain61Style: { top: '51%', left: '60%' },
  mountain62Style: { top: '60%', left: '50%' },
  mountain63Style: { top: '46%', left: '41%' },
  // mountain64Style: { top: '38%', left: '31%' },
  mountain65Style: { top: '67%', left: '22%' },
  mountain66Style: { top: '49%', left: '84%' },
  mountain67Style: { top: '62%', left: '4%' },
  mountain68Style: { top: '34%', left: '9%' },
  // mountain69Style: { top: '69%', left: '29%' },
  mountain70Style: { top: '39%', left: '39%' },
  mountain71Style: { top: '57%', left: '24%' },
  mountain72Style: { top: '44%', left: '63%' },
  mountain73Style: { top: '65%', left: '73%' },
  mountain74Style: { top: '31%', left: '83%' },
  // mountain75Style: { top: '52%', left: '91%' },
  mountain76Style: { top: '71%', left: '11%' },
  mountain77Style: { top: '36%', left: '28%' },
  mountain78Style: { top: '59%', left: '43%' },
  mountain79Style: { top: '47%', left: '53%' },
  mountain80Style: { top: '74%', left: '63%' },
  mountain81Style: { top: '40%', left: '6%' },
  mountain82Style: { top: '55%', left: '16%' },
  mountain83Style: { top: '38%', left: '33%' },
  mountain84Style: { top: '67%', left: '47%' },
  mountain85Style: { top: '43%', left: '57%' },
  mountain86Style: { top: '61%', left: '69%' },
  mountain87Style: { top: '48%', left: '77%' },
  mountain88Style: { top: '72%', left: '89%' },
  mountain89Style: { top: '35%', left: '92%' },
  mountain90Style: { top: '50%', left: '1%' },
  mountain91Style: { top: '64%', left: '19%' },
  mountain92Style: { top: '41%', left: '36%' },
  mountain93Style: { top: '56%', left: '50%' },
  mountain94Style: { top: '69%', left: '35%' },
  mountain95Style: { top: '47%', left: '65%' },
  mountain96Style: { top: '60%', left: '75%' },
  mountain97Style: { top: '32%', left: '45%' },
  mountain98Style: { top: '53%', left: '26%' },
  mountain99Style: { top: '68%', left: '54%' },
  mountain100Style: { top: '39%', left: '12%' },
});

// A function to get the correct mountain source based on an index
const getMountainSource = (index: number) => {
  const sources = [
    require('@/assets/images/montains/montain1.png'),
    require('@/assets/images/montains/montain2.png'),
    require('@/assets/images/montains/montain3.png'),
    require('@/assets/images/montains/montain4.png'),
  ];
  return sources[index % sources.length];
};

// Filter the keys of the styles object to find only the mountain styles
const mountainStyleKeys = Object.keys(styles).filter(key => key.startsWith('mountain') && key.endsWith('Style'));

// Define the type for the component's props
type Props = {
  noofmontainsdisplay?: number;
};

// This is the main component, now accepting a prop with a defined type
const Montains: React.FC<Props> = ({ noofmontainsdisplay = 100 }) => {
  // Use slice to get a sub-array of keys based on the prop
  // This allows you to control how many mountains are rendered
  const keysToRender = mountainStyleKeys.slice(0, noofmontainsdisplay);
  
  // A statically mapped array for the mountain data, using the filtered keys
  const mountainData = keysToRender.map((key, index) => ({
    key: `mountain_${index + 1}`,
    source: getMountainSource(index),
    // Use a type assertion to inform TypeScript that 'key' is a valid index for 'styles'
    style: styles[key as keyof typeof styles],
  }));

  return (
    <View style={styles.container}>
      {/* Map over the static mountain data array to render each mountain */}
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
