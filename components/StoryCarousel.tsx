import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StoryCard } from "./Cards";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const { width } = Dimensions.get("window");

// Example data
const stories = [
    {
        number: "1",
        bgColor: "#F4A672",
        textColor: "#053B4A",
        subTextColor: "#F8ECAE",
        progressColor: "#ADD7DA",
        isBallonYellow: true,
        storyTitle: "Petal Tales: The Search for Rainbow Flowers",
        seriesTitle: "KAI’S LIVING ADVENTURE",
        duration: 32,
        progress: 20,
        image: "1",
        featured: false,
        isFavorite: true,
        watched: true,
    },
    {
        number: "2",
        bgColor: "#053B4A",
        textColor: "#FCFCFC",
        subTextColor: "#F8ECAE",
        progressColor: "#F8ECAE",
        isBallonYellow: false,
        storyTitle: "Petal Tales: The Search for Rainbow Flowers",
        seriesTitle: "Underwater Adventures",
        duration: 32,
        progress: 12,
        image: "2",
        featured: false,
        isFavorite: true,
        watched: false,
    },
    {
        number: "3",
        bgColor: "#F8ECAE",
        textColor: "#053B4A",
        subTextColor: "#048F99",
        progressColor: "#ADD7DA",
        isBallonYellow: false,
        storyTitle: "Muddy Mystery at the Pond",
        seriesTitle: "KAI’S LIVING ADVENTURE",
        duration: 32,
        progress: 20,
        image: "3",
        featured: true,
        isFavorite: true,
        watched: false,
    },
    {
        number: "4",
        bgColor: "#053B4A",
        textColor: "#FCFCFC",
        subTextColor: "#F8ECAE",
        progressColor: "#F8ECAE",
        isBallonYellow: true,
        storyTitle: "Seeds of Surprise",
        seriesTitle: "KAI’S LIVING ADVENTURE",
        duration: 32,
        progress: 12,
        image: "2",
        featured: true,
        isFavorite: true,
        watched: false,
    },
    {
        number: "5",
        bgColor: "#F8ECAE",
        textColor: "#053B4A",
        subTextColor: "#F8ECAE",
        progressColor: "#F4A672",
        isBallonYellow: true,
        storyTitle: "The Great Garden Clean-Up",
        seriesTitle: "KAI’S LIVING ADVENTURE",
        duration: 32,
        progress: 20,
        image: "1",
        featured: false,
        isFavorite: true,
        watched: false,
    },
    {
        number: "6",
        bgColor: "#053B4A",
        textColor: "#FCFCFC",
        subTextColor: "#F8ECAE",
        progressColor: "#ADD7DA",
        isBallonYellow: false,
        storyTitle: "A Night with Nocturnal Neighbours",
        seriesTitle: "KAI’S LIVING ADVENTURE",
        duration: 32,
        progress: 20,
        image: "3",
        featured: false,
        isFavorite: false,
        watched: false,
    },
];
export default function AdventureStoryCarousel() {
    const totalSteps = stories.length;
    const [activeIndex, setActiveIndex] = useState(1);
    const [selectedMin, setSelectedMin] = useState(8);

    const flatListRef = useRef<FlatList>(null);

    // Scroll to card by step
    const scrollToStep = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setActiveIndex(index);
    };

    // Handle drag/swipe
    const onScroll = (event: any) => {
        // const idx = Math.round(event.nativeEvent.contentOffset.x / 310);
        // if (idx !== activeIndex) setActiveIndex(idx);
    };

    return (
        <ThemedView style={styles.container}>
            {/* Progress bar */}
            <ThemedView style={styles.progressBar}>
                <ThemedText style={styles.adventureHeader}>KAI’S LIVING ADVENTURE</ThemedText>
                <ThemedView style={styles.stepsRow}>
                    {stories.map((story, idx) => {
                        const isCompleted = story.watched;
                        const isActive = idx === activeIndex;
                        return (
                            <TouchableOpacity key={idx} style={styles.stepWrap} onPress={() => scrollToStep(idx)}>
                                <ThemedView style={[(isCompleted || isActive) && styles.highlightedBorder]}>
                                    <ThemedView style={[
                                        isCompleted
                                            ? styles.stepCircleCompleted
                                            : isActive
                                                ? styles.stepCircleActive
                                                : styles.stepCircle
                                    ]}>
                                        {isCompleted ? (
                                            <Image source={require("@/assets/images/icons/check.png")} style={styles.checkIcon} />
                                        ) : (
                                            <ThemedText style={isActive ? styles.stepNumberActive : styles.stepNumber}>{idx + 1}</ThemedText>
                                        )}
                                    </ThemedView>
                                </ThemedView>
                                <ThemedText style={styles.stepLabel}>{idx + 1}</ThemedText>
                            </TouchableOpacity>
                        );
                    })}
                </ThemedView>
            </ThemedView>

            {/* Story Carousel */}
            <FlatList
                ref={flatListRef}
                data={stories}
                keyExtractor={(_, idx) => idx.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => (
                    <StoryCard key={index} {...item} />
                )}
            />
        </ThemedView>
    );
}

