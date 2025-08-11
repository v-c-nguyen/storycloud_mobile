import { supabase } from '@/app/lib/supabase';
import { useUser } from '@/app/lib/UserContext';
import BottomNavBar from '@/components/BottomNavBar';
import { SeriesCard, StoryCard } from '@/components/Cards';
import Header from '@/components/Header';
import { ItemWithImage } from '@/components/ListItems';
import LearningModeScreen from '@/components/Modals/LearningModeScreen';
import { ModeList } from '@/components/ModeList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { modesData } from '@/data/parent/dashboardData';
import { stories } from '@/data/storyData';
import { useChildrenStore } from '@/store/childrenStore';
import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';



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

export default function ParentDashboard() {
  const storiesData = stories;
  const modes = modesData;
  const { user } = useUser();
  const children = useChildrenStore((state: any) => state.children);
  const setChildren = useChildrenStore((state: any) => state.setChildren);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeChild, setActiveChild] = React.useState(children[0]);
  const [activeMode, setActiveMode] = React.useState(modes[0]);
  const [loading, setLoading] = React.useState(false);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [currentRecommendCardIndex, setCurrentRecommendCardIndex] = React.useState(0);

  useEffect(() => {
    // Fetch children data from Supabase edge function and sync Zustand store
    async function fetchChildren() {
      if (!user?.id) return;
      setLoading(true); // Start loading
      const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
      const { data, error } = await supabase.functions.invoke('children', {
        method: 'GET',
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : '',
        },
      });
      if (error) {
        setLoading(false); // Stop loading
        console.error('Error fetching children:', error.message);
        return;
      }
      if (data && Array.isArray(data.data)) {
        setLoading(false); // Stop loading
        setChildren(data.data);
        setActiveChild(data.data[0]);
      }
    }
    fetchChildren();
  }, [user]);



  const handleChildSelect = (child: any) => {
    setActiveChild(child);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <LearningModeScreen onCancel={() => setModalVisible(false)} />
      </Modal>
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
            <Image
              source={require("@/assets/images/parent/frontbox.png")}
              style={styles.frontBox}
              contentFit="cover"
            />

            {/* Main Content */}
            <Header role="parent"></Header>
            {/* Header */}

            <ThemedView style={styles.headerRocketWrap}>
              <Image
                source={require("@/assets/images/parent/parent_stars.png")}
                style={styles.headerRocket}
                contentFit="cover"
              />
              {/* Clouds */}
              <ThemedView style={styles.imgCloudFar}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require("@/assets/images/parent/cloud-group-far.png")}
                  contentFit="cover"
                />
              </ThemedView>
              <ThemedView style={styles.imgCloudNear}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require("@/assets/images/parent/cloud-group-near.png")}
                  contentFit="cover"
                />
              </ThemedView>
            </ThemedView>
            {
              loading ? (
              <ActivityIndicator color="#ffffff" />
              ): 
              children?.length > 0 ? (
                <ThemedView style={{ marginTop: 26, marginBottom: 70, zIndex: 100 }}>
                  {/* Continue Watching */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardScrollContainer}
                  >
                    {children
                      .map((item: any, idx: any) => (
                        <ItemWithImage
                          key={idx}
                          name={item.name}
                          avatar={item.avatar_url}
                          active={activeChild?.name == item.name}
                          onPress={() => handleChildSelect(item)} />
                      ))}
                  </ScrollView>

                  <ThemedView style={[{ marginTop: 50 }, styles.btnRow]}>
                    <SectionHeader title="Learning Mode" avatar="learning" />
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => setModalVisible(true)}>
                      <Image source={parentIcons.information_circle} style={styles.informationBtn} />
                    </TouchableOpacity>
                  </ThemedView>
                  <ThemedView style={styles.modesStyle}>
                    <ModeList active={activeChild} selectActiveChild={setActiveChild} />
                  </ThemedView>

                  <SectionHeader title="Recent Learning" avatar="learning" />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={event => {
                      const x = event.nativeEvent.contentOffset.x;
                      const cardWidth = 290 + 25; // card width + gap (adjust if needed)
                      const index = Math.round(x / cardWidth);
                      setCurrentCardIndex(index);
                    }}
                    contentContainerStyle={styles.cardScrollContainer}
                  >
                    {storiesData
                      // .filter((ele) => !ele.watched)
                      .map((item, idx) => (
                        <StoryCard key={idx} {...item} />
                      ))}
                  </ScrollView>

                  {/* Pagination Dots */}
                  <ThemedView style={styles.pagination}>
                    {storiesData.map((_, idx) => (
                      <ThemedView
                        key={idx}
                        style={[
                          styles.dot,
                          idx === currentCardIndex && styles.activeDot,
                        ]}
                      />
                    ))}
                  </ThemedView>

                  {/* Watch Next */}
                  <SectionHeader title="Recommended" avatar="heart" />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={event => {
                      const x = event.nativeEvent.contentOffset.x;
                      const cardWidth = 290 + 25; // card width + gap (adjust if needed)
                      const index = Math.round(x / cardWidth);
                      setCurrentRecommendCardIndex(index);
                    }}
                    contentContainerStyle={styles.cardScrollContainer}
                  >
                    {seriesData.map((item, idx) => (
                      <SeriesCard key={idx} {...item} />
                    ))}
                  </ScrollView>

                  {/* Pagination Dots */}
                  <ThemedView style={styles.pagination}>
                    {seriesData.map((_, idx) => (
                      <ThemedView
                        key={idx}
                        style={[
                          styles.dot,
                          idx === currentRecommendCardIndex && styles.activeDot,
                        ]}
                      />
                    ))}
                  </ThemedView>
                  {/* Featured Adventures */}
                  <SectionHeader title="Insights" avatar="star" />

                  <ThemedView style={styles.insightStyles}>
                    <ThemedText style={{ fontSize: 20, fontWeight: 700, color: 'rgba(173,215,218,1)' }}>Daily</ThemedText>
                    {
                      InsightItemsData?.map((item, index) => {
                        return (
                          <InsightItem key={index} value={item.value} what={item.what} avatar={item.avatar} />
                        )
                      })
                    }
                  </ThemedView>
                  {/* Just Watched */}
                  {/* <SectionHeader title="Just Watched" link="watched" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContainer}>
              {storiesData.filter(ele => ele.watched).map((item, idx) => (
                <StoryCard key={idx} {...item} />
              ))}
            </ScrollView> */}
                </ThemedView>
              ) : (
                <ThemedView style={{ marginTop: 60, alignItems: 'center', justifyContent: 'center', zIndex:999 }}>
                  <ThemedText style={{ fontSize: 18, color: '#ffffff', marginBottom: 16 }}>
                    No children data
                  </ThemedText>
                  <Link href="/(parent)/(profiles)/(account)">
                    <ThemedText style={{textDecorationLine: 'underline',color: '#F4A672',fontStyle: 'italic', fontSize: 16 }}>Go to Profile Settings</ThemedText>
                  </Link>
                </ThemedView>
              )
            }
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
            <BottomNavBar role="parent" active="Dashboard" />
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


