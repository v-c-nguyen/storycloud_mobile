import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";


const refreshIcon = require('@/assets/images/parent/icon-refresh.png')
export default function PaymentMethod() {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('account');

    const handleTabPress = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <SafeAreaView style={{ flex: 1, display: "flex", height: 500 }}>
            <ThemedView style={{ flex: 1, backgroundColor: 'rgba(5, 59, 74, 1)' }}>
                <ScrollView
                    style={styles.rootContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 55 }}
                >
                    {/* Header */}
                    <Header
                        icon={require('@/assets/images/parent/icon-profile.png')}
                        role="parent"
                        title="Profile Settings"
                        theme="dark"
                    ></Header>

                    {/* Cloud Image */}
                    <ThemedView style={styles.headerRocketWrap}>
                        <Image
                            source={require("@/assets/images/kid/cloud-group-far.png")}
                            style={styles.imgCloudFar}
                            resizeMode="cover"
                        />
                        <Image
                            source={require("@/assets/images/kid/cloud-group-near.png")}
                            style={styles.imgCloudNear}
                            resizeMode="cover"
                        />
                    </ThemedView>

                    {/* Front Box */}
                    <Image
                        source={require("@/assets/images/parent/frontbox.png")}
                        style={styles.profileFrontBox}
                        resizeMode="cover"
                    />

                    {/* Main Content */}
                    <ThemedView style={styles.settingContentStyle}>
                        <ThemedView style={styles.tabContent}>
                            <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
                            <ThemedView style={styles.card}>
                                <ThemedView style={styles.cardRow}>
                                    <Image
                                        source={require('@/assets/images/parent/icon-paymentCard.png')}
                                        style={styles.cardIcon}
                                    />
                                    <ThemedView style={{ flexDirection: 'column', gap: 5 }}>
                                        <ThemedText style={[styles.cardText, { fontWeight: 700 }]}>MasterCard</ThemedText>
                                        <ThemedText style={styles.cardText}>**** 3425</ThemedText>
                                    </ThemedView>
                                    {/* <Link href={`/parent/profile/PaymentMethod`}>
                                        <TouchableOpacity style={styles.changeButton}>
                                            <Image source={refreshIcon} />
                                            <ThemedText style={styles.changeBtnText}>Change</ThemedText>
                                        </TouchableOpacity>
                                    </Link> */}
                                </ThemedView>
                                <ThemedText style={styles.cardExpiry}>02/26</ThemedText>
                            </ThemedView>
                        </ThemedView>

                    </ThemedView>
                </ScrollView>
                <BottomNavBar role="parent" active="Profile" />
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    settingContainer: {},
    rootContainer: {
        flex: 1,
        position: "relative",
    },
    headerRocketWrap: {
        width: '100%',
        height: 200,
        paddingLeft: 36,
        marginTop: -56,
        position: "relative",
    },
    imgCloudFar: {
        width: "100%",
        height: 278,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -100,
    },
    imgCloudNear: {
        width: "100%",
        height: 279,
        position: "absolute",
        top: 42,
        left: 0,
        zIndex: -10
    },
    profileFrontBox: {
        position: "absolute",
        top: 180,
        zIndex: 0,
        tintColor: 'white'
    },
    sectionTitle: { fontSize: 24, color: "rgba(5, 59, 74, 1)", fontWeight: '700', marginBottom: 30 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(5, 59, 74, 0.2)',
        padding: 20,
        marginBottom: 30,
        elevation: 3,
    },
    mainSettingStyle: {
        display: 'flex',
        flexDirection: 'column'
    },
    settingContentStyle: {
        zIndex: 10
    },cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardIcon: { width: 52, height: 52, resizeMode: 'contain', borderBottomWidth: 1, borderColor: 'rgba(173, 215, 218, 1)' },
    cardText: { fontSize: 16, fontWeight: '400', color: 'rgba(5, 59, 74, 1)', flex: 1, marginLeft: 10 },
    changeButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(5, 59, 74, 0.2)',
        borderRadius: 30
    },
    changeBtnText: {
        fontSize: 16,
        fontWeight: 400,
        color: 'rgba(5, 59, 74, 1)'
    },
    cardExpiry: { marginTop: 30, fontSize: 16, color: 'rgba(5, 59, 74, 1)' },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        padding: 4,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    activeTabItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    tabText: {
        color: 'rgba(5, 59, 74, 1)',
        fontSize: 16,
        fontWeight: '600',
    },
    activeTabText: {
        color: 'rgba(5, 59, 74, 1)',
        fontWeight: '700',
    },
    tabContent: {
        marginHorizontal: 1,
        borderWidth: 2,
        borderColor: 'rgba(122, 193, 198, 0.2)',
        borderRadius: 20,
    },
    contentTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    icon24: {
        width: 24,
        height: 24
    },
    settingHeader: {
        color: 'rgba(5, 59, 74, 1)',
        fontSize: 28,
        fontWeight: 700,
        textAlign: 'center'
    }
});
