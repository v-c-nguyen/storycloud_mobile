import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const { width } = Dimensions.get("window");

type MediaPlayerCardProps = {
    onAudioEnd?: () => void;
};

export default function MediaPlayerCard({ onAudioEnd }: MediaPlayerCardProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlay, setIsPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);
    const [volume, setVolume] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Replace with your audio file URL or local asset
    const AUDIO_URL = "https://fzmutsehqndgqwprkxrm.supabase.co/storage/v1/object/sign/audio/PILOT_%20Kai's%20Polar%20Expedition%20-%202-5%20years.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNjNkYWNiNy1lYWJiLTQyOTQtOGY2My03YjVlYTk2Y2JiOWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdWRpby9QSUxPVF8gS2FpJ3MgUG9sYXIgRXhwZWRpdGlvbiAtIDItNSB5ZWFycy5tcDMiLCJpYXQiOjE3NTQ4NjI4MzUsImV4cCI6MTc1NTQ2NzYzNX0.Fa9oSDirS4S83XGwJEwyVEQEmImsrk0mrdwnhdF4iJY";

    useEffect(() => {
        loadAudio();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep volume slider in sync with actual sound volume
    useEffect(() => {
        if (sound) {
            sound.setVolumeAsync(volume);
        }
    }, [volume, sound]);

    async function loadAudio() {
        try {
            const { sound: playbackObject, status } = await Audio.Sound.createAsync(
                { uri: AUDIO_URL },
                { shouldPlay: false },
                onPlaybackStatusUpdate
            );
            setSound(playbackObject);
            if (status.isLoaded) {
                setDuration(status.durationMillis ? status.durationMillis / 1000 : 1);
                if (typeof status.volume === 'number') setVolume(status.volume);
            }
        } catch (e) {
            console.error('Failed to load audio', e);
        }
    }

    function onPlaybackStatusUpdate(status: any) {
        if (status.isLoaded) {
            setCurrentTime(status.positionMillis / 1000);
            setDuration(status.durationMillis ? status.durationMillis / 1000 : 1);
            setIsPlay(status.isPlaying);
            // Detect when audio finishes
            if (status.didJustFinish && !status.isPlaying) {
                    console.log("finished")

                if (onAudioEnd) {
                    onAudioEnd();
                }
            }
        }
    }

    const handlePlayPause = async () => {
        if (!sound) return;
        if (isPlay) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const handleSeek = async (seconds: number) => {
        if (!sound) return;
        let newTime = currentTime + seconds;
        if (newTime < 0) newTime = 0;
        if (newTime > duration) newTime = duration;
        await sound.setPositionAsync(newTime * 1000);
    };

    // Volume control
    const handleVolumeChange = (value: number) => {
        setVolume(value);
    };

    // Format seconds to mm:ss
    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? "0" : ""}${sec}`;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerAdventure}>KAI’S LIVING ADVENTURE</Text>
                <Text style={styles.headerTitle}>
                    <Text style={styles.headerNumber}>#2 </Text>
                    <Text style={styles.headerTitleItalic}>Petal Tales: The Search for Rainbow Flowers</Text>
                </Text>
            </View>
            {/* Image */}
            <Image
                source={require("@/assets/images/parent/sample-card-image.png")} // Replace with your image
                style={styles.cardImage}
                resizeMode="cover"
            />
            <ThemedView style={[styles.pauseStyle, isPlay && { display: 'none' }]}>
                <TouchableOpacity style={styles.continueBtn} onPress={handlePlayPause}>
                    <Image source={require('@/assets/images/icons/icon-play.png')} />
                    <ThemedText style={styles.btnText} >Continue</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            {/* Player Bar */}
            <View style={styles.playerBar}>

                <View style={styles.playerSubBar}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={duration}
                        value={currentTime}
                        minimumTrackTintColor="#F4A672"
                        maximumTrackTintColor="#07324A"
                        thumbTintColor="#F4A672"
                        onSlidingComplete={async (value) => {
                            if (sound) await sound.setPositionAsync(value * 1000);
                        }}
                    />
                    <Text style={styles.timeText}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
                    <View style={styles.volumeBarContainer}>
                        <Image source={require("@/assets/images/icons/volume.png")} style={styles.volumeIcon} />
                        <Slider
                            style={styles.volumeSlider}
                            minimumValue={0}
                            maximumValue={1}
                            value={volume}
                            minimumTrackTintColor="#F4A672"
                            maximumTrackTintColor="#07324A"
                            thumbTintColor="#F4A672"
                            onValueChange={handleVolumeChange}
                        />
                    </View>
                    <TouchableOpacity>
                        <Image source={require("@/assets/images/icons/expand.png")} style={styles.expandIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Controls */}
            <View style={styles.controlsRow}>
                <TouchableOpacity style={styles.sideButton} onPress={() => handleSeek(-10)}>
                    <Image source={require("@/assets/images/icons/rewind.png")} style={styles.sideIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                    <Image
                        source={isPlay ? require("@/assets/images/icons/pause.png") : require("@/assets/images/icons/play.png")} style={styles.playIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideButton} onPress={() => handleSeek(10)}>
                    <Image source={require("@/assets/images/icons/forward.png")} style={styles.sideIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 22,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
    },
    header: {
        alignItems: "center",
        marginBottom: 2,
    },
    headerAdventure: {
        color: "#FFE7A0",
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: 0.5,
        marginBottom: 5,
    },
    headerTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    headerNumber: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    headerTitleItalic: {
        fontStyle: "italic",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    cardImage: {
        width: "100%",
        height: 195,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgba(250, 248, 248, 0.2)',
        marginBottom: 12,
    },
    controlsRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "center",
        gap: 25,
        marginBottom: 12,
        marginTop: 6,
    },
    pauseStyle: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(rgba(5, 59, 74, 0.5))',
        justifyContent: 'center',
        alignItems: 'center',
        top: 110,
        borderRadius: 20,
        position: 'absolute'
    },
    continueBtn: {
        width: 200,
        backgroundColor: 'rgba(244, 166, 114, 1)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 70,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18,
        fontWeight: 400,
        color: 'rgba(5, 59, 74, 1)'
    },
    playButton: {
        width: 85,
        height: 85,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 22,
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 6,
    },
    playIcon: {
        width: 85,
        height: 85,
    },
    sideButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.11,
        shadowRadius: 4,
    },
    sideIcon: {
        width: 85,
        height: 85,
    },
    playerBar: {
        width: "92%",
        alignSelf: "center",
        marginTop: 8,
        marginBottom: 20
    },
    slider: {
        width: '30%',
        height: 20,
        marginTop: 0,
    },
    playerSubBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 2,
    },
    timeText: {
        color: "#FFE7A0",
        fontSize: 16,
        fontWeight: "600",
    },
    volumeIcon: {
        width: 28,
        height: 28,
        tintColor: "#FFE7A0",
        marginRight: 4,
    },
    volumeBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        marginHorizontal: 8,
    },
    volumeSlider: {
        flex: 1,
        height: 20,
    },
    expandIcon: {
        width: 26,
        height: 26,
        tintColor: "#FFE7A0",
    },
});