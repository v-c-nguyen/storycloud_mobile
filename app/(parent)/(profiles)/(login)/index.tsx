import { supabase } from '@/app/lib/supabase';
import BottomNavBar from '@/components/BottomNavBar';
import DropDownMenu from '@/components/DropDownMenu';
import Header from '@/components/Header';
import { TabBar } from '@/components/TabBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


const refeshIcon = require('@/assets/images/parent/icon-refresh.png');
const eyeIcon = require('@/assets/images/parent/icon-eye.png');
const passIcon = require('@/assets/images/parent/icon-passwordItem.png');
const starIcon = require('@/assets/images/parent/star.png');

export default function LoginCredential() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Passwords should not be fetched or displayed
  // Fetch user email from Supabase on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setEmail(data.user.email);
      }
    };
    fetchUser();
  }, []);
  const [showStars, setShowStars] = useState(true);
  const [activeTab, setActiveTab] = React.useState('login');
  const [activeItem, setActiveItem] = React.useState('account');

  const handleTabPress = (tabId: string) => {
    console.log("tabId:", tabId)
    setActiveItem(tabId);
    if (tabId === 'account') handleItemProcess('login');
    else if (tabId === 'content') router.navigate("/(parent)/(profiles)/(content)");
  };

  const handleChangePassword = async () => {
    if (!password || password === '') {
      Alert.alert('Please enter a new password.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      Alert.alert('Failed to update password: ' + error.message);
    } else {
      Alert.alert('Password updated successfully!');
      setPassword('');
    }
  };

  const renderStars = () => {
    return password.split('').map((_, index) => (
      <Image key={index} source={starIcon} ></Image>
    ));
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
            <ThemedView style={styles.tabContent} >

              {/* Main Content */}

              <ThemedView style={styles.container}>
                {/* Email Section */}
                <ThemedText style={styles.label}>Email</ThemedText>
                <ThemedText style={styles.subLabel}>Email Address</ThemedText>
                <TextInput
                  value={email}
                  editable={false}
                  style={styles.input}
                />

                {/* Password Section */}
                <ThemedText style={[styles.label, { marginTop: 20 }]}>Password</ThemedText>
                <ThemedText style={styles.subLabel}>Password</ThemedText>
                <ThemedView>
                  <ThemedView style={styles.pwd_container}>
                    <ThemedView style={styles.starRow}>
                      {showStars ? renderStars() : <ThemedText style={styles.text}>{password}</ThemedText>}
                    </ThemedView>
                    <TextInput
                      style={styles.pwd_input}
                      value={password}
                      onChangeText={setPassword}
                      editable={true}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity onPress={() => setShowStars(!showStars)}>
                      <Image
                        source={require("@/assets/images/auth/icon-eye-close.png")}
                        style={{ width: 24, height: 24, tintColor: 'rgb(2, 38, 48)' }}
                      />
                    </TouchableOpacity>
                  </ThemedView>
                </ThemedView>

                {/* Change Password Button */}
                <TouchableOpacity onPress={handleChangePassword}>
                  <ThemedView style={styles.button} >
                    <Image source={refeshIcon}></Image>
                    <ThemedText style={styles.buttonText}>Change Password</ThemedText>
                  </ThemedView>
                </TouchableOpacity>
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
}

const styles = StyleSheet.create({
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
    width: '100%',
    height: '100%',
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -100,
  },
  imgCloudNear: {
    width: '100%',
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
  mainSettingStyle: {
    display: 'flex',
    flexDirection: 'column'
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
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(122, 193, 198, 0.2)',
    borderRadius: 20,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 30,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 700,
    color: 'rgba(5, 59, 74, 1)',
    marginBottom: 30,
  },
  subLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: 'rgba(5, 59, 74, 1)',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(122, 193, 198, 0.5)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: 400,
    color: 'rgba(5, 59, 74, 1)',
    outlineWidth: 0
  },
  button: {
    marginTop: 30,
    backgroundColor: '#e6f1f6',
    borderRadius: 50,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b2cbd6',
  },
  buttonText: {
    fontSize: 16,
    color: 'rgba(5, 59, 74, 1)',
    fontWeight: '400',
  },

  starRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 2,
    maxWidth: 340,
    overflow: 'scroll'
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  pwd_container: {
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#d0e2e8',
    fontFamily: "Sitara",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pwd_input: {
    position: 'absolute',
    width: '100%',
    opacity: 0,
  },
  star: {
    fontSize: 16,
    color: 'rgba(5, 59, 74, 1)',
  },
  settingHeader: {
    color: 'rgba(5, 59, 74, 1)',
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center'
  },
});
