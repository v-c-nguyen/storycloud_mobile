import { supabase } from "@/app/lib/supabase";
import { StoryCard1 } from "@/components/Cards";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

export default function Recommend({ activeChild }: { activeChild: any }) {
    const router = useRouter();
    const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const [storiesData, setStoriesData] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        // Function to fetch stories
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
                setStoriesData(data.stories.slice(0, 3));
            }
        }

        fetchStories(activeChild?.id);
    }, [activeChild])

    return (
        <ThemedView>
            {
                loading ? (
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
                            const cardWidth = 290 + 10; // card width + gap (adjust if needed)
                            const index = Math.round(x / cardWidth);
                            setCurrentCardIndex(index);
                        }}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.cardScrollContainer}
                    >
                        {storiesData
                            // .filter((ele) => !ele.watched)
                            .map((item, idx) => (
                                <StoryCard1
                                    key={idx}
                                    num={idx + 1}
                                    story={item}
                                    onPlay={(storyId: string) => router.push({ pathname: '/(parent)/(listen)/listenStory', params: { storyId } })}
                                />
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
        </ThemedView>
    )
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
