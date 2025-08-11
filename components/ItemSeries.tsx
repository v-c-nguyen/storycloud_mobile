import { Image } from "expo-image";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface ItemProp {
    name: string,
    avatar_url?: any,
    symbol?: string
}

export function ItemSeries({ itemsData, theme = "light" }: { itemsData: ItemProp[], theme: string }) {
    const [selected, setSelected] = useState<string | null>(null);

    function handleStoryItem(item: string) {
        setSelected(item);
        console.log("storyOption clicked::", item)
    }
    return (
        <ThemedView>
            {/* Category pills */}
            <FlatList
                horizontal
                data={itemsData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                    const isSelected = selected === item.name;
                    return (
                        <TouchableOpacity onPress={() => handleStoryItem(item.name)}>
                            <ThemedView style={[styles.categoryPill, theme == "dark" && styles.activeCategoryPill, isSelected && styles.selectedPill]}>
                                {item.avatar_url && <Image source={item.avatar_url} style={styles.categoryAvatar} />}
                                {item.symbol && <ThemedText style={styles.symbol}>{item.symbol}</ThemedText>}
                                <ThemedText
                                    style={[
                                        styles.categoryText,
                                        isSelected && styles.selectedText,
                                        theme == "dark" && {color: 'white'}]}
                                >
                                    {item.name}
                                </ThemedText>
                            </ThemedView>
                        </TouchableOpacity>
                    );
                }}
                style={{ paddingHorizontal: 16 }}
                showsHorizontalScrollIndicator={false}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({

    categoryPill: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#053b4a17',
        borderRadius: 20,
        marginTop: 12,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    activeCategoryPill: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#add7da83',
        borderRadius: 20,
        backgroundColor: '#7AC1C614',
        marginTop: 12,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    selectedPill: {
        backgroundColor: '#fba864',
    },
    categoryText: {
        fontSize: 16,
        color: '#053B4A',
        fontWeight: '400',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedText: {
        color: '#053B4A',
        fontWeight: '400',
    },
    categoryAvatar: {
        width: 42,
        height: 42
    },
    symbol: {
        fontSize: 16,
        color: '#053B4A',
    }
})