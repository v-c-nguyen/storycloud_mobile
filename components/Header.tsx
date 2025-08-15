import { supabase } from '@/app/lib/supabase';
import { useUser } from '@/app/lib/UserContext';
import Ionicons from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
// import { supabase } from "../../app/lib/supabase";

interface HeaderProps {
    icon?: any,
    role?: string,
    title?: string,
    theme?: string,
    flag?: boolean
}

export default function Header({ icon, role = "kid", title = "", theme = "light", flag = false }: HeaderProps) {
    const router = useRouter();
    const [showMenu, setShowMenu] = React.useState(false);


    const [showSignOut, setShowSignOut] = useState(false);
    const { user, setUser } = useUser();

    React.useEffect(() => {
        async function checkAuth() {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            const expiresAt = session?.expires_at; // Unix timestamp (seconds)
            const now = Math.floor(Date.now() / 1000);

            console.log("expiresAt:", expiresAt, "now:", now);

            if (
                !user ||
                !token ||
                !expiresAt ||
                expiresAt < now // Token is expired
            ) {
                handleSignout();
            }
        }
        checkAuth();
    }, [user]);

    async function handleSignout() {
        setShowMenu(!showMenu);
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert(error.message);
            return
        }
        router.navigate("/(auth)");

    }
    function toKidMode() {
        setShowMenu(!showMenu);
        router.replace("/(auth)");
    }

    return (
        <ThemedView>

            <ThemedView style={[styles.headerContainer, showSignOut && { backgroundColor: '#fff' }]}>
                <ThemedView style={[styles.headingWrap]}>
                    <Image
                        source={require("@/assets/images/kid/logo-ballon.png")}
                        style={[styles.logoBallon, theme == 'dark' && { tintColor: 'rgba(122, 193, 198, 1)' }, theme == 'light' && { tintColor: 'rgba(5, 59, 74, 1)' }]}
                        contentFit="cover"
                    />
                    <ThemedView style={styles.headerTitleStyle}>
                        {
                            icon &&
                            <Image
                                source={icon}
                                style={[styles.logo20, theme == 'dark' && { tintColor: 'rgba(122, 193, 198, 1)' }]}
                                contentFit="cover"
                            />
                        }
                        <ThemedText
                            style={[styles.headTextStyle, theme == 'light' && { color: 'rgba(5, 59, 74, 1)' }]}>
                            {title}
                        </ThemedText>
                    </ThemedView>

                    {role == "kid" &&
                        <TouchableOpacity onPress={() => setShowSignOut(!showSignOut)}>

                            <Image
                                source={require("@/assets/images/kid/logo-baby.png")}
                                style={[styles.logoBallon, theme == 'dark' && { tintColor: 'white' }]}
                                contentFit="cover"
                            />
                        </TouchableOpacity>
                    }
                    {role == "parent" &&
                        <ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: "center", }}>
                            <ThemedView style={styles.parentIconGroup}>
                                <Image
                                    source={require("@/assets/images/parent/header/icon-parent.png")}
                                    style={[styles.parentIcon, theme == 'light' && { tintColor: 'rgba(5, 59, 74, 1)' }]}
                                    contentFit="cover"
                                />
                                <Image
                                    source={require("@/assets/images/parent/orange-circle.png")}
                                    style={styles.setCirclePosition}
                                    contentFit="cover"
                                />
                            </ThemedView>
                            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                                <Image
                                    source={require("@/assets/images/parent/header/icon-down.png")}
                                    style={[styles.logodown, theme == 'dark' && { tintColor: 'white' }]}
                                    contentFit="cover"
                                />
                            </TouchableOpacity>

                            {showMenu &&
                                <ThemedView style={styles.dropdown}>
                                    <TouchableOpacity onPress={handleSignout}>
                                        <ThemedView style={styles.dropdownItem}>
                                            <ThemedText style={styles.dropdownText}>Log out</ThemedText>
                                        </ThemedView>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={toKidMode}>
                                        <ThemedView style={styles.dropdownItem}>
                                            <ThemedText style={styles.dropdownText}>Kid Mode</ThemedText>
                                        </ThemedView>
                                    </TouchableOpacity>
                                </ThemedView>
                            }
                        </ThemedView>
                    }
                </ThemedView>

                {
                    showSignOut && <>
                        <ThemedView style={[styles.headerWrap, { backgroundColor: "#fff"}]}>
                            <TouchableOpacity
                                style={[styles.signOutButton]}
                                onPress={() => console.log("Sign Out")}
                            >
                                <Ionicons
                                    name="log-out"
                                    size={24}
                                    color="#053B4A"
                                />
                                <ThemedText style={{ color: "#053B4A", fontSize: 18, marginLeft: 8 }}>
                                    Sign Out
                                </ThemedText>
                            </TouchableOpacity>
                            <Image
                                source={require("@/assets/images/kid/cloud-group-bottom.png")}
                                style={[styles.imgCloudFar, { transform: [{ rotate: '180deg' }], height: 200 }]}
                                resizeMode="cover"
                            />
                        </ThemedView>
                    </>
                }
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {

    },
    headingWrap: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 16,
        marginRight: 16,
        marginTop: 23,
    },
    lightHeader: {
        color: 'rgba(5, 59, 74, 1)',
        tintColor: 'rgba(5, 59, 74, 1)'
    },
    darkHeader: {
        color: 'rgba(122, 193, 198, 1)',
        tintColor: 'rgba(122, 193, 198, 1)'
    },
    logoBallon: {
        width: 48,
        height: 48,
    },
    logoParent: { width: 48, height: 48 },
    logodown: { width: 24, height: 24 },
    headTextStyle: {
        fontSize: 14,
        color: 'rgba(122, 193, 198, 1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    parentIconGroup: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 50,
        height: 50
    },
    parentIcon: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: 5
    },
    setCirclePosition: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 26,
        height: 26,
        zIndex: -10
    },
    headerTitleStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    logo20: {
        width: 20,
        height: 20
    },
    dropdown: {
        width: 180,
        position: 'absolute',
        right: 0,
        bottom: 0,
        transform: 'translate(0, 100%)',
        flexDirection: 'column',
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        padding: 5,
        zIndex: 999
    },
    dropdownItem: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    dropdownIcon: {

    },
    dropdownText: {
        color: 'rgba(122, 193, 198, 1)',
        fontSize: 16,
        fontWeight: 400
    },
    headerWrap: {
        paddingTop: 40,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    imgCloudFar: {
        width: "110%",
        height: 278,
        position: "absolute",
        top: 58,
        left: 0,
        zIndex: -100,
    },
    signOutButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#053B4A",
    },
});