const CARD_WIDTH = width * 0.85;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "transparent",
        flex: 1,
    },
    progressBar: {
        paddingBottom: 5,
        paddingTop: 8,
        width: '100%',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        alignSelf: "center",
    },
    adventureHeader: {
        color: "#FFE7A0",
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: 0.5,
        marginBottom: 10,
        textAlign: "center",
    },
    stepsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        marginBottom: 6,
    },
    stepWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    highlightedBorder: {
        borderWidth: 7,
        borderColor: 'rgba(252, 252, 252, 0.2)',
        borderRadius: 50
    },
    stepCircleCompleted: {
        backgroundColor: "#F4A672",
        borderRadius: 14,
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    checkIcon: {
        width: 24,
        height: 24,
    },
    stepCircleActive: {
        borderWidth: 2,
        borderColor: "#F4A672",
        borderRadius: 14,
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    stepCircle: {
        backgroundColor: "rgba(173, 215, 218, 1)",
        borderRadius: 14,
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    stepNumber: {
        color: "rgba(5, 59, 74, 1)",
        fontWeight: 700,
        fontSize: 18,
    },
    stepNumberActive: {
    },
    stepLabel: {
        fontSize: 14,
        color: "#AD D7DA",
        marginTop: 2,
        textAlign: "center",
    },

    cardContainer: {
        width: CARD_WIDTH,
        backgroundColor: "#05415F",
        borderRadius: 18,
        paddingTop: 12,
        paddingHorizontal: 0,
        marginHorizontal: width * 0.075,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardContent: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    headerNumber: {
        color: "#FFE7A0",
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 2,
    },
    headerStoryType: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 2,
        marginRight: "auto",
    },
    heartIcon: {
        width: 24,
        height: 24,
        tintColor: "#FFE7A0",
    },
    subtitle: {
        color: "#FFE7A0",
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "left",
        marginBottom: 3,
        letterSpacing: 0.3,
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "left",
        marginBottom: 7,
        fontStyle: "italic",
    },
    imageWrap: {
        width: "100%",
        height: 140,
        marginBottom: 16,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    cardImage: {
        width: "100%",
        height: "100%",
        borderRadius: 14,
    },
    balloonWrap: {
        position: "absolute",
        top: -28,
        left: "50%",
        transform: [{ translateX: -18 }],
        zIndex: 2,
    },
    balloonIcon: {
        width: 36,
        height: 36,
    },
    playButton: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -28 }, { translateY: -28 }],
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#FFE7A0",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 3,
    },
    playIcon: {
        width: 36,
        height: 36,
        tintColor: "#05415F",
    },
    timeSelectorBar: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 5,
        width: "90%",
        justifyContent: "space-between",
        alignSelf: "center",
    },
    timeButton: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "transparent",
    },
    timeButtonActive: {
        backgroundColor: "#AD D7DA",
    },
    timeButtonText: {
        color: "#AD D7DA",
        fontWeight: "600",
        fontSize: 16,
    },
    timeButtonTextActive: {
        color: "#05415F",
    },
    timeBarTrack: {
        flex: 1,
        height: 12,
        backgroundColor: "#07324A",
        borderRadius: 6,
        marginHorizontal: 8,
        position: "relative",
        overflow: "hidden",
    },
    timeBarIndicator: {
        position: "absolute",
        top: 0,
        width: "50%",
        height: "100%",
        backgroundColor: "#AD D7DA",
        borderRadius: 6,
    },
});