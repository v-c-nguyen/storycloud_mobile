import { supabase } from "@/app/lib/supabase";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import StepIndicator_Pathway from "./StepIndecator";

const itemIcon = require('@/assets/images/parent/item.png')
const activeItemIcon = require('@/assets/images/parent/activeItem.png')
const docIcon = require('@/assets/images/parent/custom_pathway.png')
const rightButton = require('@/assets/images/parent/icon-right.png')

interface Child {
    id: number,
    name: string,
    age: number,
    mode: string,
    avatar_url: string
}

export default function AddPathway_Fourth({ mode, currentStep, onPress }: { mode: number, currentStep: number, onPress: (activeChildren: Child[]) => void }) {
    const router = useRouter();
    const [number, setNumber] = React.useState(0);
    const [children, setChildren] = React.useState<Child[]>([]);
    const [activeChildren, setActiveChildren] = React.useState<Child[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        async function fetchChildren() {
            setLoading(true);
            try {
                const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
                const { data, error } = await supabase.functions.invoke('children', {
                    method: 'GET',
                    headers: {
                        Authorization: jwt ? `Bearer ${jwt}` : '',
                    },
                });
                if (error) {
                    console.error('Error fetching children:', error.message);
                } else if (data && Array.isArray(data.data)) {
                    setChildren(data.data);
                }
            } catch (e) {
                console.error('Error fetching children:', e);
            } finally {
                setLoading(false);
            }
        }
        fetchChildren();
    }, []);

    function handleChildSelected(child: Child) {
        console.log("ASdfwerewrewr", child)
        setActiveChildren(prev =>
            prev.includes(child)
                ? prev.filter(t => t !== child)
                : [...prev, child]
        );
        console.log("activeChild", activeChildren)
    }
    return (
        <ThemedView style={styles.container}>
            {/* Step Indicators */}
            <StepIndicator_Pathway mode={mode} currentStep={currentStep} />

            {/* Custom Pathway Card */}
            <ThemedView style={styles.card}>
                <ThemedText style={[styles.subtitle]}>Assign Pathway</ThemedText>
                {/* Form */}
                <ThemedView style={styles.label}>
                    <ThemedView style={styles.iconContainer}><Image source={docIcon} style={styles.labelIcon}></Image></ThemedView>
                    <ThemedText style={styles.labelText}>Children</ThemedText>
                    <ThemedText style={styles.labelText}>| {activeChildren.length} Child</ThemedText>
                </ThemedView>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollConainer}
                    scrollEventThrottle={16}
                >
                    {/* Learning Target Card */}
                    {
                        children.length > 0 && children.map((child, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.itemContainer}
                                onPress={() => handleChildSelected(child)}>
                                {
                                    activeChildren.includes(child) ?
                                        <Image source={activeItemIcon} style={styles.itemIcon} />
                                        :
                                        <Image source={itemIcon} style={styles.itemIcon} />
                                }
                                <ThemedView style={styles.item}>
                                    <Image source={require('@/assets/images/parent/avatar-parent-2.png')} style={styles.childIcon} />
                                    <ThemedText style={[styles.childText, activeChildren.includes(child) && { color: 'rgba(5, 59, 74, 1)' }]}>{child.name}</ThemedText>
                                </ThemedView>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPress(activeChildren)}
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
        marginTop: 50,
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
    formInput: {
        flexDirection: 'column',
        marginBottom: 30,
        gap: 10
    },
    label: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
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
    labelText: {
        fontSize: 16,
        fontWeight: 700,
        color: 'rgba(122, 193, 198, 1)'
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
        outlineWidth: 0,
        color: 'white',
        fontSize: 16
    },
    textarea: {
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.2)',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
        outlineWidth: 0,
        color: 'rgba(122, 193, 198, 0.5)',
        fontSize: 16
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#445D65',
        backgroundColor: '#1C3E46',
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedCircle: {
        backgroundColor: '#F7A866',
        borderColor: '#F7A866',
    },
    activeCircle: {
        borderColor: '#F7A866',
        backgroundColor: '#0C3C4C',
    },
    stepText: {
        color: '#445D65',
        fontWeight: 'bold',
    },
    completedText: {
        color: '#fff',
    },
    activeText: {
        color: '#F7A866',
    },
    line: {
        height: 2,
        width: 20,
        backgroundColor: '#445D65',
        marginHorizontal: 4,
    },
    scrollConainer: {
        width: '100%',
        gap: 10,
        padding: 5,
        alignItems: 'center',
        marginTop: 20
    },
    childIcon: {
        width: 56,
        height: 56
    },
    childText: {
        fontSize: 14,
        fontWeight: 600,
        textAlign: 'center',
        color: 'rgba(122, 193, 198, 1)'
    },
    itemIcon: {

    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, -20%)'
    },
    itemContainer: {
        position: 'relative'
    }
})