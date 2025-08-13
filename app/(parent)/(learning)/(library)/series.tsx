import BottomNavBar from "@/components/BottomNavBar";
import { SeriesCard } from "@/components/Cards";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { categoryData, storyOptionsData } from "@/data/libraryData";
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
} from "react-native";

const seriesData = [
  {
    title: "KAI'S LIVING ADVENTURE",
    image: "1",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI'S CLIMATE QUEST",
    image: "2",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI'S INVESTIGATION STATION",
    image: "3",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI'S BIG ADVENTURES",
    image: "4",
    count: 8,
    isFavorite: true,
  },
  {
    title: "KAI'S NEIGHBORHOOD ADVENTURES",
    image: "5",
    count: 8,
    isFavorite: true,
  },
];

const learningIcon = require("@/assets/images/parent/learning.png")
const searchIcon = require("@/assets/images/parent/icon-search.png")
const listIcon = require("@/assets/images/parent/icon-list.png")
const swapIcon = require("@/assets/images/parent/icon-swap.png")
const downIcon = require("@/assets/images/parent/down.png")

export default function SeriesLibrary() {
  const categories = categoryData;
  const storyOptions = storyOptionsData;
  const [activeItem, setActiveItem] = React.useState('Series');
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  function handleItemSelection(item: string) {
    console.log("item selected::", item)
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
    console.log("storyOption clicked::", item)
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
              source={require("@/assets/images/kid/top-back-pattern.png")}
              style={styles.topBackPattern}
              resizeMode="cover"
            />

            <Header icon={learningIcon} role="parent" title="Learning" theme="dark"></Header>
            
            {/* Header */}
            <ThemedView style={styles.topRow}>
              <TouchableOpacity style={styles.iconBtn}>
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
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleStoryItem(item)}>
                  <ThemedView style={styles.categoryPill}>
                    <ThemedText style={styles.categoryText}>{item}</ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              )}
              style={{ paddingHorizontal: 16 }}
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

            <ThemedView style={{ paddingBottom: 80 }}>
              {/* Featured Series */}
              <SectionHeader title="Featured Series" desc="Popular series loved by kids" link="continue" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardScrollContainer}
              >
                {seriesData.map((item, idx) => (
                  <SeriesCard key={idx} {...item} />
                ))}
              </ScrollView>

              {/* New Series */}
              <SectionHeader title="New Series" desc="Fresh adventures to explore" link="continue" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardScrollContainer}
              >
                {seriesData.slice(0, 3).map((item, idx) => (
                  <SeriesCard key={idx} {...item} />
                ))}
              </ScrollView>

              {/* All Series */}
              <SectionHeader title="All Series" desc="Complete collection of series" link="continue" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardScrollContainer}
              >
                {seriesData.map((item, idx) => (
                  <SeriesCard key={idx} {...item} />
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
            <BottomNavBar role="parent" active="Learning" subActive="Library"/>
          </ThemedView>
        </ThemedView>
      </SafeAreaView >
    </>
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
  }
});