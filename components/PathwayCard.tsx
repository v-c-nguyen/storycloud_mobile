import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const editIcon = require('@/assets/images/parent/icon-edit.png');
const detailBtn = require('@/assets/images/parent/icon-detailBtn.png');
const stepIcon = require('@/assets/images/parent/icon-step.png');
const pathwayIcon = require('@/assets/images/parent/icon-pathway.png');

const clockIcon = require('@/assets/images/parent/icon-clock.png');
const dateIcon = require('@/assets/images/parent/icon-date.png');
const happyIcon = require('@/assets/images/parent/icon-happy.png');
const docIcon = require('@/assets/images/parent/icon-doc.png');
const topButton = require('@/assets/images/parent/icon-top.png');
const miaAvatar = require('@/assets/images/parent/dashboard/Mia_60x60.png');
const jesseAvatar = require('@/assets/images/parent/dashboard/Jesse_60x60.png');


export function PathwayCard({ pathway, handleViewButton }: { pathway: any, handleViewButton: () => void }) {
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.overview}>
                <Image source={pathwayIcon} />
                <ThemedText style={styles.title}>{pathway.name}</ThemedText>
                <ThemedView style={[styles.flexRow]}>
                    <Image source={stepIcon} />
                    <ThemedText style={styles.subtitle}>3 Steps</ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.pathwayCard}>
                <ThemedView style={[styles.lengthContainer, { borderBottomWidth: 1, borderColor: 'rgba(252, 252, 252, 0.2)' }]}>
                    <ThemedView style={styles.flexRow}>
                        <ThemedView style={[styles.iconBtnCircle, { padding: 5 }]}><Image source={clockIcon} width={17} /> </ThemedView>
                        <ThemedText style={styles.lengthLabel}>Length</ThemedText>
                        <ThemedText style={styles.lengthText}>45 min</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.flexRow}>
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={handleViewButton}
                        >
                            <Image source={editIcon} tintColor={'rgba(122, 193, 198, 1)'}></Image>
                        </TouchableOpacity>
                        <ThemedText style={{ color: 'rgba(122, 193, 198, 0.5)' }}> | </ThemedText>
                        <TouchableOpacity
                            style={[styles.iconBtn, styles.iconBtnCircle]}
                            onPress={handleViewButton}
                        >
                            <Image source={detailBtn}></Image>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.cardTextContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        {/* Card 1: Social & Empathy Lessons */}
                        <ThemedView style={styles.card}>
                            <ThemedView style={styles.cardTop}>
                                <ThemedText style={styles.cardTitle}>Social & Empathy Lessons</ThemedText>
                                <ThemedText style={styles.cardSubText}>3 Series</ThemedText>
                                <ThemedText style={styles.cardSubText}>3 Stories</ThemedText>
                            </ThemedView>
                            <Image
                                source={require('@/assets/images/kid/series-back-1.png')} // Replace with your image
                                style={styles.cardImage}
                            />
                        </ThemedView>

                        {/* Connector */}
                        <ThemedView style={styles.connector}>
                            <ThemedView style={styles.circle1} />
                            <ThemedView style={styles.line} />
                            <ThemedView style={styles.circle2} />
                        </ThemedView>

                        {/* Card 2: Story */}
                        <ThemedView style={styles.card}>
                            <Image
                                source={require('@/assets/images/kid/series-back-2.png')} // Replace with your image
                                style={styles.cardImage}
                            />
                            <ThemedView style={styles.storyContent}>
                                <ThemedView style={styles.badge}>
                                    <ThemedText style={styles.badgeText}>1</ThemedText>
                                </ThemedView>
                                <ThemedText style={styles.storyIndex}>#4</ThemedText>
                                <ThemedText style={styles.storyLabel}>UNDERWATER ADVENTURES</ThemedText>
                                <ThemedText style={styles.storyTitle}>
                                    Petal Tales: The Search for Rainbow Flowers
                                </ThemedText>
                                <ThemedText style={styles.storyDuration}>12 min</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ScrollView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

