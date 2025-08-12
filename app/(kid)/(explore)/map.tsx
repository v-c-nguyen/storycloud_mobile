import BottomNavBar from "@/components/BottomNavBar";
import CardSeries from "@/components/CardSeries";
import MapWrapper from "@/components/MapWrapper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


const cardsData = [
  { color: '#FFFFFF', icon: require('@/assets/images/parent/series.png'), text: 'Series' },
  { color: '#F8ECAE', icon: require('@/assets/images/parent/collections.png'), text: 'Collections' },
  { color: '#ADD7DA', icon: require('@/assets/images/parent/map.png'), text: 'Map' },
  { color: '#7AC1C6', icon: require('@/assets/images/parent/themes.png'), text: 'Themes' },
  { color: '#053B4A', icon: require('@/assets/images/parent/characters.png'), text: 'Characters' },
];

export default function Map() {
  const [activeTab, setActiveTab] = useState('Characters');

  return (
    <>
      <Stack.Screen options={{
        headerShown: false
      }} />
      <GestureHandlerRootView style={{ flex: 1 }}>
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
          
          {/* Characters and Landmarks buttons */}
          

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
          {/* Story List */}
         
            <ThemedView style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'Characters' && styles.activeTabButton
              ]}
              onPress={() => setActiveTab('Characters')}
            >
              <ThemedText 
                style={[
                  styles.tabText, 
                  activeTab === 'Characters' && styles.activeTabText
                ]}
              >
                Characters
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'Landmarks' && styles.activeTabButton
              ]}
              onPress={() => setActiveTab('Landmarks')}
            >
              <ThemedText 
                style={[
                  styles.tabText, 
                  activeTab === 'Landmarks' && styles.activeTabText
                ]}
              >
                Landmarks
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
            <ThemedView style={{ height:900, width: "100%",  marginBottom: 80 }}>

            <MapWrapper/>
              
          </ThemedView>
          <ThemedView>
          
          </ThemedView>
            
          <ThemedView style={{ paddingHorizontal: 16, paddingTop: 20, backgroundColor: '#F8ECAE' }}>
            
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Image source={require('@/assets/images/avatars/mia_120.png')} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
              <ThemedView>
                <ThemedText style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Kai the Australian Shepherd</ThemedText>
                <ThemedText style={{ color: '#fff', fontSize: 16 }}>An enthusiastic pup ready to explore sky, sea, and everything in between</ThemedText>
              </ThemedView>
            </ThemedView>
            <CardSeries data={cardsData} active=''/>
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
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F8ECAE",
    position: "relative",
  },
    cloudImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
  // New styles for the Characters/Landmarks tab
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    bottom: -250,
    marginBottom: 20,
    borderRadius: 999, // Makes it a full pill shape
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    padding: 2,
    zIndex: 900
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 999,
  },
  activeTabButton: {
    backgroundColor: '#F4A672', // White background for the active button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabText: {
    fontSize: 14,
    color: '#fff', // White text for inactive
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#053B4A', // Dark text for active
  },
});


