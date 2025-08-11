import BottomNavBar from "@/components/BottomNavBar";
import CardSeries from "@/components/CardSeries";
import { SeriesCard } from "@/components/Cards";
import { ItemSeries, ItemSeriesRef } from "@/components/ItemSeries";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";


const cardsData = [
  { color: '#FFFFFF', icon: require('@/assets/images/parent/series.png'), text: 'Series' },
  { color: '#F8ECAE', icon: require('@/assets/images/parent/collections.png'), text: 'Collections' },
  { color: '#ADD7DA', icon: require('@/assets/images/parent/map.png'), text: 'Map' },
  { color: '#7AC1C6', icon: require('@/assets/images/parent/themes.png'), text: 'Themes' },
  { color: '#053B4A', icon: require('@/assets/images/parent/characters.png'), text: 'Characters' },
];

// Sample map data for filtering
const mapFilterData = [
  { name: "FOREST REGION", avatar_url: undefined, symbol: undefined },
  { name: "OCEAN REGION", avatar_url: undefined, symbol: undefined },
  { name: "MOUNTAIN REGION", avatar_url: undefined, symbol: undefined },
  { name: "DESERT REGION", avatar_url: undefined, symbol: undefined },
  { name: "ARCTIC REGION", avatar_url: undefined, symbol: undefined },
];

const seriesData = [
  {
    title: "FOREST ADVENTURES",
    image: "1",
    count: 6,
    isFavorite: true,
  },
  {
    title: "OCEAN EXPLORATIONS",
    image: "2",
    count: 8,
    isFavorite: true,
  },
  {
    title: "MOUNTAIN QUESTS",
    image: "3",
    count: 5,
    isFavorite: false,
  },
];

export default function Map() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const itemSeriesRef = useRef<ItemSeriesRef>(null);

  const handleBackToExplore = () => {
    setSelectedRegion(null);
    if (itemSeriesRef.current) {
      itemSeriesRef.current.resetSelection();
    }
  };

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
          <ThemedText style={styles.headerTitle}>StoryCloud Map</ThemedText>

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
                />
                <Image source={require('@/assets/images/parent/Microphone4.png')} style={styles.searchIcon}></Image>
              </ThemedView>
            </ThemedView>
          </ThemedView>


          {/* Tab Bar */}
          <CardSeries data={cardsData} active="Map"/>
          
          {/* Map Regions List */}
          <ItemSeries
            ref={itemSeriesRef}
            itemsData={mapFilterData}
            onSelect={(item) => {
              setSelectedRegion(item ? item.name : null);
            }}
          />
          
          {
            selectedRegion ?
              <ThemedView style={{ paddingBottom: 80, alignItems: "center", paddingLeft: 20 }}>
                <Image
                  source={require("@/assets/images/kid/icon-heart.png")}
                  style={{ marginTop: 20 }}
                />
                <ThemedText style={[styles.sectionTitle, { marginTop: 10, color: "#048F99" }]}>{"region"}</ThemedText>
                <ThemedText style={[styles.sectionTitle, { marginTop: 10 }]}>{selectedRegion}</ThemedText>
                <ThemedText style={[styles.sectiondesc, { marginBottom: 5, padding: 20, textAlign: "center" }]}>{" Explore amazing stories from different regions of the world. Each region has unique adventures and discoveries waiting for you."}</ThemedText>
                <TouchableOpacity style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
                  onPress={handleBackToExplore}
                >
                  <Image
                    source={require("@/assets/images/kid/arrow-left.png")}
                    style={{ marginTop: 47 }}
                  />
                  <ThemedText style={styles.sectionTitle}>{"Back to Explore"}</ThemedText>
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
                {/* Forest Adventures */}
                <SectionHeader title="Forest Adventures" desc="Explore the magical forest regions" link="continue" />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardScrollContainer}
                >
                  {seriesData
                    .filter((item) => item.title.includes("FOREST"))
                    .map((item, idx) => (
                      <SeriesCard key={idx} {...item} />
                    ))}
                </ScrollView>

                {/* Ocean Explorations */}
                <SectionHeader title="Ocean Explorations" desc="Dive into ocean adventures" link="continue" />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardScrollContainer}
                >
                  {seriesData
                    .filter((item) => item.title.includes("OCEAN"))
                    .map((item, idx) => (
                      <SeriesCard key={idx} {...item} />
                    ))}
                </ScrollView>

                {/* Mountain Quests */}
                <SectionHeader title="Mountain Quests" desc="Climb to new heights" link="continue" />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardScrollContainer}
                >
                  {seriesData
                    .filter((item) => item.title.includes("MOUNTAIN"))
                    .map((item, idx) => (
                      <SeriesCard key={idx} {...item} />
                    ))}
                </ScrollView>
              </ThemedView>
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
          <BottomNavBar active="Explore" theme="light" image={true} />
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

function SectionHeader({ title, desc, link }: { title: string; desc: string; link: string }) {
  return (
    <ThemedView>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <ThemedView style={styles.sectionHeader}>
        <ThemedText style={styles.sectiondesc}>{desc}</ThemedText>
      </ThemedView>
    </ThemedView>
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
    gap: 10,
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
  cardScrollContainer: {
    gap: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchText: {
    width: '100%',
    outlineWidth: 0,
    fontSize: 14,
    paddingVertical: 10,
  },
  searchIcon: {},
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
