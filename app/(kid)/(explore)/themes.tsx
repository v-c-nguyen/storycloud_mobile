import { supabase } from "@/app/lib/supabase";
import BottomNavBar from "@/components/BottomNavBar";
import { SeriesCard } from "@/components/Cards";
import CardSeries from "@/components/CardSeries";
import { ItemSeries, ItemSeriesRef } from "@/components/ItemSeries";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


const cardsData = [
  { color: '#FFFFFF', icon: require('@/assets/images/parent/series.png'), text: 'Series' },
  { color: '#F8ECAE', icon: require('@/assets/images/parent/collections.png'), text: 'Collections' },
  { color: '#ADD7DA', icon: require('@/assets/images/parent/map.png'), text: 'Map' },
  { color: '#7AC1C6', icon: require('@/assets/images/parent/themes.png'), text: 'Themes' },
  { color: '#053B4A', icon: require('@/assets/images/parent/characters.png'), text: 'Characters' },
];


const seriesData = [
  {
    title: "ADVENTURE & EXPLORATION",
    image: "1",
    count: 8,
    isFavorite: true,
  },
  {
    title: "FRIENDSHIP & KINDNESS",
    image: "2",
    count: 8,
    isFavorite: true,
  },
  {
    title: "LEARNING & DISCOVERY",
    image: "3",
    count: 8,
    isFavorite: true,
  },
  {
    title: "NATURE & ENVIRONMENT",
    image: "4",
    count: 8,
    isFavorite: true,
  },
  {
    title: "CREATIVITY & IMAGINATION",
    image: "5",
    count: 8,
    isFavorite: true,
  },
];


const storiesData = [
  {
    bgColor: "#F4A672",
    textColor: "#053B4A",
    subTextColor: "#F8ECAE",
    progressColor: "#ADD7DA",
    isBallonYellow: true,
    number: "#1",
    storyTitle: "The Adventure Begins",
    seriesTitle: "ADVENTURE & EXPLORATION",
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
    storyTitle: "Friendship Tales",
    seriesTitle: "FRIENDSHIP & KINDNESS",
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
    storyTitle: "Learning Adventures",
    seriesTitle: "LEARNING & DISCOVERY",
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
    storyTitle: "Nature's Wonders",
    seriesTitle: "NATURE & ENVIRONMENT",
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
    storyTitle: "Creative Journeys",
    seriesTitle: "CREATIVITY & IMAGINATION",
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
    storyTitle: "Magical Stories",
    seriesTitle: "CREATIVITY & IMAGINATION",
    duration: 32,
    progress: 20,
    image: "3",
    featured: false,
    isFavorite: false,
    watched: true,
  },
];

