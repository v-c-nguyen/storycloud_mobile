import { Image } from 'expo-image';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { supabase } from '@/app/lib/supabase';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router, Stack } from 'expo-router';


export default function KidAuthHome() {
  async function handleNextProcess() {
    const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
    if (!jwt)
      router.push('/(kid)/(explore)');
    router.push(`./chosing`);
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.root}>
            {/* <Image
          source={require("@/assets/images/auth/back-pattern.png")}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        /> */}
            {/* Background pattern (optional, can use SVG or ImageBackground) */}
            <Image
              source={require("@/assets/images/auth/kid-top.png")}
              style={styles.topImage}
              contentFit="contain"
            />

            {/* Title */}
            <ThemedView style={styles.titleWrap}>
              <ThemedText style={styles.title}>
                Ask a parent to{" "}
                <ThemedText type='bigType' style={styles.titleOrange}>Set Up</ThemedText> your
                StoryCloud
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.illustrationWrap}>
              {/* Main illustration */}
              <Image
                source={require("@/assets/images/auth/background.png")}
                style={styles.illustration}
                contentFit="cover"
              />

              {/* Mode Buttons */}
              <ThemedView style={styles.buttonsWrap}>
                {/* Kid */}-
                <Link href="../" asChild>
                  <TouchableOpacity style={styles.backBtn}>
                    <Image
                      source={require("@/assets/images/icons/arrow-left.png")}
                      style={[styles.avatar, { tintColor: "#fcfcfc" }]}
                      contentFit="contain"
                    />
                    <ThemedText style={[styles.btnText, { color: "#fcfcfc" }]}>
                      Back
                    </ThemedText>
                  </TouchableOpacity>
                </Link>
                {/* Parent */}

                <TouchableOpacity style={styles.doneBtn} onPress={handleNextProcess}>
                  <Image
                    source={require("@/assets/images/auth/icon-kid-done.png")}
                    style={styles.avatar}
                    contentFit="contain"
                  />
                  <ThemedText style={styles.btnText}>Done</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8ECAE",
  },
  root: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F8ECAE",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  topImage: {
    top: 0,
    left: 0,
    width: 82,
    height: 100,
    marginTop: 60,
  },
  titleWrap: {
    marginTop: 10,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
    zIndex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 46.2,
    color: "#053B4A",
  },
  titleOrange: {
    color: "#F4A672",
  },
  illustrationWrap: {
    width: "100%",
    height: 367,
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  illustration: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    zIndex: 1,
  },
  buttonsWrap: {
    width: 301,
    alignSelf: "center",
    gap: 10,
    zIndex: 2,
  },
  backBtn: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
    borderRadius: 70,
    borderColor: "#fcfcfc",
    borderWidth: 1,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 40,
    gap: 20,
    shadowColor: "#053B4A",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  doneBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#F4A672",
    borderRadius: 70,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 40,
    gap: 20,
    shadowColor: "#053B4A",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  btnText: {
    color: "#053B4A",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 24,
  },
});
