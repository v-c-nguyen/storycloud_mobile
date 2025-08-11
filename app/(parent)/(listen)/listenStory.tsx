import BottomNavBar from '@/components/BottomNavBar';
import Header from '@/components/Header';
import MediaPlayerCard from '@/components/MediaPlayerCard';
import { Finished } from '@/components/Modals';
import AdventureStoryCarousel from '@/components/StoryCarousel';
import { ThemedView } from '@/components/ThemedView';
import { childrenData } from '@/data/childrenData';
import { modesData } from '@/data/parent/dashboardData';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';



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

const musicIcon = require('@/assets/images/parent/music.png')

export default function ListenStory() {
  const router = useRouter();
  const children = childrenData;
  const modes = modesData;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeChild, setActiveChild] = React.useState(children[0]);
  const [activeMode, setActiveMode] = React.useState(modes[0]);


  const handleChildSelect = (child: any) => {
    setActiveChild(child);
  };

  const onNext = () => {
    setModalVisible(false);
  }
  
  const onWatchAgain = () => {
    setModalVisible(false);
  }

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
              {/* Dots */}
              <ThemedView style={styles.cardFooter}>
                <TouchableOpacity onPress={() => router.push('./')}>
                  <Image source={require('@/assets/images/icons/arrow-left.png')} style={styles.leftBtn} />
                </TouchableOpacity>
                <TouchableOpacity >
                  <Image source={musicIcon} style={styles.rightBtn} />
                </TouchableOpacity>
              </ThemedView>

              <MediaPlayerCard onAudioEnd={() => setModalVisible(true)} />


              <AdventureStoryCarousel />

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
            <BottomNavBar role="parent" active="Listen" theme='light' image={true} />
          </ThemedView>
          
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <ThemedView style={styles.modalOverlay}>
              <Finished onNext={onNext} onWatchAgain={onWatchAgain}/>
            </ThemedView>
          </Modal>
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

  cardFooter: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftBtn: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  rightBtn: {
    width: 32,
    height: 24,
    tintColor: 'white',
  },
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
    zIndex: 100,
    paddingHorizontal: 16,
    paddingBottom: 50,
    marginBottom: 50
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 30,
    marginBottom: 30
  },
  subTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 30,
    marginBottom: 20
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
    paddingBottom: 60,
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
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
},
});

