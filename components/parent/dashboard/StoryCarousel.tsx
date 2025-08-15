import { supabase } from "@/app/lib/supabase";
import { StoryCard } from "@/components/Cards";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

export default function RecentLearning({ activeChild }: {
    activeChild: any;
}) {
    const [loading, setLoading] = React.useState(false);
    const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const [storiesData, setStoriesData] = React.useState<any[]>([]);

    useEffect(() => {
        // Function to fetch stories
        console.log("recent learning::", activeChild)
        async function fetchStories(childId: string) {
            if (!childId) return;
            setLoading(true);
            const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
            const { data, error } = await supabase.functions.invoke(`stories/children/${childId}`, {
                headers: {
                    Authorization: jwt ? `Bearer ${jwt}` : '',
                    'Content-Type': 'application/json',
                },
            });
            setLoading(false);
            if (error) {
                alert(error)
                console.error('Error fetching stories:', error.message);
                return;
            }
            if (data && Array.isArray(data.stories)) {
                console.log("stories Data::", data)
                setStoriesData(data.stories);
            }
        }

        fetchStories(activeChild?.id);
    }, [activeChild])
    return (
        <>
            {loading ? (
                <ActivityIndicator color="#ffffff" style={{
                    zIndex: 999,
                    marginBottom: 50,
                }} />
            ) :
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
                        {storiesData
                            // .filter((ele) => !ele.watched)
                            .map((item, idx) => (
                                <StoryCard key={idx} num={idx + 1} story={item} />
                            ))}
                    </ScrollView>
                    {/* Pagination Dots */}
                    <ThemedView style={styles.pagination}>
                        {storiesData.map((_, idx) => (
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
