import { supabase } from "@/app/lib/supabase";
import { StoryCard1 } from "@/components/Cards";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function WatchNext({ activeChild }: { activeChild: any }) {

    const router = useRouter();
    const [storiesData, setStoriesData] = React.useState<any[]>([]);
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
                setStoriesData(data.stories);
            }
        }

        fetchStories(activeChild?.id);
    }, [activeChild])

    function onPlay(id: string) {

    }

    return (
        <>
            {
                storiesData.length > 0 ?
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
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
                    :
                    <ThemedView style={{ flexDirection: 'row', width: '100%', marginVertical: 20, justifyContent: 'center' }}>
                        <ThemedText style={{ color: '#ffffff7a' }}> no story data </ThemedText>
                    </ThemedView>
            }

        </>
    );
}

const styles = StyleSheet.create({
    cardScrollContainer: {
        gap: 10,
        marginBottom: 100
    },
});
