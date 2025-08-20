import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";
import { CreatPathwayModal } from "@/components/Modals";
import { PathwayDetailedCard } from "@/components/PathwayCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { categoryData, storyOptionsData } from "@/data/libraryData";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";

// Data arrays for each section


const learningIcon = require("@/assets/images/parent/learning.png")
const searchIcon = require("@/assets/images/parent/icon-search.png")
const listIcon = require("@/assets/images/parent/icon-list.png")
const swapIcon = require("@/assets/images/parent/icon-swap.png")
const plusIcon = require("@/assets/images/parent/icon-plus.png")

const HIGHLIGHT_INDEX = 0;
export default function EditPathway() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [modalVisible, setModalVisible] = React.useState(params.showModal === 'true');
    const categories = categoryData;
    const storyOptions = storyOptionsData;
    const [activeItem, setActiveItem] = React.useState('Stories');
    const [dropdownVisible, setDropdownVisible] = React.useState(false);

    function handleItemSelection(item: string) {
        setActiveItem(item)
        setDropdownVisible(false)
    }

    function handleStoryItem(item: string) {
    }

    function CreateNewPathway() {
        // router.push('/parent/learning/pathway/new_pathway')
    }

    function removeModal() {
        setModalVisible(false);
        // router.replace('parent/learning/pathway')
    }
    return (
        <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView style={{ flex: 1, display: "flex", height: 500 }}>
            <ThemedView style={{ flex: 1, display: "flex", position: "relative" }}>
                <ScrollView
                    style={[styles.rootContainer]}
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
                    

                    <ThemedView style={{ paddingBottom: 80 }}>
                        <PathwayDetailedCard />
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
                    <BottomNavBar role="parent" active="Learning" subActive="Pathway" />
                </ThemedView>

                <CreatPathwayModal mode={params.mode} modalVisible={modalVisible} onRemove={removeModal}></CreatPathwayModal>
            </ThemedView >
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
                {/* <Link href={`/kid/dashboard/${link}`}>
                    <Image
                        source={require("@/assets/images/kid/arrow-right.png")}
                        style={styles.sectionArrow}
                    />
                </Link> */}
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
        padding: 8,
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
        marginTop: 100,
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
