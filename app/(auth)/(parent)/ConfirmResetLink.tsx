import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, Stack } from 'expo-router';
import React from 'react';


export default function ConfirmResetLink() {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemedView style={styles.container}>
      {/* Decorative background shapes would go here if needed */}

      {/* <Image
        source={require("@/assets/images/auth/back-pattern.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      Top Icon */}
      <Image
        source={require("@/assets/images/auth/parent-fullbody.png")}
        style={styles.topImage}
      />

      {/* Title */}
      <ThemedText style={styles.title}>
        Reset link <ThemedText type='bigType' style={{ color: "#F4A672" }}>has been sent!</ThemedText>
      </ThemedText>

      <ThemedView style={styles.illustrationWrap}>
        {/* Main illustration */}
        <ThemedText style={styles.mainText}>
          Please check your inbox and proceed with the link we have sent.
        </ThemedText>
        {/* Buttons */}
        <ThemedView style={styles.buttonRow}>
          <Link href="./signin" asChild>
            <TouchableOpacity style={styles.nextButton}>
              <ThemedText style={styles.nextText}>Back to Log in</ThemedText>
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
    backgroundColor: "#F8ECAE",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    position: "relative",
  },
  topImage: {
    top: 0,
    left: 0,
    width: 93.2,
    height: 100,
    marginTop: 60,
  },
  title: {
    color: "#053B4A",
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 46.2,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  illustrationWrap: {
    width: "100%",
    flex: 1,
    marginBottom: 60,
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
  },
  illustration: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  mainText: {
    marginHorizontal: 20,
    textAlign: "center",
    color: "rgba(5, 59, 74, 1)",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 24.3,
  },
  buttonRow: {
    width: '100%',
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
