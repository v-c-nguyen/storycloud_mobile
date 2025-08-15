import { Child } from '@/app/lib/UserContext';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const { width } = Dimensions.get('window');

const CARDS = [
    {
        number: 1,
        title: "Petal Tales: The Search for Rainbow Flowers",
        subtitle: "Petal Tales: The Search for Rainbow Flowers Petal Tales: The Search for Rainbow Flowers Petal Tales: The Search for Rainbow Flowers",
        image: require('@/assets/images/parent/sample-card-image.png'), // Replace with your actual image
    },
    // Repeat for 5 cards
    {
        number: 2,
        title: "Petal Tales: The Adventure Continues",
        subtitle: "Another tale of Rainbow Flowers and adventure.",
        image: require('@/assets/images/parent/sample-card-image.png'),
    },
    {
        number: 3,
        title: "Petal Tales: Forest Mysteries",
        subtitle: "Uncover the secrets of the forest.",
        image: require('@/assets/images/parent/sample-card-image.png'),
    },
    {
        number: 4,
        title: "Petal Tales: Night Journey",
        subtitle: "An adventure under the stars.",
        image: require('@/assets/images/parent/sample-card-image.png'),
    },
    {
        number: 5,
        title: "Petal Tales: The Last Petal",
        subtitle: "The final chapter in the Rainbow Flowers saga.",
        image: require('@/assets/images/parent/sample-card-image.png'),
    },
];


const cardStyles = [
{
  bgColor: "#053B4A",
  textColor: "#FCFCFC",
  subTextColor: "#F8ECAE",
  progressColor: "#F8ECAE",
  isBallonYellow: false,
},
{
  bgColor: "#F4A672",
  textColor: "#053B4A",
  subTextColor: "#F8ECAE",
  progressColor: "#ADD7DA",
  isBallonYellow: true,
},
{
  bgColor: "#F8ECAE",
  textColor: "#053B4A",
  subTextColor: "#048F99",
  progressColor: "#ADD7DA",
  isBallonYellow: false,
}]