export function PathwayDetailedCard() {
    const router = useRouter();

    function handleBack() {
        router.navigate("./")
    }
    return (
        <ThemedView style={[styles.container, { paddingBottom: 30 }]}>
            <ThemedView style={[styles.overview, { alignItems: 'center' }]}>
                <Image source={pathwayIcon} />
                <ThemedText style={styles.title}>Social & Empathy Lessons</ThemedText>
                <ThemedView style={[styles.flexRow]}>
                    <Image source={stepIcon} />
                    <ThemedText style={styles.subtitle}>3 Steps</ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.pathwayCard}>
                <ThemedView style={[styles.lengthContainer, { borderBottomWidth: 1, borderColor: 'rgba(252, 252, 252, 0.2)' }]}>
                    <ThemedView style={[styles.flexCol, { width: '100%' }]}>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={clockIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedText style={styles.lengthLabel}>Length</ThemedText>
                                <ThemedText style={styles.lengthText}>45 min</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.flexRow}>
                                <TouchableOpacity style={styles.iconBtn}>
                                    <Image source={editIcon} tintColor={'rgba(122, 193, 198, 1)'}></Image>
                                </TouchableOpacity>
                                <ThemedText style={{ color: 'rgba(122, 193, 198, 0.5)' }}> | </ThemedText>
                                <TouchableOpacity
                                    onPress={handleBack}
                                    style={[styles.iconBtn, styles.iconBtnCircle, styles.backOrange]}>
                                    <Image source={topButton}></Image>
                                </TouchableOpacity>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={dateIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedText style={styles.lengthLabel}>Date Created</ThemedText>
                                <ThemedText style={styles.lengthText}>24:12:24</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={pathwayIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedText style={styles.lengthLabel}>Social & Empathy Lessons</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={[styles.flexRow, { alignItems: 'flex-start' }]}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8, marginTop: 8 }]}><Image source={docIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedView style={{ width: '90%' }}>
                                    <ThemedText style={styles.lengthLabel}>Description</ThemedText>
                                    <ThemedText style={[styles.lengthText, { paddingRight: 20 }]}>
                                        The learning product region is perhaps the most important region of the parent mode," where immersive educational content is organized into interactive Pathways. The learning product region is perhaps the most important region of the parent mode.
                                    </ThemedText>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexCol, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={happyIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedText style={styles.lengthLabel}>Children</ThemedText>
                            </ThemedView>

                            <ThemedView style={[styles.flexRow, styles.progressBar]}>
                                <Image source={miaAvatar} style={styles.avatar}></Image>
                                <ThemedText style={styles.name}>
                                    Mia
                                </ThemedText>
                                <ThemedView style={styles.bar}></ThemedView>
                                <ThemedText style={styles.value}>0%</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.cardTextContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        {/* Card 1: Social & Empathy Lessons */}
                        <ThemedView style={styles.card}>
                            <ThemedView style={styles.cardTop}>
                                <ThemedText style={styles.cardTitle}>Social & Empathy Lessons</ThemedText>
                                <ThemedText style={styles.cardSubText}>3 Series</ThemedText>
                                <ThemedText style={styles.cardSubText}>3 Stories</ThemedText>
                            </ThemedView>
                            <Image
                                source={require('@/assets/images/kid/series-back-1.png')} // Replace with your image
                                style={styles.cardImage}
                            />
                        </ThemedView>

                        {/* Connector */}
                        <ThemedView style={styles.connector}>
                            <ThemedView style={styles.circle1} />
                            <ThemedView style={styles.line} />
                            <ThemedView style={styles.circle2} />
                        </ThemedView>

                        {/* Card 2: Story */}
                        <ThemedView style={styles.card2}>
                            <Image
                                source={require('@/assets/images/kid/series-back-2.png')} // Replace with your image
                                style={styles.cardImage2}
                            />
                            <ThemedView style={styles.storyContent}>
                                <ThemedView style={styles.badge}>
                                    <ThemedText style={styles.badgeText}>1</ThemedText>
                                </ThemedView>
                                <ThemedText style={styles.storyIndex}>#4</ThemedText>
                                <ThemedText style={styles.storyLabel}>UNDERWATER ADVENTURES</ThemedText>
                                <ThemedText style={styles.storyTitle}>
                                    Petal Tales: The Search for Rainbow Flowers
                                </ThemedText>
                                <ThemedText style={styles.storyDuration}>12 min</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ScrollView>
                </ThemedView>

                <ThemedView style={styles.lengthContainer}>
                    <ThemedView style={[styles.flexCol, { width: '100%' }]}>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView>
                                    <ThemedText style={styles.lengthLabel}>Learning Categories</ThemedText>
                                    <ThemedText style={styles.categoryText}>
                                        Numeracy & Problem Solving
                                    </ThemedText>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView >
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
    },
    overview: {
        paddingHorizontal: 20,
        marginBottom: 16,
        flexDirection: 'column',
        gap: 5
    },
    pathwayCard: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        borderRadius: 20,
        marginBottom: 20
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    subtitle: {
        color: '#9fd3c7',
        fontWeight: 700,
        fontSize: 20,
    },
    lengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 16,

    },
    lengthLabel: {
        color: '#9fd3c7',
        fontSize: 16,
        fontWeight: 600,
        marginRight: 8,
    },
    lengthText: {
        color: 'rgba(122, 193, 198, 0.7)',
        fontSize: 16,
        fontWeight: '400',
    },
    categoryText: {
        color: 'white',
        borderColor: 'rgba(226, 158, 110, 1)',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        padding: 10
    },
    cardTextContainer: {
        padding: 5,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderColor: 'rgba(252, 252, 252, 0.2)',
    },
    cardSubtitle: {
        color: '#9fd3c7',
        fontSize: 14,
    },
    flexRow: {

        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    flexCol: {
        flexDirection: 'column',
        gap: 10
    },
    iconBtn: {
        padding: 3
    },
    iconBtnCircle: {
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        padding: 3,
        borderRadius: '50%'
    },
    backOrange: {
        backgroundColor: 'rgba(244, 166, 114, 1)'
    },
    scrollContainer: {
        padding: 16,
        alignItems: 'center',
    },
    card: {
        width: 240,
        height: 238,
        backgroundColor: '#003b4f',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        overflow: 'hidden',
        zIndex: -1
    },
    card2: {
        width: 240,
        height: 238,
        backgroundColor: '#003b4f',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        overflow: 'hidden',
        flexDirection: 'row',
        zIndex: -1
    },
    cardTop: {
        padding: 12,
    },
    cardTitle: {
        color: 'rgba(248, 236, 174, 1)',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12
    },
    cardSubText: {
        color: '#9ec7d3',
        fontSize: 20,
        marginTop: 5,
    },
    cardImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    cardImage2: {
        width: '30%',
        height: '100%',
        resizeMode: 'cover',
    },
    connector: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    circle1: {
        width: 10,
        height: 10,
        left: 0,
        transform: 'translate(-50%, 0)',
        position: 'absolute',
        borderRadius: 5,
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        zIndex: 2,
    },
    circle2: {
        width: 10,
        height: 10,
        right: 0,
        transform: 'translate(50%, 0)',
        position: 'absolute',
        borderRadius: 5,
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        zIndex: 2,
    },
    line: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(248, 236, 174, 1)',
        zIndex: 1,
    },
    storyContent: {
        padding: 12,
        width: '70%'
    },
    badge: {
        backgroundColor: '#003b4f',
        borderColor: '#69e2ec',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    badgeText: {
        color: '#69e2ec',
        fontWeight: 'bold',
    },
    storyIndex: {
        color: '#ccc',
        fontSize: 12,
        marginBottom: 2,
    },
    storyLabel: {
        color: '#66e0d5',
        fontWeight: 'bold',
        fontSize: 13,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    storyTitle: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 4,
    },
    storyDuration: {
        color: '#ccc',
        fontSize: 12,
    },
    ButtonIcon: {
        width: 17,
        height: 17,

    },

    progressBar: {
        padding: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(226, 158, 110, 1)',
        gap: 15,
        width: 255
    },
    avatar: {
        width: 35,
        height: 35
    },
    name: {
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 18,
        color: 'rgba(248, 236, 174, 1)',
    },
    bar: {
        width: 115,
        height: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(248, 236, 174, 0.3)'
    },
    value: {
        fontSize: 14,
        fontWeight: 700,
        color: 'white'
    }
});