export function SectionHeader({ title, avatar, avatar1 }: SectionHeaderProps) {
  return (
    <ThemedView style={styles.sectionHeader}>
      <Image
        source={parentIcons[avatar]}
        style={styles.logodown}
        contentFit="cover"
      />
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {avatar1 &&
        <Image
          source={parentIcons[avatar1]}
          style={styles.logodown}
          contentFit="cover"
        />}
    </ThemedView>
  );
}

function InsightItem({ value, what, avatar }: InsightItemProps) {
  return (
    < ThemedView style={styles.insightItem} >
      < ThemedView style={{
        padding: 20,
        borderRadius: 25,
        borderWidth: 1,  // Thickness of the border
        borderColor: 'rgba(252, 252, 252, 0.2)',
        borderStyle: 'solid',
      }} >
        <Image
          source={insightIcons[avatar]}
          style={styles.logodown}
          contentFit="cover"
        />
      </ThemedView>
      <ThemedView style={{ display: 'flex', flexDirection: 'column' }}>
        <ThemedText style={styles.itemValue}>{value}</ThemedText>
        <ThemedText style={styles.itemWhat}>{what}</ThemedText>
      </ThemedView>
    </ThemedView >
  );
}

const styles = StyleSheet.create({
  myText: {
    fontFamily: 'Sintara-Bold',
    fontSize: 18
  },
  rootContainer: {
    flex: 1,
    backgroundColor: "#ADD7DA",
    position: "relative",
  },
  topBackPattern: {
    width: "100%",
    height: 220,
    position: "absolute",
    top: 0,
    left: 0,
  },
  frontBox: {
    position: "absolute",
    top: 225,
    zIndex: 1,
    width: 554,
    height: 2157,
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
    width: 435,
    height: 200,
    position: "absolute",
    top: 5,
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
    marginBottom: 20,
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
    paddingHorizontal: 16,
    paddingBottom: 10,
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
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  informationBtn: {
    width: 24,
    height: 24,
    tintColor: 'rgba(122, 193, 198, 1)'
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: 'rgba(122, 193, 198, 1)',
    margin: 4,
  },
  activeDot: {
    backgroundColor: 'rgba(122, 193, 198, 1)',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

