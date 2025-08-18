import { supabase } from "@/app/lib/supabase";
import BottomNavBar from "@/components/BottomNavBar";
import { SeriesCard, StoryCard2 } from "@/components/Cards";
import Header from "@/components/Header";
import { PatternBackground } from "@/components/PatternBackground";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { storyOptionsData } from "@/data/libraryData";
import { Stack, router } from "expo-router";
import React, { useEffect } from "react";
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

const charactersData = [
  {
    title: "Kai the Explorer",
    image: "1",
    count: 25,
    isFavorite: true,
  },
  {
    title: "Luna the Brave",
    image: "2",
    count: 18,
    isFavorite: true,
  },
  {
    title: "Max the Helper",
    image: "3",
    count: 20,
    isFavorite: true,
  },
  {
    title: "Zara the Curious",
    image: "4",
    count: 15,
    isFavorite: true,
  },
  {
    title: "Ben the Friendly",
    image: "5",
    count: 22,
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
    storyTitle: "Kai's Big Discovery",
    seriesTitle: "Kai the Explorer",
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
    storyTitle: "Luna's Night Adventure",
    seriesTitle: "Luna the Brave",
    duration: 32,
    progress: 12,
    image: "2",
    featured: false,
    isFavorite: true,
    watched: false,
  },
];

const learningIcon = require("@/assets/images/parent/learning.png")
const searchIcon = require("@/assets/images/parent/icon-search.png")
const listIcon = require("@/assets/images/parent/icon-list.png")
const swapIcon = require("@/assets/images/parent/icon-swap.png")
const downIcon = require("@/assets/images/parent/down.png")

export default function CharactersLibrary() {
  const [categories, setCategory] = React.useState<any[]>([]);
  const storyOptions = storyOptionsData;
  const [activeItem, setActiveItem] = React.useState('Characters');
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [selectedSeries, setSelectedSeries] = React.useState<string | null>(null);


  useEffect(() => {
    async function fetchSeries() {
      try {
        const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
        const { data, error } = await supabase.functions.invoke('characters', {
          method: 'GET',
          headers: {
            Authorization: jwt ? `Bearer ${jwt}` : '',
          },
        });
        if (error) {
          console.error('Error fetching series:', error.message);

        } else if (data && Array.isArray(data.data)) {
          setCategory(data.data);
        }
      } catch (e) {
        console.error('Error fetching focus modes:', e);
      }
    }
    fetchSeries();
  }, []);

  function handleItemSelection(item: string) {
    setActiveItem(item)
    setDropdownVisible(false)

    // Navigate to the appropriate screen based on selection
    switch (item) {
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
              data={categories.map((ele) => ele.name.trim())}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleStoryItem(item)}>
                  <ThemedView style={[styles.categoryPill, selectedSeries === item ? styles.categoryPillActive : styles.categoryPillInactive]}>
                    <View style={[styles.avatarImgContainer, selectedSeries === item ? { backgroundColor: "#F4A672" } : null]}>
                      <Image
                        source={require("@/assets/images/avatars/dano_badger.png")}
                        style={[styles.avatarImg]}
                      />
                    </View>
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
                      <View style={[styles.avatarImgContainer, { width: 60, height: 60, justifyContent: "center", alignItems: "center", marginBottom: 10, margin: 18 }]}>
                        <Image
                          source={require("@/assets/images/avatars/dano_badger.png")}
                          style={[styles.avatarImg]}
                        />
                      </View>
                      <ThemedText style={[styles.sectionTitle, styles.selectionTitleLarge , {lineHeight: 40}]}>{selectedSeries}</ThemedText>
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
                      <TouchableOpacity key={idx} activeOpacity={0.9} onPress={() => { router.push(`./details-screen?from=Characters`) }}>
                        <StoryCard2 {...item} />
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </ThemedView>
            ) : (
              <ThemedView style={styles.bottomPadding}>
                {/* Popular Characters */}
                <View style={styles.headerTitleContainer}>
                  <View>
                    <View style={[styles.avatarImgContainer, { width: 60, height: 60, justifyContent: "center", alignItems: "center", marginBottom: 10, margin: 18 }]}>
                      <Image
                        source={require("@/assets/images/avatars/dano_badger.png")}
                        style={[styles.avatarImg]}
                      />
                    </View>
                    <ThemedText style={[styles.sectionTitle, styles.selectionTitleLarge]}>{"Popular Characters"}</ThemedText>
                    <ThemedText style={[styles.sectionTitle, styles.selectionTitleSmall]}>{"Kids' favorite story characters"}</ThemedText>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleStoryItem("Popular Characters")}
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
                  {charactersData.map((item, idx) => (
                    <SeriesCard key={idx} {...item} />
                  ))}
                </ScrollView>

                {/* Kai's Stories */}
                <View style={styles.headerTitleContainer}>
                  <View>
                    <View style={[styles.avatarImgContainer, { width: 60, height: 60, justifyContent: "center", alignItems: "center", marginBottom: 10, margin: 18 }]}>
                      <Image
                        source={require("@/assets/images/avatars/dano_badger.png")}
                        style={[styles.avatarImg]}
                      />
                    </View>
                    <ThemedText style={[styles.sectionTitle, styles.selectionTitleLarge]}>{"Kai's Adventures"}</ThemedText>
                    <ThemedText style={[styles.sectionTitle, styles.selectionTitleSmall]}>{"Stories featuring Kai the Explorer"}</ThemedText>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleStoryItem("Kai's Adventures")}
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

                {/* All Characters */}
                <View style={styles.headerTitleContainer}>
                  <View>
                    <View style={[styles.avatarImgContainer, { width: 60, height: 60, justifyContent: "center", alignItems: "center", marginBottom: 10, margin: 18 }]}>
                      <Image
                        source={require("@/assets/images/avatars/dano_badger.png")}
                        style={[styles.avatarImg]}
                      />
                    </View>
                    <ThemedText style={[styles.sectionTitle, styles.selectionTitleLarge]}>{"All Characters"}</ThemedText>
                    <ThemedText style={[styles.sectionTitle, styles.selectionTitleSmall]}>{"Meet all the story characters"}</ThemedText>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleStoryItem("All Characters")}
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
                  {charactersData.map((item, idx) => (
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
    flexDirection: "row",
    backgroundColor: 'rgba(122, 193, 198, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(173, 215, 218, 0.5)',
    borderRadius: 20,
    marginTop: 12,
    marginRight: 8,
    alignItems: "center"
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
  },
  avatarImg: {
    height: 30,
    width: 30,
  },
  avatarImgContainer: {
    padding: 10,
    borderColor: "#ffffff",
    borderWidth: 1.5,
    marginRight: 10,
    borderRadius: 999,
    backgroundColor: "rgba(122, 193, 198, 1)"
  }
});