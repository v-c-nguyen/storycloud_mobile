import BottomNavBar from '@/components/BottomNavBar';
import DropDownMenu from '@/components/DropDownMenu';
import Header from '@/components/Header';
import { TabBar } from '@/components/TabBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { Link, Stack, useRouter } from "expo-router";
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const billingData = [
    {
        id: '1',
        product: 'StoryCloud',
        category: 'Classroom',
        price: '$90.00',
        date: 'Dec 1, 2024',
        status: 'Paid',
    },
    {
        id: '2',
        product: 'StoryCloud',
        category: 'Classroom',
        price: '$90.00',
        date: 'Dec 1, 2024',
        status: 'Paid',
    },
    {
        id: '3',
        product: 'StoryCloud',
        category: 'Classroom',
        price: '$90.00',
        date: 'Dec 1, 2024',
        status: 'Paid',
    },
];

const refreshIcon = require('@/assets/images/parent/icon-refresh.png')
const downloadIcon = require('@/assets/images/parent/icon-download.png')
const tickIcon = require('@/assets/images/parent/icon-tick.png')
const swapIcon = require('@/assets/images/parent/icon-swap.png')


const Billing = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('billing');
    const [activeItem, setActiveItem] = React.useState('account');
    const handleTabPress = (tabId: string) => {
        console.log("tabId:", tabId)
        setActiveItem(tabId);
    };

    const handleItemProcess = (item: string) => {
        switch (item) {
            case 'account':
                router.navigate("/(parent)/(profiles)/(account)");
                break;
            case 'login':
                router.navigate("/(parent)/(profiles)/(login)");
                break;
            case 'subscription':
                router.navigate("/(parent)/(profiles)/(subscription)");
                break;
            case 'billing':
                router.navigate("/(parent)/(profiles)/(billing)");
                break;

            default:
                break;
        }

    }

    const tabs = [
        { id: 'account', label: 'Account', icon: require("@/assets/images/parent/icon-profile.png") },
        { id: 'content', label: 'Content', icon: require("@/assets/images/parent/icon-content.png") }
    ];
    return (

        <>
            <Stack.Screen options={{ headerShown: false }} />

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

                    {/* Main Content */}
                    <ThemedView style={styles.settingContentStyle}>
                        <ThemedText style={styles.settingHeader}>Settings</ThemedText>

                        {/* Tab Navigation */}
                        <TabBar
                            tabs={tabs}
                            activeTab={activeItem}
                            onTabPress={handleTabPress}
                        />

                        <DropDownMenu activeItem={activeTab} onSelect={(item) => handleItemProcess(item)} />

                        <ScrollView style={styles.container}>
                            <ThemedText style={styles.sectionTitle}>Current Plan</ThemedText>
                            {/* Current Plan */}
                            <ThemedView style={styles.card}>
                                <ThemedView style={styles.rowBetween}>
                                    <ThemedText style={styles.label}>Plan</ThemedText>
                                    <ThemedView style={[styles.value, { flexDirection: 'row' }]}>StoryCloud <ThemedText> | Classroom</ThemedText></ThemedView>
                                </ThemedView>
                                <ThemedView style={styles.rowBetween}>
                                    <ThemedText style={styles.label}>Billing Cycle</ThemedText>
                                    <ThemedText style={styles.value}>Monthly</ThemedText>
                                </ThemedView>
                                <ThemedView style={styles.rowBetween}>
                                    <ThemedText style={styles.label}>Cost</ThemedText>
                                    <ThemedText style={styles.value}>$90</ThemedText>
                                </ThemedView>
                                <ThemedView style={styles.rowBetween}>
                                    <ThemedText style={styles.label}>Usage</ThemedText>
                                    <ThemedText style={styles.value}>8 of 9 Seats</ThemedText>
                                </ThemedView>
                            </ThemedView>

                            {/* Payment Method */}
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
                                    <Link href={`./PaymentMethod`}>
                                        <TouchableOpacity style={styles.changeButton}>
                                            <Image source={refreshIcon} />
                                            <ThemedText style={styles.changeBtnText}>Change</ThemedText>
                                        </TouchableOpacity>
                                    </Link>
                                </ThemedView>
                                <ThemedText style={styles.cardExpiry}>02/26</ThemedText>
                            </ThemedView>

                            {/* Billing History */}
                            <ThemedText style={styles.sectionTitle}>Billing History</ThemedText>
                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                                <ThemedView style={[styles.firstrow, { flex: 1, marginBottom: 10 }]}>
                                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <ThemedText style={styles.pipe}> Invoice </ThemedText>
                                        <Image source={swapIcon}></Image>
                                    </ThemedView>
                                    <Image source={swapIcon}></Image>
                                </ThemedView>
                            </ThemedView>
                            <FlatList
                                data={billingData}
                                style={styles.billingContainer}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <ThemedView style={styles.billingCard}>
                                        <ThemedView style={styles.details}>
                                            <ThemedView style={styles.firstrow}>
                                                <ThemedText style={styles.title}>
                                                    {item.product} <ThemedText style={styles.pipe}>| {item.category}</ThemedText>
                                                </ThemedText>
                                                <Image source={downloadIcon}></Image>
                                            </ThemedView>
                                            <ThemedView style={styles.secondrow}>
                                                <ThemedText style={styles.sub}>{item.price}</ThemedText>
                                                <ThemedText style={styles.sub}>{item.date}</ThemedText>
                                                <ThemedView style={styles.status}>
                                                    <Image source={tickIcon}></Image>
                                                    <ThemedText style={styles.statusText}>{item.status}</ThemedText>
                                                </ThemedView>
                                            </ThemedView>
                                        </ThemedView>
                                    </ThemedView>
                                )}
                            />
                        </ScrollView>

                    </ThemedView>
                </ScrollView>
                <BottomNavBar
                    role="parent"
                    image={true}
                    theme="darkImage"
                    active="Profile" />
            </ThemedView>

        </>
    );
};

