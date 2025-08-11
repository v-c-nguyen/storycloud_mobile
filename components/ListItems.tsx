import { Image } from 'expo-image';
import React from "react";
import { ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";



type ItemProps = {
    name: string,
    avatar: ImageSourcePropType | undefined,
    active: boolean,
    onPress?: () => void // Add onPress prop
}

type ModeItemProps = {
    name: string,
    avatar: ImageSourcePropType | undefined,
    active: boolean,
    onPress?: () => void // Add onPress prop
}



export function ItemWithImage({ name, avatar, active, onPress }: ItemProps) {
    return (
        <TouchableOpacity onPress={onPress}>

            <ThemedView
                style={[styles.itemStyleLeft, active && styles.itemActiveStyleLeft]}
            >
                <Image
                    source={require('@/assets/images/parent/avatar-parent-2.png')}
                    style={styles.avatar_left}
                    contentFit="cover"
                />
                <ThemedText style={[styles.nameTextLeft, active && styles.activeNameTextLeft]}>{name}</ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

export function ItemWithRightImage({ name, avatar }: { name: string, avatar: string }) {
    return (
        <TouchableOpacity>

            <ThemedView
                style={styles.itemActiveStyle}
            >
                <Image
                    source={require('@/assets/images/parent/avatar-parent-2.png')}
                    style={styles.avatar}
                    contentFit="cover"
                />
                <ThemedText style={styles.nameText}>{name}</ThemedText>
            </ThemedView>
        </TouchableOpacity>

    );
}


export function ModeItem({ name, avatar, active, onPress }: ModeItemProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={[styles.modeItemStyle, active && styles.activeMIS]}>
                <ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <ThemedView style={styles.modeAvatarStyle}>
                        <Image source={avatar} style={[styles.modeAvatariconStyle, active && styles.activeMAIS]} />
                        <Image source={require("@/assets/images/parent/dashboard/white-circle.png")} style={[styles.modeAvatarCircleStyle, active && styles.activeMACS]} />
                    </ThemedView>
                    <ThemedText style={[{ color: "#ffffff", fontSize: 18, fontWeight: 700 }, active && { color: "rgba(5, 59, 74, 1)", fontSize: 18, fontWeight: 700 }]}>{name}</ThemedText>
                    <ThemedText style={[{ color: "#ffffff", fontSize: 18 }, active && { color: 'rgba(5, 59, 74, 1)', fontSize: 18 }]}>Mode</ThemedText>
                </ThemedView>
                {active ?
                    <Image source={require("@/assets/images/parent/dashboard/selected.png")} />
                    :
                    <Image source={require("@/assets/images/parent/dashboard/selectable.png")} />
                }
            </ThemedView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        display: 'flex',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(252, 252, 252, 0.2)',
        borderRadius: 50,
    },
    itemStyleLeft: {
        display: 'flex',
        minWidth: 140,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(252, 252, 252, 0.2)',
        borderRadius: 50,
    },
    itemActiveStyle: {
        display: 'flex',
        height: 40,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(252, 252, 252, 0.3)',
        borderRadius: 48, // Slightly smaller than the LinearGradient border radius
    },
    itemActiveStyleLeft: {
        display: 'flex',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(252, 252, 252, 0.3)',
        borderRadius: 48, // Slightly smaller than the LinearGradient border radius
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(252, 252, 252, 0.2)',
    },
    avatar_left: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(252, 252, 252, 0.2)',
    },
    nameText: {
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
        color: 'rgba(248, 236, 174, 1)',
        padding: 12,
    },
    nameTextLeft: {
        fontSize: 18,
        fontWeight: '700',
        color: 'rgba(122, 193, 198, 1)',
        padding: 16,
    },
    activeNameTextLeft: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        padding: 16,
    },
    modeItemStyle: {
        height: 72,
        paddingHorizontal: 26,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    modeAvatarStyle: {
        position: 'relative',
        width: 60,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    modeAvatarCircleStyle: {
        position: 'absolute',
        right: 0,
        tintColor: 'rgba(244, 166, 114, 1)'
    },
    modeAvatariconStyle: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
        tintColor: 'white'
    },
    activeMIS: {
        height: 72,
        paddingHorizontal: 26,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 166, 114, 1)',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    activeMACS: {
        position: 'absolute',
        right: 0,
        tintColor: 'white'
    },
    activeMAIS: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
        tintColor: 'rgba(5, 59, 74, 1)'
    }
});
