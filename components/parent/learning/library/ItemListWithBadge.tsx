import { supabase } from "@/app/lib/supabase"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useStoryStore } from "@/store/storyStore"
import { Image } from "expo-image"
import React, { useEffect } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import StoryItems from "./StoryItems"

interface ItemListWithBadgeProps {
    selectedSeries: any,
    seriesCategories: any[],
    setSelectedSeries: (series: any) => void
}
const ItemListWidthBadge: React.FC<ItemListWithBadgeProps> = ({
    seriesCategories,
    selectedSeries,
    setSelectedSeries
}) => {
    const [loading, setLoading] = React.useState(false);
    const [categoriesWithStories, setCategoriesWithStories] = React.useState<any[]>([]);
    const [categories, setCategores] = React.useState<any[]>([]);
    const stories = useStoryStore(state => state.stories);
    const setStories = useStoryStore(state => state.setStories);

    useEffect(() => {
        // Function to fetch stories
        async function fetchStories() {
            setLoading(true);
            const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
            // Sanitize category for URL
            const { data, error } = await supabase.functions.invoke(`stories`, {
                method: 'GET',
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
            if (data && Array.isArray(data)) {
                setStories(data);
                // Filter seriesCategories to only those with stories
                const targets = seriesCategories.filter(category =>
                    data.some(story => {
                        return normalize(story.seriesCategory) == normalize(category.name)
                    })
                );
                setCategoriesWithStories(targets);
            }
        }

        fetchStories();
    }, [seriesCategories])

    // useEffect(() => {
    //     // If selectedSeries is provided, use it; otherwise, use categoriesWithStories
    //     console.log(selectedSeries)
    //     if (selectedSeries && selectedSeries.length > 0)
    //         setCategores(selectedSeries)
    //     else
    //         setCategores(categoriesWithStories)

    // }, [seriesCategories, selectedSeries])

    function normalize(str: string) {
        return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    }

    function handleStoryItem(item: any) {
        if (selectedSeries && selectedSeries.name == item.name)
            setSelectedSeries(null)
        else {
            setSelectedSeries(item);
        }
    }
    return (
        <ThemedView>
            {

                categoriesWithStories.map((category, index) => (
                    <ThemedView key={index}>
                        <ThemedView style={styles.headerTitleContainer}>
                            <SectionHeader title={category.name} desc={category.description} link="continue" />
                            <TouchableOpacity
                                onPress={() => handleStoryItem(category)}
                            >
                                <Image
                                    source={require("@/assets/images/kid/arrow-right.png")}
                                    style={styles.arrowIcon}
                                />
                            </TouchableOpacity>
                        </ThemedView>
                        <StoryItems key={index} seriesCategory={category.name} />
                    </ThemedView>
                ))
            }
        </ThemedView>
    )
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



export default ItemListWidthBadge;