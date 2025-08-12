import { supabase } from '@/app/lib/supabase';
import { useUser } from '@/app/lib/UserContext';
import BottomNavBar from '@/components/BottomNavBar';
import DropDownMenu from '@/components/DropDownMenu';
import Header from '@/components/Header';
import { ModeList } from '@/components/ModeList';
import { TabBar } from '@/components/TabBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useChildrenStore } from '@/store/childrenStore';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';


interface Kid {
    id: string;
    name: string;
    age: number;
    avatar_url?: any;
    [key: string]: any;
}

const downloadIcon = require('@/assets/images/parent/icon-download.png')
const editIcon = require('@/assets/images/parent/icon-edit.png')
const cakeIcon = require('@/assets/images/parent/icon-cake.png')
const information_circle = require('@/assets/images/parent/information_circle.png')
const plusIcon = require('@/assets/images/parent/icon-plus.png')

const AccountSettings = () => {
    const { user, setUser } = useUser();

    const [fname, setFName] = React.useState(user?.name.split(' ')[0] ?? '');
    const [lname, setLName] = React.useState(user?.name.split(' ')[1] ?? '');
    const [pnumber, setPNumber] = React.useState(user?.phonenumber ?? '');
    const children = useChildrenStore((state: any) => state.children);
    const [activeChild, setActiveChild] = React.useState(children[0]);
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('account');
    const [avatar, setAvatar] = React.useState(user?.avatar_url || null);
    const [uploading, setUploading] = React.useState(false);
    const setChildren = useChildrenStore((state: any) => state.setChildren);

    useEffect(() => {
        // Prefill parent info when user changes
        if (user) {
            setFName(user.name.split(' ')[0] ?? '');
            setLName(user.name.split(' ')[1] ?? '');
            setPNumber(user.phonenumber ?? '');
        }

        // Fetch children data from Supabase edge function and sync Zustand store
        async function fetchChildren() {
            if (!user?.id) return;
            const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
            const { data, error } = await supabase.functions.invoke('children', {
                method: 'GET',
                headers: {
                    Authorization: jwt ? `Bearer ${jwt}` : '',
                },
            });
            if (error) {
                console.error('Error fetching children:', error.message);
                return;
            }
            if (data && Array.isArray(data.data)) {
                setChildren(data.data);
                setActiveChild(data.data[0]);
            }
        }
        fetchChildren();


    }, [user]);

    function handleAddButton() {
        if (children.length < 4) {
            router.push('./addChild');
        }
    }

    function handleEditButton(kid: any) {
        const index = children.findIndex((c: any) => c.id === kid.id);
        router.push(`./editChild?index=${index}`);
    }

    const handleTabPress = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleItemProcess = (item: string) => {
        console.log("item::", item)
        console.log(`parent/profile/${item}`)
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
    // Avatar upload handler
    const handleUploadAvatar = async () => {
        // Ask for permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access media library is required!');
            return;
        }
        // Pick image
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (pickerResult.canceled || !pickerResult.assets || !pickerResult.assets[0].uri) return;
        setUploading(true);
        try {
            const uri = pickerResult.assets[0].uri;
            const fileName = `${user?.id}_${Date.now()}.jpg`;
            const response = await fetch(uri);
            const blob = await response.blob();
            // Upload to Supabase Storage
            const { data, error } = await supabase.storage.from('avatars').upload(fileName, blob, {
                cacheControl: '3600',
                upsert: true,
                contentType: 'image/jpeg',
            });
            if (error) throw error;
            // Get public URL
            const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
            const publicUrl = publicUrlData?.publicUrl;
            // Update user profile in DB
            const { error: updateError } = await supabase
                .from('users')
                .update({ avatar_url: publicUrl })
                .eq('id', user?.id);
            if (updateError) throw updateError;
            setAvatar(publicUrl);

            // Update Zustand store (if you have a setUser or similar method)
            if (user && typeof user === 'object') {
                // If you have a setUser method in your UserContext or Zustand, call it here
                setUser({ ...user, avatar_url: publicUrl });
            }
        } catch (e: any) {
            alert('Upload failed: ' + (e));
        } finally {
            setUploading(false);
        }
    };

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
                            activeTab={activeTab}
                            onTabPress={handleTabPress}
                        />

                        <DropDownMenu activeItem={activeTab} onSelect={(item) => handleItemProcess(item)} />
                        <ThemedView style={styles.tabContent} >
                            <ThemedView style={styles.container}>

                                {/* Parent Mode Header */}
                                <ThemedView style={styles.parentStyle}>
                                    <ThemedView style={styles.modeRow}>
                                        <Image
                                            source={require('@/assets/images/parent/avatar-parent-1.png')}
                                            style={styles.icon}
                                        />
                                        <ThemedText style={styles.modeText}>Parent Mode</ThemedText>
                                    </ThemedView>

                                    {/* Picture Section */}
                                    <ThemedText style={styles.sectionTitle}>Picture</ThemedText>


                                    <ThemedView style={styles.avatarWrapper}>
                                        <Image
                                            source={avatar ? { uri: avatar } : require('@/assets/images/parent/avatar-parent-2.png')}
                                            style={styles.avatar}
                                        />
                                    </ThemedView>

                                    <TouchableOpacity style={styles.uploadButton} onPress={handleUploadAvatar} disabled={uploading}>
                                        <Image source={downloadIcon} />
                                        <ThemedText style={styles.uploadButtonText}>{uploading ? ' Uploading...' : ' Upload New Image'}</ThemedText>
                                    </TouchableOpacity>

                                    <ThemedText style={styles.recommendationText}>
                                        At least 800x800px recommended{'\n'}
                                        JPG or PNG and GIF is allowed,
                                    </ThemedText>

                                    {/* General Info */}
                                    <ThemedText style={styles.sectionTitle}>General</ThemedText>

                                    <ThemedView style={styles.inputWrapper}>
                                        <ThemedText style={styles.inputLabel}>First Name</ThemedText>
                                        <TextInput
                                            placeholder="Enter First Name"
                                            value={fname}
                                            onChangeText={setFName}
                                            placeholderTextColor="rgba(5,59,74,0.20)"
                                            style={styles.input} />
                                    </ThemedView>

                                    <ThemedView style={styles.inputWrapper}>
                                        <ThemedText style={styles.inputLabel}>Last Name</ThemedText>
                                        <TextInput
                                            placeholder="Enter Last Name"
                                            value={lname}
                                            onChangeText={setLName}
                                            placeholderTextColor="rgba(5,59,74,0.20)"
                                            style={styles.input} />
                                    </ThemedView>

                                    <ThemedView style={styles.inputWrapper}>
                                        <ThemedText style={styles.inputLabel}>Phone</ThemedText>
                                        <TextInput
                                            placeholder="Enter Phone"
                                            value={pnumber}
                                            onChangeText={setPNumber}
                                            placeholderTextColor="rgba(5,59,74,0.20)"
                                            style={styles.input} />
                                    </ThemedView>
                                </ThemedView>
                                {/* All Kids */}

                                <ThemedView>
                                    <ThemedText style={styles.sectionTitle}>All Your Kids</ThemedText>
                                    <ThemedView>

                                        {children.map((kid: Kid, index: number) => (
                                            <ThemedView key={index} style={styles.kidContainer}>
                                                <ThemedView style={styles.header}>
                                                    <Image source={kid.avatar_url? {uri: kid.avatar_url }: require('@/assets/images/parent/avatar-parent-2.png')} style={styles.kid_avatar} />
                                                    <ThemedText style={styles.name}>{kid.name}</ThemedText>
                                                    <ThemedView style={styles.infoIcons}>
                                                        <Image source={cakeIcon} style={{ width: 20, height: 20 }} />
                                                        <ThemedText style={styles.age}>{kid.age}</ThemedText>
                                                    </ThemedView>
                                                    <TouchableOpacity style={styles.iconButton} onPress={() => handleEditButton(kid)}>
                                                        <Image source={editIcon} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(kid)/(dashboard)')}>
                                                        <ThemedText>View Profile</ThemedText>
                                                    </TouchableOpacity>
                                                </ThemedView>

                                                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                    <ThemedText style={[styles.inputLabel, { marginBottom: 0 }]}>Learning Mode</ThemedText>
                                                    <Image source={information_circle} style={styles.modeIcon}></Image>
                                                </ThemedView>

                                                <ThemedView style={styles.modesStyle}>
                                                    <ModeList active={kid} mode='light' selectActiveChild={setActiveChild} />
                                                </ThemedView>
                                            </ThemedView>
                                        ))}
                                        <TouchableOpacity
                                            style={[styles.addButton, children.length >= 4 && { display: 'none' }]}
                                            onPress={handleAddButton}
                                        >
                                            <Image source={plusIcon} />
                                            <ThemedText style={{ fontSize: 16, color: '#053B4A' }}>Add One More Kid</ThemedText>
                                        </TouchableOpacity>
                                    </ThemedView>
                                </ThemedView>

                            </ThemedView>
                        </ThemedView>

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
    container: {
        paddingVertical: 30,
        paddingHorizontal: 14,
        backgroundColor: 'white',
        flex: 1,
        paddingBottom: 50,
        marginBottom: 25
    },
    modeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    icon: {
        width: 45,
        height: 40,
        marginRight: 8,
    },
    modeText: {
        fontSize: 18,
        fontWeight: 700,
        color: '#053B4A',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 700,
        color: '#053B4A',
        marginBottom: 30,
    },
    avatarWrapper: {
        marginBottom: 20,
    },
    avatar: {
        width: 160,
        height: 160,
        borderRadius: 100,
        backgroundColor: '#B2E0E4',
    },
    uploadButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#053B4A',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 30,
        alignItems: 'center',
        width: 180,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#053B4A',
        fontWeight: 400,
    },
    recommendationText: {
        color: 'rgba(5, 59, 74, 0.5)',
        marginBottom: 20,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 700,
        color: '#053B4A',
        marginBottom: 10,
    },
    modeIcon: {
        width: 16,
        height: 16,
        tintColor: 'rgba(5, 59, 74, 1)'
    },
    input: {
        borderWidth: 1,
        borderColor: '#B2E0E4',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#F9FCFC',
        outlineWidth: 0
    },
    parentStyle: {
        marginBottom: 30
    },
    kidContainer: {
        marginBottom: 30,
        borderBottomColor: '#eee',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20
    },
    kid_avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#053B4A',
    },
    age: {
        fontSize: 18,
        color: 'rgba(244, 166, 114, 1)'
    },
    infoIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    modesStyle: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,

    },
    addButton: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'rgba(5, 59, 74, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 10,
        justifyContent: 'center'
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 10,
        justifyContent: 'center'
    }
});

export default AccountSettings;
