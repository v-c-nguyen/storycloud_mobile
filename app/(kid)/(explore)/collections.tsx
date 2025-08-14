import { supabase } from "@/app/lib/supabase";
import BottomNavBar from "@/components/BottomNavBar";
import { SeriesCard, StoryCard } from "@/components/Cards";
import CardSeries from "@/components/CardSeries";
import { ItemSeries, ItemSeriesRef } from "@/components/ItemSeries";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { series, stories } from "@/data/storyData";
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

export default function Collections() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemSeriesRef = useRef<ItemSeriesRef>(null);
  const storiesData = stories
  const seriesData = series

  // Filter data based on search query
  const filteredCollections = collections.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToExplore = () => {
    setSelectedCollection(null);
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
          {/* <Link href={`/kid/dashboard/${link}`}>
          <Image
            source={require("@/assets/images/kid/arrow-right.png")}
            style={styles.sectionArrow}
          />
        </Link> */}
          <TouchableOpacity onPress={() => { setSelectedCollection(title) }}>
            <Image
              source={require("@/assets/images/kid/arrow-right.png")}
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    );
  }

  useEffect(() => {
    async function fetchSeries() {
      setLoading(true);
      try {
        const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
        const { data, error } = await supabase.functions.invoke('collections', {
          method: 'GET',
          headers: {
            Authorization: jwt ? `Bearer ${jwt}` : '',
          },
        });
        if (error) {
          console.error('Error fetching series:', error.message);

        } else if (data && Array.isArray(data.data)) {
          console.log("Collections::", data.data)
          setCollections(data.data);
        }
      } catch (e) {
        console.error('Error fetching focus modes:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
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
          <ThemedText style={styles.headerTitle}>StoryCloud Collections</ThemedText>

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
              <CardSeries data={cardsData} active="Collections" />
              {/* Story List */}
              <ItemSeries
                ref={itemSeriesRef}
                itemsData={filteredCollections}
                onSelect={(item) => {
                  setSelectedCollection(item ? item.name : null);
                }}
              />

              {
                selectedCollection ?
                  <ThemedView style={{ paddingBottom: 80 }}>
                    <View style={{ alignItems: "center" }}>
                      <ThemedText style={[styles.sectionTitle, { marginTop: 10, color: "#048F99" }]}>{"collection"}</ThemedText>
                      <ThemedText style={[styles.sectionTitle, { marginTop: 10 }]}>{selectedCollection}</ThemedText>
                      <ThemedText style={[styles.sectiondesc, { marginBottom: 5, padding: 20, textAlign: "center" }]}>{" Explore vast jungles, soaring mountains, and sweeping grasslands—Earth's wildest places await."}</ThemedText>
                    <View style={{ backgroundColor: "#d0d0d0ff", height: 1, width: 200 }}></View>
                    </View>
                    
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 20 }}
                      onPress={handleBackToExplore}
                    >
                      <Image
                        source={require("@/assets/images/kid/arrow-left.png")}
                      />
                      <ThemedText style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>{"Back to Explore"}</ThemedText>
                    </TouchableOpacity>

                    <SectionHeader title={selectedCollection} desc="Kai, the adventurous Australian Shepherd, explores forests, gardens, and ponds" link="collection" />
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
                    <SectionHeader title={selectedCollection} desc="Kai, the adventurous Australian Shepherd, explores forests, gardens, and ponds" link="collection" />
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
                  :
                  <ThemedView style={{ paddingBottom: 80 }}>
                    {/* Continue Watching */}
                    <SectionHeader title="The High Seas & Polar Realms" desc="Brand new stories and fun" link="continue" />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.cardScrollContainer}
                    >
                      {seriesData.map((item, idx) => (
                        <SeriesCard key={idx} {...item} />
                      ))}
                    </ScrollView>

                    {/* Watch Next */}
                    <SectionHeader title="Wonders of the Wild World" desc="Friendship, kindness, and emotions" link="continue" />
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
                    <SectionHeader title="Journey Across Lands and Cultures" desc="Silly, funny, and lough-out-loud stories" link="continue" />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.cardScrollContainer}
                    >
                      {storiesData
                        .filter((ele) => ele.featured)
                        .map((item, idx) => (
                          <StoryCard key={idx} {...item} />
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
  cardScrollContainer: {
    gap: 20,
    paddingHorizontal: 16,
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
  imgArrowLeft: {
    width: 20,
    height: 20,
  },
  mainContent: {
    height: '100%',
    marginTop: 90,
    backgroundColor: '#ffffff'
  },
  content: {
    marginTop: -90
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
