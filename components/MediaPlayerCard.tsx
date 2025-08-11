import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const { width } = Dimensions.get("window");

export default function MediaPlayerCard() {
    // Simulate playback state
    const [currentTime, setCurrentTime] = useState(112);
    const [isPlay, setIsPlay] = useState(true);
    const duration = 132; // 2:12 in seconds

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
            <ThemedView style={[styles.pauseStyle, isPlay && {display: 'none'}]}>
                <TouchableOpacity style={styles.continueBtn} onPress={() => setIsPlay(true)}>
                    <Image source={require('@/assets/images/icons/icon-play.png')} />
                    <ThemedText style={styles.btnText} >Continue</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            {/* Player Bar */}
            <View style={styles.playerBar}>
                {/* <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor="#FFE7A0"
          maximumTrackTintColor="#07324A"
          thumbTintColor="#FFE7A0"
          onValueChange={setCurrentTime}
        /> */}
                <View style={styles.playerSubBar}>
                    <Text style={styles.timeText}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
                    <TouchableOpacity>
                        <Image source={require("@/assets/images/icons/volume.png")} style={styles.volumeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("@/assets/images/icons/expand.png")} style={styles.expandIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Controls */}
            <View style={styles.controlsRow}>
                <TouchableOpacity style={styles.sideButton}>
                    <Image source={require("@/assets/images/icons/rewind.png")} style={styles.sideIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButton} onPress={() => setIsPlay(!isPlay)}>
                    <Image 
                        source={isPlay ? require("@/assets/images/icons/pause.png") : require("@/assets/images/icons/play.png")} style={styles.playIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideButton}>
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
        width: "100%",
        height: 30,
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
    },
    expandIcon: {
        width: 26,
        height: 26,
        tintColor: "#FFE7A0",
    },
});