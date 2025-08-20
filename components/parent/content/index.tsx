import { supabase } from '@/app/lib/supabase';
import { useUser } from '@/app/lib/UserContext';
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ageGroups = ["3 - 5", "5 - 9"];
const storyStyles = ["Story Time", "Play Time"];
const timeLimits = ["1 min", "2 hr", "3 hr", "4 hr"];
const information_circle = require("@/assets/images/parent/information_circle.png")

interface ContentPreferencesProps {
  setModalVisible: (visible: boolean) => void;
}


export default function ContentPreferences({
  setModalVisible,
}: ContentPreferencesProps = {
    setModalVisible: (visible: boolean) => { },
  }) {
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [limitType, setLimitType] = useState("Daily");
  const [selectedLimit, setSelectedLimit] = useState("2 hr");

  // Fetch preferences from DB on mount
  useEffect(() => {
    async function fetchPreferences() {
      const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
      const result = await fetch('https://fzmutsehqndgqwprkxrm.supabase.co/functions/v1/preferences/getOne', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt ? `Bearer ${jwt}` : '',
        }
      });
      const data = await result.json();
      console.log(data)
      setSelectedAge(data.data?.age);
      setSelectedStyle(data.data?.style);
    }

    fetchPreferences();
  }, []);


  // Get user from context
  const { user } = useUser();

  useEffect(() => {
    async function updatePreferencesEdge() {
      const jwt = supabase.auth.getSession && (await supabase.auth.getSession())?.data?.session?.access_token;
      await fetch('https://fzmutsehqndgqwprkxrm.supabase.co/functions/v1/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt ? `Bearer ${jwt}` : '',
        },
        body: JSON.stringify({
          age_group: selectedAge,
          story_style: selectedStyle
        })
      });
    }
    updatePreferencesEdge();
  }, [selectedAge, selectedStyle]);

  return (
    <View style={styles.cardContainer}>
      {/* Content Preferences */}
      <Text style={styles.sectionHeader}>Content Preferences</Text>
      <Text style={styles.label}>Content Access by Age Group</Text>
      <View style={styles.pillRow}>
        {ageGroups.map((age) => (
          <TouchableOpacity
            key={age}
            style={[styles.pill, selectedAge === age && styles.pillActive]}
            onPress={() => setSelectedAge(age)}
          >
            <Text style={[styles.pillText, selectedAge === age && styles.pillTextActive]}>{age}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ThemedView style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
        <Text style={styles.label}>Story Style</Text>
        <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => setModalVisible(true)}>
          <Image source={information_circle} style={styles.informationBtn} />
        </TouchableOpacity>
      </ThemedView>
      <View style={styles.pillRow}>
        {storyStyles.map((style) => (
          <TouchableOpacity
            key={style}
            style={[styles.pill, selectedStyle === style && styles.pillActive]}
            onPress={() => setSelectedStyle(style)}
          >
            <Text style={[styles.pillText, selectedStyle === style && styles.pillTextActive]}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Parental Controls */}
      <Text style={[styles.sectionHeader, { marginTop: 32 }]}>Parental Controls</Text>
      <Text style={styles.label}>Time Limits</Text>
      <Text style={styles.subLabel}>Monitor your child's screen time</Text>
      <View style={[styles.toggleRow, { gap: 0 }]}>
        <TouchableOpacity
          style={[styles.toggle, styles.left]}
          onPress={() => setLimitType("Daily")}
        >
          <Text style={[styles.toggleText, limitType === "Daily" && styles.toggleTextActive]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggle, styles.right]}
          onPress={() => setLimitType("Weekly")}
        >
          <Text style={[styles.toggleText, limitType === "Weekly" && styles.toggleTextActive]}>Weekly</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.pillRow}>
        {timeLimits.map((limit) => (
          <TouchableOpacity
            key={limit}
            style={[styles.pill, selectedLimit === limit && styles.pillActive]}
            onPress={() => setSelectedLimit(limit)}
          >
            <Text style={[styles.pillText, selectedLimit === limit && styles.pillTextActive]}>{limit}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 24,
    paddingBottom: 35,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 24,
    color: "rgba(5, 59, 74, 1)",
    fontWeight: '700',
    marginBottom: 30
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#053B4A',
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 14,
    color: '#053B4A',
    marginBottom: 12,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  pill: {
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pillActive: {
    backgroundColor: '#F4A672',
    borderColor: '#F4A672',
  },
  pillText: {
    color: '#053B4A',
    fontWeight: '600',
    fontSize: 16,
  },
  pillTextActive: {
    fontWeight: '700',
  },
  infoIcon: {
    fontSize: 14,
    color: '#053B4A',
    fontWeight: 'bold',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  toggle: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  left: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  right: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  toggleActive: {
    fontWeight: '700',
  },
  toggleText: {
    color: '#053B4A',
    fontWeight: '400',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#053B4A',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  informationBtn: {
    width: 18,
    height: 18,
    tintColor: '#053B4A'
  },
});
