import { getAllTracksByChildId } from "@/api/track";
import { StoryCard } from "@/components/Cards";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

export default function RecentLearning({ activeChild }: {
    activeChild: any;
}) {
    const [loading, setLoading] = React.useState(false);
    const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const [recents, setRecents] = React.useState<any[]>([]);

    useEffect(() => {
        // Function to fetch tracks for activeChild
        const fetchRecents = async () => {
            setLoading(true);
            try {
                const recentsData = await getAllTracksByChildId(activeChild?.id);
                setRecents(recentsData.slice(0,3));
            } finally {
                setLoading(false);
            }
        };
        if (activeChild?.id) {
            fetchRecents();
        } else {
            setRecents([]);
        }
    }, [activeChild]);
    return (
        <>
            {loading ? (
                <ActivityIndicator color="#ffffff" style={{
                    zIndex: 999,
                    marginBottom: 50,
                }} />
            ) :
                recents.length > 0 ?
                <ThemedView>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={event => {
                            const x = event.nativeEvent.contentOffset.x;
                            const cardWidth = 290 + 25; // card width + gap (adjust if needed)
                            const index = Math.round(x / cardWidth);
                            setCurrentCardIndex(index);
                        }}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.cardScrollContainer}
                    >
                        {recents
                            // .filter((ele) => !ele.watched)
                            .map((item, idx) => (
                                <StoryCard key={idx} num={idx + 1} recent={item} />
                            ))}
                    </ScrollView>
                    {/* Pagination Dots */}
                    <ThemedView style={styles.pagination}>
                        {recents.map((_, idx) => (
                            <ThemedView
                                key={idx}
                                style={[
                                    styles.dot,
                                    idx === currentCardIndex && styles.activeDot,
                                ]}
                            />
                        ))}
                    </ThemedView>
                </ThemedView>
                :
                <ThemedView style={{flexDirection: 'row', width: '100%', marginVertical: 20, justifyContent: 'center'}}>
                    <ThemedText style={{color: '#ffffff7a'}}> no recent data </ThemedText>
                </ThemedView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    cardScrollContainer: {
        gap: 20,
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'rgba(122, 193, 198, 1)',
        margin: 4,
    },
    activeDot: {
        backgroundColor: 'rgba(122, 193, 198, 1)',
    },
});
