
import { supabase } from '@/app/lib/supabase';
import { LearningTargetCard } from '@/components/LearningTargetCard';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import StepIndicator_Focus from "./StepIndecator";

const targetIcon = require('@/assets/images/parent/icon-target.png')
const clockIcon = require('@/assets/images/parent/icon-clock.png')
const checkIcon = require('@/assets/images/parent/dashboard/selected.png')
const rightButton = require('@/assets/images/parent/icon-right.png')
const informationIcon = require('@/assets/images/parent/information_circle.png')

export default function AddFocus_Second({ currentStep, onPress }: { currentStep: number, onPress: (targets: {id: string, name: string}[]) => void }) {
    const [learningTargets, setLearningTargets] = React.useState<{id: string, name: string}[]>([]);
    const [selectedTargets, setSelectedTargets] = React.useState<{id: string, name: string}[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
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
                    setLearningTargets(data.data);
                }
            } catch (e) {
                console.error('Error fetching learning categories:', e);
            } finally {
                setLoading(false);
            }
        }
        fetchLearningTargets();
    }, []);

    function handleTargetSelected(target: {id: string, name: string}) {
        setSelectedTargets(prev => {
            const exists = prev.some(t => t.id === target.id);
            if (exists) {
                return prev.filter(t => t.id !== target.id);
            } else {
                return [...prev, target];
            }
        });
    }
    return (
        <ThemedView style={styles.container}>
            {/* Step Indicators */}
            <StepIndicator_Focus currentStep={currentStep} />

            {/* Custom Pathway Card */}
            <ThemedView style={styles.card}>

                {/* Learning Target Header */}
                <ThemedView style={styles.section}>
                    <ThemedView style={styles.labelContainer}>
                        <ThemedView style={styles.iconContainer}>
                            <Image source={targetIcon} style={{width: 20, height: 20, tintColor: '#5CE1E6'}}></Image>
                        </ThemedView>
                        <ThemedText style={styles.learningHeader}>Learning Target</ThemedText>
                    </ThemedView>
                </ThemedView>
                {loading ? (
                    <ThemedText>Loading learning categories...</ThemedText>
                ) : (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollConainer}
                        onScroll={event => {
                            const x = event.nativeEvent.contentOffset.x;
                            const cardWidth = 225 + 15; // card width + gap (adjust if needed)
                            const index = Math.round(x / cardWidth);
                            setCurrentCardIndex(index);
                        }}
                        scrollEventThrottle={16}
                    >
                        {/* Learning Target Card */}
                                                {learningTargets.length > 0 && learningTargets.map((target, index) => {
                                                    const isSelected = selectedTargets.some(t => t.id === target.id);
                                                    return (
                                                        <LearningTargetCard
                                                            key={target.id}
                                                            target={target}
                                                            isSelected={isSelected}
                                                            onPress={() => handleTargetSelected(target)}
                                                            checkIcon={checkIcon}
                                                            informationIcon={informationIcon}
                                                        />
                                                    );
                                                })}
                    </ScrollView>
                )}

                {/* Pagination Dots */}
                <ThemedView style={styles.pagination}>
                    {learningTargets.map((_, idx) => (
                        <ThemedView
                            key={idx}
                            style={[
                                styles.dot,
                                idx === currentCardIndex && styles.activeDot,
                            ]}
                        />
                    ))}
                </ThemedView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPress(selectedTargets)}
                >
                    <ThemedText style={styles.buttonText}>Next</ThemedText>
                    <Image source={rightButton}></Image>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    indicatorsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0C3C4C',
        marginBottom: 20
    },
    container: {
        paddingHorizontal: 5,
        paddingVertical: 20,
    },
    card: {
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(173, 215, 218, 0.2)',
        padding: 16,
        justifyContent: 'space-between',
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 30
    },
    button: {
        backgroundColor: '#fba864',
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 12,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 'auto',
        gap: 10
    },
    buttonText: {
        color: '#003b4f',
        fontWeight: '400',
        fontSize: 16,
    },
    arrow: {
        color: '#003b4f',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        width: '100%',
        marginBottom: 16,
    },
    labelContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    label: {
        color: '#B1DAEC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelIcon: {
        width: 20,
        height: 20
    },
    iconContainer: {
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        borderRadius: '50%',
        padding: 5
    },
    input: {
        backgroundColor: '#124151',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: '#fff',
    },
    timeOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 5,
        marginBottom: 30,
    },
    timeButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(173, 215, 218, 0.5)',
        backgroundColor: 'rgba(122, 193, 198, 0.2)',
        margin: 5,
    },
    selectedTimeButton: {
        backgroundColor: '#B1DAEC',
    },
    timeText: {
        color: '#ccc',
        fontWeight: '500',
    },
    selectedTimeText: {
        color: '#062F3F',
        fontWeight: 'bold',
    },
    learningHeader: {
        color: '#5CE1E6',
        fontSize: 18,
        fontWeight: 'bold',
    },
    targetCard: {
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        width: 225,
        height: 175,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 25,
        alignItems: 'center',
        position: 'relative',
        marginBottom: 10,
    },
    activeTargetCard: {
        backgroundColor: '#F7A866',
        width: 225,
        height: 175,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        position: 'relative',
        marginBottom: 10,
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        borderWidth: 2,
        borderColor: '#F7A866',
        backgroundColor: 'rgba(5, 59, 74, 1)',
    },
    checkCircle: {
        backgroundColor: 'rgba(248, 236, 174, 1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkMark: {
        width: 30,
        height: 30
    },
    cardTitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
    activeCardTitle: {
        color: '#062F3F',
    },
    cardInfoIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 16,
        height: 16
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        borderWidth: 2,
        borderColor: 'rgba(122, 193, 198, 1)',
        margin: 4,
    },
    activeDot: {
        backgroundColor: 'rgba(122, 193, 198, 1)',
    },
    scrollConainer: {
        // width: '100%',
        gap: 15,
        padding: 5,
        alignItems: 'center',
    }
})