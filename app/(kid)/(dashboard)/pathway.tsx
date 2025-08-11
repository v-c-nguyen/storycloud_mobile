import { useUser } from "@/app/lib/UserContext";
import BottomNavBar from "@/components/BottomNavBar";
import { StoryCard } from "@/components/Cards";
import PathwayProgressBar from "@/components/PathwayProgressBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RelativePathString, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

// Data arrays for each section

const storiesData = [
  {
    bgColor: "#F4A672",
    textColor: "#053B4A",
    subTextColor: "#F8ECAE",
    progressColor: "#ADD7DA",
    isBallonYellow: true,
    number: "#1",
    storyTitle: "Where Did the Bees Go?",
    seriesTitle: "KAI’S LIVING ADVENTURE",
    duration: 32,
    progress: 20,
    image: "1",
    featured: false,
    isFavorite: true,
    watched: true,
  },
  {
    bgColor: "#053B4A",
    textColor: "#FCFCFC",
    subTextColor: "#F8ECAE",
    progressColor: "#F8ECAE",
    isBallonYellow: false,
    number: "#2",
    storyTitle: "Petal Tales: The Search for Rainbow Flowers",
    seriesTitle: "Underwater Adventures",
    duration: 32,
    progress: 12,
    image: "2",
    featured: false,
    isFavorite: true,
    watched: false,
  },
  {
    bgColor: "#F8ECAE",
    textColor: "#053B4A",
    subTextColor: "#048F99",
    progressColor: "#ADD7DA",
    isBallonYellow: false,
    number: "#3",
    storyTitle: "Muddy Mystery at the Pond",
    seriesTitle: "KAI’S LIVING ADVENTURE",
    duration: 32,
    progress: 20,
    image: "3",
    featured: true,
    isFavorite: true,
    watched: false,
  },
  {
    bgColor: "#053B4A",
    textColor: "#FCFCFC",
    subTextColor: "#F8ECAE",
    progressColor: "#F8ECAE",
    isBallonYellow: true,
    number: "#4",
    storyTitle: "Seeds of Surprise",
    seriesTitle: "KAI’S LIVING ADVENTURE",
    duration: 32,
    progress: 12,
    image: "2",
    featured: true,
    isFavorite: true,
    watched: false,
  },
  {
    bgColor: "#F8ECAE",
    textColor: "#053B4A",
    subTextColor: "#F8ECAE",
    progressColor: "#F4A672",
    isBallonYellow: true,
    number: "#5",
    storyTitle: "The Great Garden Clean-Up",
    seriesTitle: "KAI’S LIVING ADVENTURE",
    duration: 32,
    progress: 20,
    image: "1",
    featured: false,
    isFavorite: true,
    watched: true,
  },
  {
    bgColor: "#053B4A",
    textColor: "#FCFCFC",
    subTextColor: "#F8ECAE",
    progressColor: "#ADD7DA",
    isBallonYellow: false,
    number: "#7",
    storyTitle: "A Night with Nocturnal Neighbours",
    seriesTitle: "KAI’S LIVING ADVENTURE",
    duration: 32,
    progress: 20,
    image: "3",
    featured: false,
    isFavorite: false,
    watched: true,
  },
];

const seriesData = [
  {
    title: "KAI’S LIVING ADVENTURE",
    image: "1",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI’S CLIMATE QUEST",
    image: "2",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI’S INVESTIGATION STATION",
    image: "3",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI’S BIG ADVENTURES",
    image: "4",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI’S NEIGHBORHOOD ADVENTURES",
    image: "5",
    count: 8,
    isFavorite: true,
  },
];

