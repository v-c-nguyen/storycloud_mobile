import BottomNavBar from '@/components/BottomNavBar';
import { StoryCard } from '@/components/Cards';
import Header from '@/components/Header';
import { ItemWithImage } from '@/components/ListItems';
import SeriesCarousel from '@/components/SeriesCarosel';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { childrenData } from '@/data/childrenData';
import { modesData } from '@/data/parent/dashboardData';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';



const parentIcons = {
  learning: require("@/assets/images/parent/learning.png"),
  heart: require("@/assets/images/parent/heart.png"),
  star: require("@/assets/images/parent/star.png"),
  information_circle: require("@/assets/images/parent/information_circle.png")
  // add more as needed
};

const insightIcons = {
  duration: require("@/assets/images/parent/duration.png"),
  steps: require("@/assets/images/parent/steps.png"),
  finished: require("@/assets/images/parent/finished.png"),
};


const storiesData = [
  {
    bgColor: "#F4A672",
    textColor: "#053B4A",
    subTextColor: "#F8ECAE",
    progressColor: "#ADD7DA",
    isBallonYellow: true,
    number: "#1",
    storyTitle: "Petal Tales: The Search for Rainbow Flowers",
    seriesTitle: "KAI’S LIVING ADVENTURE",
    duration: 32,
    progress: 20,
    image: "1",
    featured: false,
    isFavorite: true,
    watched: false,
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

const InsightItemsData: InsightItemProps[] = [
  {
    value: 48,
    what: 'Total Story Time',
    avatar: 'duration'
  },
  {
    value: 5,
    what: 'Total Pathway Steps Finished',
    avatar: 'steps'
  },
  {
    value: 5,
    what: 'Total Stories Finished',
    avatar: 'finished'
  }
]

export default function KidListen() {

  const children = childrenData;
  const modes = modesData;
  const [activeChild, setActiveChild] = React.useState(children[0]);
  const [activeMode, setActiveMode] = React.useState(modes[0]);


  const handleChildSelect = (child: any) => {
    setActiveChild(child);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, display: "flex", height: 500 }}>
        <ThemedView style={{ flex: 1, display: "flex", position: "relative" }}>
          <ScrollView
            style={styles.rootContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 55 }}
          >
            {/* Top background */}
            <Image
              source={require("@/assets/images/parent/top-back-pattern.png")}
              style={styles.topBackPattern}
              contentFit="cover"
            />

            {/* Main Content */}
            <Header role="parent" theme='dark'></Header>
            {/* Header */}


            <ThemedView style={styles.container}>
              <ThemedText style={styles.header}>Continue Playing</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardScrollContainer}
              >
                {children
                  .map((item, idx) => (
                    <ItemWithImage
                      key={idx}
                      name={item.name}
                      avatar={item.avatar_url}
                      active={activeChild.name == item.name}
                      onPress={() => handleChildSelect(item)} />
                  ))}
              </ScrollView>

              <SeriesCarousel mode={"kid"}/>

              <ThemedText style={styles.subTitle} >Watch Next</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardScrollContainer}
              >
                {storiesData
                  .filter((ele) => !ele.watched)
                  .map((item, idx) => (
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
            <BottomNavBar role="kid" active="Listen" theme='light' image={true}/>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

type SectionHeaderProps = {
  title: string;
  avatar: keyof typeof parentIcons;
  avatar1?: keyof typeof parentIcons;
};

type InsightItemProps = {
  value: number;
  what: string;
  avatar: keyof typeof insightIcons
};

const styles = StyleSheet.create({
  myText: {
    fontFamily: 'Sintara-Bold',
    fontSize: 18
  },
  rootContainer: {
    flex: 1,
    backgroundColor: "rgba(5, 59, 74, 1)",
    position: "relative",
  },
  topBackPattern: {
    width: "100%",
    height: 220,
    position: "absolute",
    top: 0,
    left: 0,
  },
  container: {
    marginTop: 60,
    zIndex: 100,
    paddingHorizontal: 16
  },
  header : {
    color: 'white',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 30,
    marginBottom: 30
  },
  subTitle : {
    color: 'white',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 30,
    marginBottom: 20,
    marginTop: 60
  },
  headingWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 23,
  },
  logoBallon: { width: 36, height: 36 },
  logoParent: { width: 48, height: 48 },
  logodown: { width: 24, height: 24 },
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
  headerRocket: { width: 74.68, height: 130.21, zIndex: -1 },
  headerRocketWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    zIndex: -1
  },
  imgCloudFar: {
    width: 427,
    height: 200,
    position: "absolute",
    top: 0,
    left: -37.5,
    zIndex: -100,
  },
  imgCloudNear: {
    width: 427,
    height: 220,
    position: "absolute",
    top: 37,
    left: -20,
  },
  sectionHeader: {
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
  },
  sectionTitle: {
    fontFamily: "Sintara-Bold",
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 24,
  },
  sectionArrow: {
    width: 24,
    height: 24,
  },
  cardScrollContainer: {
    gap: 20,
  },
  insightItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,  // Thickness of the border
    borderColor: 'rgba(252, 252, 252, 0.2)',
    borderStyle: 'solid',
    borderRadius: 20

  },
  itemValue: {
    fontSize: 24,
    color: 'rgba(252, 252, 252, 1)',
    fontWeight: 700
  },
  itemWhat: {
    fontSize: 14,
    fontWeight: 400,
    color: 'rgba(122, 193, 198, 1)'
  },
  insightStyles: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  modesStyle: {
    marginTop: 20,
    marginBottom: 60,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

  },
  modeItemStyle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6
  }
});