export default function Themes() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemSeriesRef = useRef<ItemSeriesRef>(null);

  // Filter data based on search query
  const filteredThemes = themes.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToExplore = () => {
    setSelectedTheme(null);
    setSearchQuery("");
    // Reset ItemSeries selection
    if (itemSeriesRef.current) {
      itemSeriesRef.current.resetSelection();
    }
  };


  function SectionHeader({ title, desc, link }: { title: string; desc: string, link: string }) {
  return (
    <ThemedView >
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <ThemedView style={styles.sectionHeader}>
        <ThemedText style={styles.sectiondesc}>{desc}</ThemedText>
        <TouchableOpacity onPress={() => {setSelectedTheme(title)}}>
          <Image
            source={require("@/assets/images/kid/arrow-right.png")}
          />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}


  useEffect(() => {
    async function fetchThemes() {
      setLoading(true);
      try {
        const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
        const { data, error } = await supabase.functions.invoke('themes', {
          method: 'GET',
          headers: {
            Authorization: jwt ? `Bearer ${jwt}` : '',
          },
        });
        if (error) {
          console.error('Error fetching themes:', error.message);

        } else if (data && Array.isArray(data.data)) {
          setThemes(data.data);
        }
      } catch (e) {
        console.error('Error fetching themes:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchThemes();
  }, []);

  return (
    <>
      <Stack.Screen options={{
        headerShown: false
      }} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.rootContainer}
          showsVerticalScrollIndicator={false}
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
          <ThemedText style={styles.headerTitle}>StoryCloud Themes</ThemedText>

          <ThemedView style={styles.headerCloudWrap}>
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
            {/* Header */}
            <ThemedView style={{ paddingTop: 25, paddingHorizontal: 16, width: '100%' }}>
              <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }}>StoryCloud Series</ThemedText>
              <ThemedView
                style={styles.searchBoxStyle}
              >
                <Image source={require('@/assets/images/parent/icon-search.png')} style={styles.searchIcon}></Image>
                <TextInput
                  placeholder="Search for your next adventure..."
                  placeholderTextColor={'#D9D9D9'}
                  style={styles.searchText}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <Image source={require('@/assets/images/parent/Microphone4.png')} style={styles.searchIcon}></Image>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.mainContent}>
            <ThemedView style={styles.content}>
              {/* Tab Bar */}
              <CardSeries data={cardsData} active={'Themes'} />

              {/* Themes List */}
              <ItemSeries
                ref={itemSeriesRef}
                itemsData={filteredThemes}
                onSelect={(item) => {
                  setSelectedTheme(item ? item.name : null);
                }}
              />
              {
                selectedTheme ?
                  <ThemedView style={{ paddingBottom: 80, alignItems: "center", paddingLeft: 20 }}>
                    <ThemedText style={[styles.sectionTitle, { marginTop: 10 }]}>{selectedTheme}</ThemedText>
                    <ThemedText style={[styles.sectiondesc, { marginBottom: 5 , padding:20 , textAlign:"center"}]}>{" Discover amazing stories that teach important life lessons and values. Each theme brings unique adventures that inspire courage, kindness, and imagination in young minds."}</ThemedText>
                    <ThemedText style={[styles.sectionTitle, { marginTop: 10 , color : "#048F99"}]}>{"10 stories"}</ThemedText>
                    <View style={{backgroundColor:"#d0d0d0ff", height:1 , width:200}}></View>
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row" , alignItems:"center", justifyContent:"center" , margin:20}}
                    onPress={handleBackToExplore}
                    >
                      <Image
                        source={require("@/assets/images/kid/arrow-left.png")}
                      />
                      <ThemedText style={[styles.sectionTitle , {marginTop:0 , marginBottom:0}]}>{"Back to Explore"}</ThemedText>
                    </TouchableOpacity>

                    <ScrollView
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.cardScrollContainer}
                    >
                      {seriesData
                        .map((item, idx) => (
                          <SeriesCard key={idx} {...item} />
                        ))}
                    </ScrollView>
                  </ThemedView>

                  :
                  <ThemedView style={{ paddingBottom: 80 }}>
                    {/* Continue Watching */}
                    <SectionHeader title="Adventure & Exploration" desc="Brand new stories and fun" link="continue" />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.cardScrollContainer}
                    >
                      {seriesData
                        .map((item, idx) => (
                          <SeriesCard key={idx} {...item} />
                        ))}
                    </ScrollView>

                    {/* Watch Next */}
                    <SectionHeader title="Friendship & Kindness" desc="Friendship, kindness, and emotions" link="continue" />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.cardScrollContainer}
                    >
                      {seriesData.map((item, idx) => (
                        <SeriesCard key={idx} {...item} />
                      ))}
                    </ScrollView>

                    {/* Featured Adventures */}
                    <SectionHeader title="Learning & Discovery" desc="Educational and inspiring stories" link="continue" />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.cardScrollContainer}
                    >
                      {seriesData
                        .map((item, idx) => (
                          <SeriesCard key={idx} {...item} />
                        ))}
                    </ScrollView>

                    {/* Just Watched */}
                    {/* <SectionHeader title="Just Watched" link="watched" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContainer}>
              {storiesData.filter(ele => ele.watched).map((item, idx) => (
                <StoryCard key={idx} {...item} />
              ))}
            </ScrollView> */}
                  </ThemedView>
              }
              {/* Story List */}
            </ThemedView>
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
          <BottomNavBar active="Explore" theme="light" image={true} />
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F8ECAE",
    position: "relative",
  },
  topBackPattern: {
    width: "100%",
    height: 220,
    position: "absolute",
    top: 0,
    left: 0,
  },
  sectionHeader: {
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#053B4A",
    fontSize: 24,
    marginTop: 60,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  sectiondesc: {
    color: "#053B4A",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: 'italic',
    lineHeight: 24,
  },
  headingWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 23,
  },
  logoBallon: { width: 48, height: 48 },
  headerTitle: {
    color: "#053B4A",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 33.6,
    textAlign: "center",
    marginTop: 67,
    marginBottom: 66,
  },
  backWrap: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 84,
    marginBottom: 58,
  },
  cardScrollContainer: {
    gap: 20,
    paddingHorizontal: 16,
  },
  imgArrowLeft: {
    width: 20,
    height: 20,
  },
  backText: {
    color: "#F4A672",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 18,
  },
  headerCloudWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -90,
    position: "relative",
  },
  mainContent: {
    height: '100%',
    marginTop: 90,
    backgroundColor: '#ffffff',
  },
  content: {
    marginTop: -90
  },
  imgCloudFar: {
    width: "100%",
    height: 278,
    position: "absolute",
    top: 0,
    left: 0,
  },
  imgCloudNear: {
    width: "100%",
    height: 279,
    position: "absolute",
    top: 42,
    left: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cardWrap: {
    marginBottom: 16,
    alignItems: "center",
  },
  searchBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    width: "100%",
    fontSize: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    gap: 10
  },
  searchText: {
    width: '100%',
    outlineWidth: 0,
    fontSize: 14,
    paddingVertical: 10
  },
  searchIcon: {

  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tabItem: {
    alignItems: 'center',
  },
});