export default function PathwayModeHome() {
  
    const {child} = useUser();
    const [name, setName ] = useState(child?.name || "");

  return (
    <SafeAreaView style={{ flex: 1, display: "flex", height: 500 }}>
      <ThemedView style={{ flex: 1, display: "flex", position: "relative" }}>
        <ScrollView
          style={styles.rootContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 78 }}
        >
          {/* Top background */}
          <Image
            source={require("@/assets/images/kid/top-back-pattern.png")}
            style={styles.topBackPattern}
            resizeMode="cover"
          />
          <ThemedView style={styles.headingWrap}>
            <Image
              source={require("@/assets/images/kid/logo-ballon.png")}
              style={styles.logoBallon}
              resizeMode="cover"
            />
            <Image
              source={require("@/assets/images/kid/logo-baby.png")}
              style={styles.logoBallon}
              resizeMode="cover"
            />
          </ThemedView>
          {/* Header */}
          <ThemedView style={styles.headerWrap}>
            <ThemedText style={styles.headerTitle}>Hey, {name}</ThemedText>
            <Image
              source={require("@/assets/images/kid/star-with-circle.png")}
              style={styles.headerStar}
            />
          </ThemedView>
          <ThemedText style={styles.headerSubtitle}>
            Let’s watch something and have fun!
          </ThemedText>
          <ThemedView style={styles.headerRocketWrap}>
            <Image
              source={require("@/assets/images/kid/rocket.png")}
              style={styles.headerRocket}
              resizeMode="cover"
            />
            {/* Clouds */}
            <Image
              source={require("@/assets/images/kid/cloud-group-far.png")}
              style={styles.imgCloudFar}
              resizeMode="cover"
            />
            <Image
              source={require("@/assets/images/kid/cloud-group-near.png")}
              style={styles.imgCloudNear}
              resizeMode="cover"
            />
          </ThemedView>

          <ThemedView style={{ backgroundColor: "#fcfcfc", marginTop: -46 }}>
            <ThemedText style={styles.pathwayTitle}>
              Your
              <ThemedView style={{ height: 16 }} />
              <ThemedText style={{ color: "#EC701D" }}>Adventure</ThemedText> Awaits!
            </ThemedText>
            <ThemedText style={styles.pathwaySubTitle}>
              Story Pathway | {storiesData.length} Episodes
            </ThemedText>
            <ThemedView style={{ marginVertical: 36 }}>
              <PathwayProgressBar current={2} />
            </ThemedView>
            {/* Continue Watching */}
            <SectionHeader title="Next up in your pathway" link="continue" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardScrollContainer}
            >
              {storiesData.map((item, idx) => (
                <StoryCard key={idx} {...item} />
              ))}
            </ScrollView>
          </ThemedView>
        </ScrollView>
        {/* Sticky Bottom Navigation */}
        <ThemedView
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 178,
            zIndex: 1000,
          }}
        >
          <BottomNavBar active="Explore" theme="light" image={true} flag={true} />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

function SectionHeader({ title, link }: { title: string, link: string }) {

  const router = useRouter();
  // Helper for route path
  const getRoute = () => {

    return `./${link}`;
  };
  return (
    <>
      <Stack.Screen options={{
        headerShown: false
      }} />
      <ThemedView style={{ paddingHorizontal: 16 }}>
        <ThemedText style={styles.sectionTitle}>SEL Learning</ThemedText>
        <ThemedView style={styles.sectionHeaderLink}>
          <ThemedText style={styles.sectionSubTitle}>{title}</ThemedText>
          <TouchableOpacity onPress={() => router.push(getRoute() as RelativePathString)}>
            <Image
              source={require("@/assets/images/kid/arrow-right.png")}
              style={styles.sectionArrow}
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F4A672",
    position: "relative",
  },
  topBackPattern: {
    width: "100%",
    height: 220,
    position: "absolute",
    top: 0,
    left: 0,
  },
  headingWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 23,
  },
  logoBallon: { width: 48, height: 48 },
  headerWrap: {
    marginTop: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerTitle: {
    color: "#053B4A",
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 46.2,
  },
  headerStar: {
    width: 32,
    height: 34,
    marginLeft: 8,
  },
  headerSubtitle: {
    color: "#053B4A",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 24.3,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  headerRocket: { width: 224.54, height: 287 },
  headerRocketWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 36,
    marginTop: -56,
    position: "relative",
  },
  imgCloudFar: {
    width: "110%",
    height: 278,
    position: "absolute",
    top: 58,
    left: 0,
    zIndex: -100,
  },
  imgCloudNear: {
    width: "100%",
    height: 279,
    position: "absolute",
    top: 100,
    left: 0,
  },
  pathwayTitle: {
    color: "#053B4A",
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 37.5,
    textAlign: "center",
  },
  pathwaySubTitle: {
    color: "#053B4A80",
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 24,
  },
  sectionHeaderLink: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#053B4A",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 24,
  },
  sectionSubTitle: {
    color: "#053B4A",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "italic",
    lineHeight: 21.68,
  },
  sectionArrow: {
    width: 24,
    height: 24,
  },
  cardScrollContainer: {
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
});
