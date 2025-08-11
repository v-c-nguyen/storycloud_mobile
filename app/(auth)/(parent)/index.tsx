import { Image } from 'expo-image';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, Stack } from 'expo-router';

const {width, height} = Dimensions.get("window");

export default function ParentAuthScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
        <ThemedView style={styles.container}>
          {/* Decorative background shapes would go here if needed */}

          {/* <Image
        source={require("@/assets/images/auth/back-pattern.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      /> */}
          {/* Top Icon */}
          <Image
            source={require("@/assets/images/auth/welcome-star.png")}
            style={styles.topImage}
          />

          {/* Title */}
          <ThemedText style={styles.title}>Hi, there!</ThemedText>

          {/* Subtitle */}
          <ThemedText style={styles.subtitle}>
            Before letting your child explore the fun world of StoryCloud, take a
            few minutes to decide on important parental safety controls.
          </ThemedText>

          <ThemedView style={styles.illustrationWrap}>
            {/* Main illustration */}
            <Image
              source={require("@/assets/images/auth/background.png")}
              style={styles.illustration}
              contentFit="cover"
            />
            {/* Buttons */}
            <ThemedView style={styles.buttonRow}>
              <Link href="../" asChild>
                <TouchableOpacity style={styles.backButton}>
                  <Image
                    source={require("@/assets/images/icons/arrow-left.png")}
                    style={{ width: 24, height: 24, tintColor: "#ffffff" }}
                    contentFit="cover"
                  />
                  <ThemedText style={styles.backText}>Back</ThemedText>
                </TouchableOpacity>
              </Link>
              <Link href="./verify" asChild>
                <TouchableOpacity style={styles.nextButton}>
                  <ThemedText style={styles.nextText}>Next</ThemedText>
                  <Image
                    source={require("@/assets/images/icons/arrow-right.png")}
                    style={{ width: 24, height: 24, tintColor: '#053B4A' }}
                    contentFit="cover"
                  />
                </TouchableOpacity>
              </Link>
            </ThemedView>
          </ThemedView>
        </ThemedView>
    </>
  );
}

const BUTTON_HEIGHT = 44;
const BUTTON_RADIUS = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width, 
    height: height,
    backgroundColor: "#F8ECAE",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    position: "relative",
  },
  topImage: {
    top: 0,
    left: 0,
    width: 95,
    height: 100,
    marginTop: 60,
  },
  title: {
    color: "#053B4A",
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 46.2,
    textAlign: "center",
    marginHorizontal: 10,
  },
  subtitle: {
    color: "#053B4A",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 24.3,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 16,
    marginHorizontal: 30,
  },
  illustrationWrap: {
    width: "100%",
    flex: 1,
    marginBottom: 60,
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  illustration: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    borderWidth: 1,
    borderColor: "#FCFCFC",
    backgroundColor: "transparent",
    paddingHorizontal: 38,
    paddingVertical: 10,
    justifyContent: "center",
    gap: 10,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    backgroundColor: "#F4A672",
    paddingHorizontal: 38,
    paddingVertical: 10,
    justifyContent: "center",
    gap: 10,
  },
  backText: {
    color: "#FCFCFC",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },
  nextText: {
    color: "#053B4A",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },
});