export default function SeriesCarousel({ mode, activeChild }: { mode: string, activeChild: Child }) {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState(2);
    const [loading, setLoading] = React.useState(false);
    const [storiesData, setStoriesData] = React.useState<any[]>([]);
    const flatListRef = useRef<FlatList>(null);


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
                console.log("stories Data::", data)
                setStoriesData(data.stories.slice(0, 3));
            }
        }

        fetchStories(activeChild?.id);
    }, [activeChild])

    const handleScroll = (event: any) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(newIndex);
    };

    const handleDotPress = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setActiveIndex(index);
    };

    const handleLeftArrow = () => {
        if (activeIndex > 0) {
            const newIndex = activeIndex - 1;
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
            setActiveIndex(newIndex);
        }
    };

    const handleRightArrow = () => {
        if (activeIndex < storiesData.length - 1) {
            const newIndex = activeIndex + 1;
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
            setActiveIndex(newIndex);
        }
    };

    const handlePlayButton = (storyId: string) => {
        if (mode == "parent")
            router.push(`/(parent)/(listen)/listenStory?storyId=${storyId}`);
        else router.push(`/(kid)/(listen)/listenStory?storyId=${storyId}`)
    }

    return (
        <ThemedView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={storiesData}
                keyExtractor={(_, idx) => idx.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => (
                    <ThemedView style={styles.card}>
                        {/* Top number circle */}
                        <ThemedView style={{ paddingHorizontal: 16 }}>
                            <ThemedView style={styles.topCircle}>
                                <ThemedText style={styles.topCircleText}>{index + 1}</ThemedText>
                            </ThemedView>
                            {/* Adventure Title */}

                            <ThemedText style={styles.adventureHeader}>{item?.seriesCategory}</ThemedText>
                            {/* Main Title */}
                            <ThemedText style={styles.mainTitle}>{item.storyTitle}</ThemedText>
                            {/* Subtitle */}
                            <ThemedText style={styles.subtitle}>{item.descriptionParent}</ThemedText>
                        </ThemedView>
                        {/* Image with play button and balloon */}
                        <ThemedView style={{ width: '100%', height: 250 }}>
                            <ThemedView style={styles.imageWrap}>
                                <Image source={item.image ?? require('@/assets/images/parent/sample-card-image.png')} style={styles.cardImage} resizeMode="cover" />
                                <ThemedView style={styles.overlayBalloon}>
                                    <Image source={require('@/assets/images/parent/balloon.png')} style={styles.balloonIcon} />
                                </ThemedView>
                                <TouchableOpacity style={styles.playButton} onPress={() => handlePlayButton(item.storyId)}>
                                    <Image source={require('@/assets/images/parent/play.png')} style={styles.playIcon} />
                                </TouchableOpacity>
                            </ThemedView>
                            {/* Time Selection */}
                            <ThemedView style={styles.timeBar}>
                                {
                                    item?.track && <ThemedView>
                                        {item.track.watched ? (
                                            <ThemedView style={styles.progressRow}>
                                                <Image
                                                    source={require('@/assets/images/kid/icon-check.png')}
                                                    resizeMode="cover"
                                                    style={[styles.checkIcon, { tintColor: `${cardStyles[1].textColor}` }]}
                                                />
                                                <ThemedText style={[styles.storyTime, { color: cardStyles[1].textColor }]}>Watched</ThemedText>

                                                <ThemedView style={[
                                                    styles.progressBarFilled,
                                                    { borderColor: cardStyles[1].textColor, backgroundColor: cardStyles[1].progressColor, flex: 1 }
                                                ]} />
                                            </ThemedView>
                                        ) : (
                                            <ThemedView style={styles.progressRow}>
                                                <ThemedText style={[styles.storyTime, { color: cardStyles[1].textColor }]}>{item.track?.progress} min</ThemedText>
                                                <ThemedView style={styles.progressBarWrap}>
                                                    <ThemedView style={[
                                                        styles.progressBarFilled,
                                                        { borderColor: cardStyles[1].textColor, backgroundColor: cardStyles[1].progressColor, width: `${(item.track.progress ?? 0) * 100 / (item.track.duration ?? 1)}%` }
                                                    ]} />
                                                    <ThemedView style={[
                                                        styles.progressBarOutline,
                                                        { borderColor: cardStyles[1].textColor, backgroundColor: cardStyles[1].bgColor, width: `${100 - (item.track.progress ?? 0) * 100 / (item.track.duration ?? 1)}%` }
                                                    ]} />
                                                </ThemedView>
                                                <ThemedText style={[styles.storyTime, { color: cardStyles[1].textColor }]}>{(item.track.duration ?? 0) - (item.track.progress ?? 0)} min</ThemedText>
                                            </ThemedView>
                                        )}
                                    </ThemedView>
                                }
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                )}
            />

            {/* Dots */}
            <ThemedView style={styles.cardFooter}>
                <TouchableOpacity onPress={handleLeftArrow}>
                    <Image source={require('@/assets/images/icons/arrow-left.png')} style={styles.leftBtn} />
                </TouchableOpacity>
                <ThemedView style={styles.dotsWrap}>
                    {storiesData.map((_, idx) => (
                        <TouchableOpacity key={idx} onPress={() => handleDotPress(idx)}>
                            <ThemedView
                                style={[
                                    styles.dot,
                                    activeIndex === idx && styles.dotActive,
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </ThemedView>
                <TouchableOpacity onPress={handleRightArrow}>
                    <Image source={require('@/assets/images/icons/arrow-right.png')} style={styles.rightBtn} />
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 340,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: 20
    },
    card: {
        width: width * 0.9,
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: 'rgba(252, 252, 252, 0.2)',
        paddingVertical: 24,
        alignItems: 'center',
        marginRight: 10
    },
    topCircle: {
        borderWidth: 1,
        borderColor: 'rgba(173,215,218,0.5)',
        width: 57,
        height: 57,
        borderRadius: 50,
        marginHorizontal: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    topCircleText: {
        color: 'rgba(248, 236, 174, 1)',
        fontWeight: '700',
        lineHeight: 28.8,
        textAlign: 'center',
        fontSize: 24,
    },
    adventureHeader: {
        marginHorizontal: 18,
        color: '#FFE7A0',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
        letterSpacing: 0.5,
    },
    mainTitle: {
        color: '#fff',
        fontWeight: 700,
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 33.6,
        fontStyle: 'italic'
    },
    subtitle: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 400,
        lineHeight: 21.6,
        marginBottom: 50,
        height: 300
    },
    imageWrap: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    overlayBalloon: {
        position: 'absolute',
        top: -32,
        left: '50%',
        transform: [{ translateX: '-50%' }],
        zIndex: 2,
    },
    balloonIcon: {
        width: 60,
        height: 60,
    },
    playButton: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: -28 }],
        width: 90,
        height: 90,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    playIcon: {
        width: 90,
        height: 90,
        opacity: 0.85
    },
    timeBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 15,
    },
    timeButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    timeButtonActive: {
        backgroundColor: '#AD D7DA',
    },
    timeButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    timeBarWatched: {
        flex: 1,
        height: 12,
        backgroundColor: 'rgba(248, 236, 174, 1)',
        borderRadius: 6,
        marginHorizontal: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    timeBarRemain: {
        flex: 1,
        height: 12,
        backgroundColor: 'white',
        borderRadius: 6,
        marginHorizontal: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    dotsWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
        marginHorizontal: 5,
    },
    dotActive: {
        backgroundColor: 'white',
    },
    cardFooter: {
        width: '80%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftBtn: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    rightBtn: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    storyTitle: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontStyle: 'italic',
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 24,
        flexGrow: 1
    },
    progressRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 16,
        padding: 10,
        gap: 12
    },
    checkIcon: {
        width: 20,
        height: 20,
    },
    storyTime: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20
    },
    progressBarWrap: {
        width: 150,
        flexDirection: 'row',
        height: 15,
        alignItems: 'center',
        gap: 2,
    },
    progressBarFilled: {
        height: 15,
        borderRadius: 12,
        borderWidth: 2,
        backgroundColor: "#ADD7DA",
        borderColor: "#053B4A",
    },
    progressBarOutline: {
        height: 15,
        borderRadius: 12,
        borderWidth: 2,
        backgroundColor: "transparent",
        borderColor: "#053B4A",
    },
});