const styles = StyleSheet.create({
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
        width: 400,
        height: 278,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -100,
    },
    imgCloudNear: {
        width: 400,
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
    mainSettingStyle: {
        display: 'flex',
        flexDirection: 'column'
    },
    settingContentStyle: {
        backgroundColor: '#fff',
        paddingHorizontal: 3,
        zIndex: 10,
        paddingBottom: 100
    },
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
    },
    container: { paddingHorizontal: 16, paddingVertical: 30, backgroundColor: '#fff' },
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
    rowBetween: {
        fontSize: 14,
        color: 'rgba(5, 59, 74, 1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    label: {
        width: '40%',
        fontSize: 14,
        color: 'rgba(5, 59, 74, 1)',
        fontWeight: 400
    },
    value: {
        width: '60%',
        fontWeight: '600',
        fontSize: 14,
        color: 'rgba(5, 59, 74, 1)',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 3,
        marginTop: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#18b6f6',
        borderRadius: 3,
    },
    cardRow: {
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
    billingContainer: {
        borderWidth: 1,
        borderColor: 'rgba(5, 59, 74, 0.2)',
        borderRadius: 10
    },
    billingCard: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(5, 59, 74, 0.2)',
        flexDirection: 'row',
        gap: 10
    },
    firstrow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    secondrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    details: {
        flex: 1,
        flexDirection: 'column',
        gap: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgba(5, 59, 74, 1)'
    },
    pipe: {
        fontSize: 16,
        fontWeight: 400,
        color: 'rgba(5, 59, 74, 1)',
    },
    sub: {
        fontSize: 16,
        color: 'rgba(5, 59, 74, 1)',
    },
    status: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(5, 59, 74, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 100,
    },
    statusText: {
        color: 'rgba(5, 59, 74, 1)',
        fontWeight: '400',
        fontSize: 16,
    },
});

export default Billing;
