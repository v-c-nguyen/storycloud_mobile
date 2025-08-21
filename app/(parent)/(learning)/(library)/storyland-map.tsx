
import BottomNavBar from "@/components/BottomNavBar";
import { SeriesCard, StoryCard2 } from "@/components/Cards";
import Header from "@/components/Header";
import MapWrapper from "@/components/MapWrapper";
import { PatternBackground } from "@/components/PatternBackground";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { storyOptionsData } from "@/data/libraryData";
import { Stack, router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const mapRegionsData = [
  {
    title: "Enchanted Forest",
    image: "1",
    count: 15,
    isFavorite: true,
  },
  {
    title: "Ocean Kingdom",
    image: "2",
    count: 12,
    isFavorite: true,
  },
  {
    title: "Space Station",
    image: "3",
    count: 18,
    isFavorite: true,
  },
  {
    title: "Magic Mountain",
    image: "4",
    count: 10,
    isFavorite: true,
  },
  {
    title: "Desert Oasis",
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
    storyTitle: "Forest Friends Adventure",
    seriesTitle: "Enchanted Forest",
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
    storyTitle: "Underwater Discovery",
    seriesTitle: "Ocean Kingdom",
    duration: 32,
    progress: 12,
    image: "2",
    featured: false,
    isFavorite: true,
    watched: false,
  },
];

const mapFilterData = [
  { name: "FOREST REGION", avatar_url: undefined, symbol: undefined },
  { name: "OCEAN REGION", avatar_url: undefined, symbol: undefined },
  { name: "MOUNTAIN REGION", avatar_url: undefined, symbol: undefined },
  { name: "DESERT REGION", avatar_url: undefined, symbol: undefined },
  { name: "ARCTIC REGION", avatar_url: undefined, symbol: undefined },
];

const learningIcon = require("@/assets/images/parent/learning.png")
const searchIcon = require("@/assets/images/parent/icon-search.png")
const listIcon = require("@/assets/images/parent/icon-list.png")
const swapIcon = require("@/assets/images/parent/icon-swap.png")
const downIcon = require("@/assets/images/parent/down.png")

export default function StorylandMapLibrary() {
  const [mapRegions, setMapRegions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const storyOptions = storyOptionsData;
  const [activeItem, setActiveItem] = React.useState('Storyland Map');
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [selectedSeries, setSelectedSeries] = React.useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   async function fetchMapRegions() {
  //     try {
  //       const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
  //       const { data, error } = await supabase.functions.invoke('map-regions', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: jwt ? `Bearer ${jwt}` : '',
  //         },
  //       });
  //       if (error) {
  //         console.error('Error fetching map regions:', error.message);

  //       } else if (data && Array.isArray(data.data)) {
  //         setMapRegions(data.data);
  //       }
  //     } catch (e) {
  //       console.error('Error fetching map regions:', e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchMapRegions();
  // }, []);

  function handleItemSelection(item: string) {
    setActiveItem(item)
    setDropdownVisible(false)
    
    // Navigate to the appropriate screen based on selection
    switch(item) {
      case 'Stories':
        router.push('/(parent)/(learning)/(library)');
        break;
      case 'Series':
        router.push('/(parent)/(learning)/(library)/series');
        break;
      case 'Collections':
        router.push('/(parent)/(learning)/(library)/collections');
        break;
      case 'Themes':
        router.push('/(parent)/(learning)/(library)/themes');
        break;
      case 'Characters':
        router.push('/(parent)/(learning)/(library)/characters');
        break;
      case 'Learning Target':
        router.push('/(parent)/(learning)/(library)/learning-target');
        break;
      case 'Storyland Map':
        router.push('/(parent)/(learning)/(library)/storyland-map');
        break;
    }
  }

  function handleStoryItem(item: string) {
    selectedSeries === item ? setSelectedSeries(null) : setSelectedSeries(item);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PatternBackground>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView style={styles.safeAreaContainer}>
          <ThemedView style={styles.themedViewContainer}>
            <ScrollView
              style={styles.rootContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {/* Top background */}
              <Image
                source={require("@/assets/images/kid/top-back-pattern.png")}
                style={styles.topBackPattern}
                resizeMode="cover"
              />

              <Header icon={learningIcon} role="parent" title="Learning" theme="dark"></Header>

              {/* Header */}
              <ThemedView style={styles.topRow}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('./(parent)/search-screen')}>
                  <Image source={searchIcon} tintColor={'white'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Image source={swapIcon} tintColor={'white'} />
                </TouchableOpacity>

                {/* Dropdown toggle */}
                <TouchableOpacity
                  style={styles.dropdownToggle}
                  onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                  <ThemedView style={styles.ActiveItemStyle} >
                    <Image source={listIcon} tintColor={'rgba(5, 59, 74, 1)'} />
                  </ThemedView>
                  <ThemedText style={styles.dropdownText}>{activeItem}</ThemedText>
                  <Image source={downIcon} tintColor={'rgba(122, 193, 198, 1)'} />
                </TouchableOpacity>
              </ThemedView>

              {/* Category pills */}
              <FlatList
                horizontal
                data={mapRegions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleStoryItem(item)}>
                    <ThemedView style={[styles.categoryPill, selectedSeries === item ? styles.categoryPillActive : styles.categoryPillInactive]}>
                      <ThemedText style={[styles.categoryText, selectedSeries === item ? { color: 'rgba(5, 59, 74, 1)' } : null]}>{item}</ThemedText>
                    </ThemedView>
                  </TouchableOpacity>
                )}
                style={styles.categoryPillsContainer}
                showsHorizontalScrollIndicator={false}
              />

              {/* Dropdown modal */}
              <Modal
                transparent
                visible={dropdownVisible}
                animationType="fade"
                onRequestClose={() => setDropdownVisible(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  onPress={() => setDropdownVisible(false)}
                  activeOpacity={1}
                >
                  <ThemedView style={styles.dropdownMenu}>
                    {storyOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => handleItemSelection(option)} >
                        <ThemedView style={[{ padding: 3 }, option === activeItem && styles.ActiveItemStyle]} >
                          <Image
                            source={listIcon}
                            tintColor={option === activeItem ? 'rgba(5, 59, 74, 1)' : 'rgba(122, 193, 198, 1)'}
                          />
                        </ThemedView>
                        <ThemedText style={styles.dropdownItemText}>{option}</ThemedText>
                      </TouchableOpacity>
                    ))}
                  </ThemedView>
                </TouchableOpacity>
              </Modal>
              {selectedSeries ? (
                <ThemedView style={styles.selectionContainer}>
                  <View style={styles.detailsSection}>
                    <View style={styles.selectionHeaderRow}>
                      <View>
                        <ThemedText style={[styles.sectionTitle, styles.selectionTitleLarge, { lineHeight: 40 }]}>{selectedSeries}</ThemedText>
                        <ThemedText style={[styles.sectionTitle, styles.selectionTitleSmall]}>{"Brand new stories and fun"}</ThemedText>
                      </View>
                      <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedSeries(null)}>
                        <Image
                          source={require("@/assets/images/kid/arrow-down.png")}
                          style={styles.closeArrow}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.statsContainer}>
                      <ThemedText style={styles.statsText}>ALL</ThemedText>
                      <View style={styles.divider} />
                      <View style={styles.statsIconContainer}>
                        <Image
                          source={require("@/assets/images/kid/check.png")}
                          style={styles.statsIcon}
                          resizeMode="contain"
                        />
                        <ThemedText style={styles.statsTextOrange}>10 SERIES</ThemedText>
                      </View>
                      <View style={styles.divider} />
                      <ThemedText style={styles.statsText}>101 STORIES</ThemedText>
                    </View>
                  </View>
                  <ScrollView
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardScrollContent}
                  >
                    {storiesData
                      .filter((ele) => !ele.watched)
                      .map((item, idx) => (
                        <TouchableOpacity key={idx} activeOpacity={0.9} onPress={() => { router.push(`./details-screen?from=Storyland Map`) }}>
                          <StoryCard2 {...item} />
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </ThemedView>
              ) : (


                <ThemedView style={styles.bottomPadding}>
                  <ThemedView style={{ height: 1000, width: "100%", marginBottom: 80 }}>
                    <MapWrapper />
                  </ThemedView>
                  {/* Map Regions */}
                  <View style={styles.headerTitleContainer}>
                    <SectionHeader title="Storyland Regions" desc="Explore different story worlds" link="continue" />
                    <TouchableOpacity
                      onPress={() => handleStoryItem("Storyland Regions")}
                    >
                      <Image
                        source={require("@/assets/images/kid/arrow-right.png")}
                        style={styles.arrowIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardScrollContainer}
                  >
                    {mapRegions.map((item, idx) => (
                      <SeriesCard key={idx} {...item} />
                    ))}
                  </ScrollView>

                  {/* Enchanted Forest Stories */}
                  <View style={styles.headerTitleContainer}>
                    <SectionHeader title="Enchanted Forest" desc="Magical stories from the forest" link="continue" />
                    <TouchableOpacity
                      onPress={() => handleStoryItem("Enchanted Forest")}
                    >
                      <Image
                        source={require("@/assets/images/kid/arrow-right.png")}
                        style={styles.arrowIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardScrollContainer}
                  >
                    {storiesData.map((item, idx) => (
                      <StoryCard2 key={idx} {...item} />
                    ))}
                  </ScrollView>

                  {/* All Regions */}
                  <View style={styles.headerTitleContainer}>
                    <SectionHeader title="All Storyland Regions" desc="Complete map of story worlds" link="continue" />
                    <TouchableOpacity
                      onPress={() => handleStoryItem("All Storyland Regions")}
                    >
                      <Image
                        source={require("@/assets/images/kid/arrow-right.png")}
                        style={styles.arrowIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardScrollContainer}
                  >
                    {mapRegions.map((item, idx) => (
                      <SeriesCard key={idx} {...item} />
                    ))}
                  </ScrollView>
                </ThemedView>
              )}
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
              <BottomNavBar role="parent" active="Learning" subActive="Library" />
            </ThemedView>
          </ThemedView>
        </SafeAreaView >
      </PatternBackground>
    </GestureHandlerRootView>
  );
}

function SectionHeader({ title, desc, link }: { title: string; desc: string, link: string }) {
  return (
    <ThemedView >
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
    backgroundColor: "rgba(5, 59, 74, 1)",
    position: "relative",
    paddingBottom: 60
  },
  selectionContainer: {
    paddingBottom: 120,
    alignItems: "center",
    borderColor: "rgba(122, 193, 198, 0.5)",
    borderWidth: 1,
    backgroundColor: "rgba(5, 59, 74, 1)",
    marginTop: 50,
    borderRadius: 20,
    marginHorizontal: 16,
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
    color: "#ffffff",
    fontSize: 24,
    marginTop: 60,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  sectiondesc: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: 'italic',
    lineHeight: 24,
  },
  sectionArrow: {
    width: 24,
    height: 24,
  },
  cardScrollContainer: {
    gap: 20,
    paddingHorizontal: 16,
  },
  topRow: {
    marginTop: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(122, 193, 198, 0.5)',
    borderRadius: 50
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(122, 193, 198, 0.5)',
    padding: 3,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  dropdownText: {
    color: 'rgba(122, 193, 198, 1)',
    fontSize: 16,
    marginHorizontal: 6,
    fontWeight: '400',
  },
  categoryPill: {
    backgroundColor: 'rgba(122, 193, 198, 0.2)',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(173, 215, 218, 0.5)',
    borderRadius: 20,
    marginTop: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    color: 'rgba(173, 215, 218, 1)',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdownMenu: {
    backgroundColor: '#003F4D',
    borderRadius: 20,
    borderColor: 'rgba(122, 193, 198, 0.5)',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginTop: 40,
    marginRight: 20,
    width: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  dropdownItemText: {
    color: 'rgba(122, 193, 198, 1)',
    fontSize: 16,
  },
  ActiveItemStyle: {
    backgroundColor: 'rgba(244, 166, 114, 1)',
    borderRadius: '50%',
    padding: 3
  },
  detailsSection: {
    marginBottom: 5,
    width: "100%",
    borderColor: "rgba(122, 193, 198, 0.5)",
    borderBottomWidth: 1,
    marginTop: 40,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  safeAreaContainer: {
    flex: 1,
    display: "flex",
    height: 500
  },
  themedViewContainer: {
    flex: 1,
    display: "flex",
    position: "relative"
  },
  scrollViewContent: {
    paddingBottom: 55
  },
  categoryPillActive: {
    backgroundColor: 'rgba(122, 193, 198, 1)'
  },
  categoryPillInactive: {
    backgroundColor: 'rgba(122, 193, 198, 0.2)'
  },
  categoryPillsContainer: {
    paddingHorizontal: 16
  },
  selectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  selectionTitleLarge: {
    marginTop: 0,
    fontSize: 30
  },
  selectionTitleSmall: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "100"
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20
  },
  closeArrow: {
    tintColor: "#F4A672"
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center"
  },
  statsText: {
    color: "#048F99",
    fontWeight: "700",
    fontSize: 20
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: "#ccc",
    marginHorizontal: 8
  },
  statsIconContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  statsIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
    tintColor: "#F4A672"
  },
  statsTextOrange: {
    color: "#F4A672",
    fontWeight: "700",
    fontSize: 20
  },
  cardScrollContent: {
    gap: 20,
    paddingHorizontal: 16,
    paddingLeft: 30,
    paddingTop: 30
  },
  bottomPadding: {
    paddingBottom: 80
  },
  arrowIcon: {
    tintColor: "#F4A672",
    marginRight: 16,
    marginBottom: 10
  }
});