import { supabase } from '@/app/lib/supabase';
import BottomNavBar from "@/components/BottomNavBar";
import { FocusCard } from "@/components/FocusCard";
import Header from "@/components/Header";
import { ItemSeries } from '@/components/ItemSeries';
import { CreatFocusModal } from "@/components/Modals";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useLearningCategoryStore } from '@/store/learningCategoryStore';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";

// Data arrays for each section


const learningIcon = require("@/assets/images/parent/learning.png")
const searchIcon = require("@/assets/images/parent/icon-search.png")
const listIcon = require("@/assets/images/parent/icon-list.png")
const swapIcon = require("@/assets/images/parent/icon-swap.png")
const plusIcon = require("@/assets/images/parent/icon-plus.png")

const HIGHLIGHT_INDEX = 0;
export default function Index() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [modalVisible, setModalVisible] = React.useState(params.showModal === 'true');
    // Use zustand store for categories
    const { categories, setCategories } = useLearningCategoryStore();
    const [activeItem, setActiveItem] = React.useState('Stories');
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [focusModes, setFocusModes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchFocusModes() {
            setLoading(true);
            try {
                const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
                const { data, error } = await supabase.functions.invoke('focus-modes', {
                    method: 'GET',
                    headers: {
                        Authorization: jwt ? `Bearer ${jwt}` : '',
                    },
                });
                if (error) {
                    console.error('Error fetching focus modes:', error.message);

                } else if (data && Array.isArray(data)) {
                    setFocusModes(data);
                }
            } catch (e) {
                console.error('Error fetching focus modes:', e);
            } finally {
                setLoading(false);
            }
        }
        fetchFocusModes();
    }, []);

    useEffect(() => {
        async function fetchLearningTargets() {
            setLoading(true);
            try {
                const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
                const { data, error } = await supabase.functions.invoke('learning_categories', {
                    method: 'GET',
                    headers: {
                        Authorization: jwt ? `Bearer ${jwt}` : '',
                    },
                });
                if (error) {
                    console.error('Error fetching learning categories:', error.message);
                } else if (data && Array.isArray(data.data)) {
                    setCategories(data.data);
                }
            } catch (e) {
                console.error('Error fetching learning categories:', e);
            } finally {
                setLoading(false);
            }
        }
        fetchLearningTargets();
    }, [setCategories]);

    function handleItemSelection(item: string) {
        console.log("item selected::", item)
        setActiveItem(item)
        setDropdownVisible(false)
    }

    function handleStoryItem(item: string) {
        console.log("storyOption clicked::", item)
    }

    function CreateNewFocus() {
        router.push('./new_focus')
    }

    function removeModal() {
        setModalVisible(false);
        // router.replace('parent/learning/focus')
    }
    function handleViewButton(id: string) {
        router.replace(`./view_focus?id=${id}`);
    }
    function handleEditButton(id: string) {
        router.replace(`./edit_focus?id=${id}`);
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
                                onPress={CreateNewFocus}
                            >
                                <Image source={plusIcon} tintColor={'rgba(173, 215, 218, 1)'} />
                                <ThemedText style={styles.dropdownText}> Create New Focus </ThemedText>
                            </TouchableOpacity>
                        </ThemedView>

                        {/* Category pills */}

                        <ItemSeries itemsData={categories} theme="dark"/>

                        <ThemedView style={{ marginBottom: 50 }}>
                            {loading ? (
                                <ThemedText>Loading focus modes...</ThemedText>
                            ) : focusModes?.length > 0 ? (
                                focusModes.map((focus, idx) => (
                                    <FocusCard
                                        key={focus.id || idx} focus={focus}
                                        handleEditButton={handleEditButton}
                                        handleViewButton={handleViewButton} />
                                ))
                            ) : (
                                <ThemedText style={{ color: 'white', textAlign: 'center', paddingTop: 150 }}>No focus modes found.</ThemedText>
                            )}
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
                        <BottomNavBar role="parent" active="Learning" subActive="Focus" />
                    </ThemedView>

                    <CreatFocusModal mode={params.mode} modalVisible={modalVisible} onRemove={removeModal}></CreatFocusModal>
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
        borderRadius: 100,
        padding: 3
    }
});
