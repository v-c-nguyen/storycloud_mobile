import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";


const refreshIcon = require('@/assets/images/parent/icon-refresh.png')
const checkCircleIcon = require('@/assets/images/parent/check-circle-icon.png')
const trashIcon = require('@/assets/images/parent/trash-icon.png')
const plusIcon = require('@/assets/images/parent/icon-plus.png')
const stripeIcon = require('@/assets/images/parent/stripe.png')
const backIcon = require('@/assets/images/parent/icon-left.png')

export default function PaymentMethod() {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('account');

    const handleTabPress = (tabId: string) => {
        setActiveTab(tabId);
    };

    function handleBackBtn() {
        router.push('/(parent)/(profiles)/(billing)')
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={{ flex: 1, display: "flex", height: 500 }}>
                <ThemedView style={{ flex: 1, backgroundColor: 'rgba(5, 59, 74, 1)' }}>
                    <ScrollView
                        style={styles.rootContainer}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 55 }}
                    >
                        {/* Header */}
                        <Header
                            role="parent"
                            theme="dark"
                        ></Header>

                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={handleBackBtn}>
                            <Image source={backIcon} style={styles.backBtnIcon}></Image>
                            <ThemedText style={styles.backBtnText}>Back to Billing</ThemedText>
                        </TouchableOpacity>

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

                        {/* Main Content */}
                        <ThemedView style={styles.settingContentStyle}>
                            <ThemedView style={styles.tabContent}>
                                <ThemedView style={[styles.flexRow, { justifyContent: 'flex-start', gap: 10 }]}>
                                    <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
                                    <Image source={stripeIcon} style={[styles.icon24, { marginBottom: 30 }]}></Image>
                                </ThemedView>
                                <ThemedView style={[styles.card, styles.flexCol, styles.justifyBetween, { borderColor: 'rgba(5, 59, 74, 0.6)' }]}>
                                    <ThemedView style={[styles.cardRow, styles.flexRow]}>
                                        <ThemedView style={[styles.flexRow]}>
                                            <Image
                                                source={require('@/assets/images/parent/icon-paymentCard.png')}
                                                style={styles.cardIcon}
                                            />
                                            <ThemedText style={styles.cardText_Card}>**** 3425</ThemedText>
                                        </ThemedView>
                                        <TouchableOpacity>
                                            <ThemedView style={[styles.iconButton, styles.iconButtonWithBack]}>
                                                <Image
                                                    source={checkCircleIcon}
                                                    style={styles.icon16}
                                                    resizeMode='cover' />
                                            </ThemedView>
                                        </TouchableOpacity>
                                    </ThemedView>
                                    <ThemedView style={styles.cardRow}>
                                        <ThemedText style={styles.cardExpiry}>02/26</ThemedText>
                                        <TouchableOpacity>
                                            <ThemedView style={[styles.iconButton]}>
                                                <Image
                                                    source={trashIcon}
                                                    style={styles.icon16}
                                                    resizeMode='cover' />
                                            </ThemedView>
                                        </TouchableOpacity>
                                    </ThemedView>
                                </ThemedView>
                                <ThemedView style={[styles.card, styles.flexCol, styles.justifyBetween]}>
                                    <ThemedView style={styles.cardRow}>
                                        <ThemedView style={styles.flexRow}>
                                            <Image
                                                source={require('@/assets/images/parent/icon-paymentCard.png')}
                                                style={styles.cardIcon}
                                            />
                                            <ThemedText style={styles.cardText}>**** 3425</ThemedText>
                                        </ThemedView>
                                    </ThemedView>
                                    <ThemedView style={styles.cardRow}>
                                        <ThemedText style={styles.cardExpiry}>02/26</ThemedText>
                                        <TouchableOpacity>
                                            <ThemedView style={[styles.iconButton]}>
                                                <Image
                                                    source={trashIcon}
                                                    style={styles.icon16}
                                                    resizeMode='cover' />
                                            </ThemedView>
                                        </TouchableOpacity>
                                    </ThemedView>
                                </ThemedView>

                                <TouchableOpacity onPress={() => router.push('./new_method')}>
                                    <ThemedView style={[styles.card, styles.flexCol, styles.justifyCenter, { borderWidth: 2, borderStyle: 'dashed' }]}>
                                        <ThemedView style={styles.flexRow}>
                                            <Image source={plusIcon} style={{ width: 18, height: 18 }} />
                                            <ThemedText style={styles.cardText}>Add New Method</ThemedText>
                                        </ThemedView>
                                    </ThemedView>
                                </TouchableOpacity>

                            </ThemedView>

                        </ThemedView>
                    </ScrollView>

                    <BottomNavBar
                        role="parent"
                        image={true}
                        theme="darkImage"
                        active="Profile" />
                </ThemedView>
            </SafeAreaView>
        </>
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
        height: 300,
        paddingLeft: 36,
        marginTop: -56,
        position: "relative",
    },
    imgCloudFar: {
        width: '110%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -100,
    },
    imgCloudNear: {
        width: '110%',
        height: '100%',
        position: "absolute",
        top: 42,
        left: 0,
        zIndex: -10
    },
    settingContentStyle: {
        backgroundColor: '#fff',
        paddingHorizontal: 3,
        zIndex: 10,
        paddingBottom: 100,
        marginTop: -100
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
        minHeight: 160,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(5, 59, 74, 0.2)',
        padding: 20,
        marginBottom: 8,
        elevation: 3,
    },
    mainSettingStyle: {
        display: 'flex',
        flexDirection: 'column'
    },
    cardRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardIcon: { width: 52, height: 52, resizeMode: 'contain', borderBottomWidth: 1, borderColor: 'rgba(173, 215, 218, 1)' },
    cardText: { fontSize: 16, fontWeight: '400', color: 'rgba(5, 59, 74, 1)', flex: 1, marginLeft: 10 },
    cardText_Card: { fontSize: 16, fontWeight: '400', color: 'rgba(5, 59, 74, 1)', marginLeft: 10 },
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
        minHeight: 500,
        marginHorizontal: 1,
        paddingVertical: 30,
        paddingHorizontal: 10,
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
    icon16: {
        width: 16,
        height: 16
    },
    settingHeader: {
        color: 'rgba(5, 59, 74, 1)',
        fontSize: 28,
        fontWeight: 700,
        textAlign: 'center'
    },
    iconButton: {
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBlockColor: 'rgba(5, 59, 74, 0.2)',
        borderWidth: 1,
        width: 40,
        height: 40
    },
    iconButtonWithBack: {
        backgroundColor: '#F4A672',
        borderWidth: 0
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexCol: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        top: -35,
        zIndex:999
    },
    backBtnIcon: {

    },
    backBtnText: {
        color: 'rgba(122, 193, 198, 1)',
        fontSize: 14,
        fontWeight: 400
    },
});

