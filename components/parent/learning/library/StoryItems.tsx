import { SeriesCard2 } from "@/components/Cards";
import { ThemedView } from "@/components/ThemedView";
import { useSeriesStore } from "@/store/seriesStore";
import { useStoryStore } from "@/store/storyStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

interface StoryItemsProps {
    seriesCategory: string;
}
const StoryItems: React.FC<StoryItemsProps> = ({
    seriesCategory
}) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const stories = useStoryStore(state => state.stories);
    const series = useSeriesStore(state => state.series);

    function normalize(str: string) {
        return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    }


    return (
        <ThemedView>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
            >
                {series
                    .filter(story => normalize(story.series_category) === normalize(seriesCategory))
                    .map((item, idx) => (
                        <SeriesCard2 
                            key={idx}
                            name={item.name}
                            episode_count={item.episode_count ?? 0}
                            image={item.image ?? ""}
                            isFavorite={item.isFavorite ?? false}
                        />
                    ))}
            </ScrollView>
        </ThemedView>
    )
}



const styles = StyleSheet.create({
    headerTitleContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },

    horizontalScrollContent: {
        gap: 20,
        paddingHorizontal: 16
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
    arrowIcon: {
        tintColor: "#F4A672",
        marginRight: 16,
        marginBottom: 10
    },
})



export default StoryItems;