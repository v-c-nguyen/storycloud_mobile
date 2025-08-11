import { Image } from "expo-image";
import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const items = [
    {
        key: 'account',
        label: 'General Details',
        icon: require('@/assets/images/parent/icon-profile.png')
    },
    {
        key: 'login',
        label: 'Login Credentials',
        icon: require('@/assets/images/parent/icon-login.png')
    },
    {
        key: 'subscription',
        label: 'Subscription Information',
        icon: require('@/assets/images/parent/icon-subscription.png')
    },
    {
        key: 'billing',
        label: 'Billing Information',
        icon: require('@/assets/images/parent/icon-billing.png')
    },
];

const chevronUp = require('@/assets/images/parent/chevron-up.png');
const chevronDown = require('@/assets/images/parent/chevron-down.png');

interface DropdownMenuProps {
    activeItem: string,
    onSelect: (item: string) => void;
}

export default function DropDownMenu({ activeItem, onSelect }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(activeItem);
  
    const selectedItem = items.find(i => i.key === selected)!;
    const otherItems = items.filter(i => i.key !== selected);
  
    const handleSelect = (key: string) => {
      setSelected(key);
      setIsOpen(false);
      onSelect(key);
    };
  
    return (
      <ThemedView>
        <ThemedView style={styles.card}>
          {/* Header (selected item) */}
          <Pressable
            style={styles.headerRow}
            onPress={() => setIsOpen(prev => !prev)}
            accessibilityRole="button"
            accessibilityLabel={`${selectedItem?.label} dropdown, ${isOpen ? 'expanded' : 'collapsed'}`}
            accessibilityState={{ expanded: isOpen }}
          >
            <Image source={selectedItem?.icon} style={styles.headerIcon} />
            <ThemedText style={styles.headerText}>{selectedItem?.label}</ThemedText>
            <Image
              source={isOpen ? chevronUp : chevronDown}
              style={styles.trailingIcon}
            />
          </Pressable>
  
          {/* Dropdown options */}
          {isOpen && (
            <ThemedView style={styles.body}>
              {otherItems.map(item => (
                <Pressable
                  key={item.key}
                  style={styles.item}
                  onPress={() => handleSelect(item.key as any)}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${item.label}`}
                >
                  <Image source={item.icon} style={styles.itemIcon} />
                  <ThemedText style={styles.itemText}>{item.label}</ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          )}
        </ThemedView>
        <ThemedView>
        </ThemedView>
      </ThemedView>
    );
  }
  
  // ...styles remain the same
  const styles = StyleSheet.create({
    card: {
      paddingHorizontal: 16,
      paddingTop: 12,
      margin: 16,
      display: 'flex',
      flexDirection: 'column',
    },
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 18,
      fontWeight: '700',
      color: 'rgba(5, 59, 74, 1)',
    },
    headerIcon: {
      width: 16,
      height: 16,
      marginRight: 8,
    },
    trailingIcon: {
      marginLeft: 8,
    },
    body: {
      marginTop: 12,
      paddingBottom: 12,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    },
    itemIcon: {
      width: 16,
      height: 16,
      tintColor: 'rgba(5, 59, 74, 1)',
      marginRight: 8,
    },
    itemText: {
      fontSize: 18,
      color: 'rgba(5, 59, 74, 1)',
    },
  });
  