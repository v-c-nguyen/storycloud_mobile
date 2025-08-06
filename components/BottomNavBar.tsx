import { RelativePathString, useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { childHooterData, HooterItem, parentHooterData } from "../data/layoutData";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


export default function BottomNavBar({
  role = "kid",
  active = "Dashboard",
  subActive = "Library",
  image = false,
  theme = 'dark',
  flag = false
}) {
  const router = useRouter();

  // Helper for route path
  const getRoute = (item: HooterItem, sub?: HooterItem) => {
    const rolePrefix = `/(${role})`;
    if (role === "parent") {
      switch (item.name) {
        case "Dashboard":
          return `${rolePrefix}/(dashboard)`;
        case "Learning":
          if (sub) return `${rolePrefix}/(learning)/(${sub.name.toLowerCase()})`;
          return `${rolePrefix}/(learning)/(library)`;
        case "Listen":
          return `${rolePrefix}/(listen)`;
        case "Profile":
          return `${rolePrefix}/(profiles)/(account)`;
      }
    } else {
      switch (item.name) {
        case "Dashboard":
          return `${rolePrefix}/(dashboard)`;
        case "Explore":
          return `${rolePrefix}/(explore)`;
        case "Favourites":
          return `${rolePrefix}/(favourite)`;
        case "Listen":
          return `${rolePrefix}/(listen)`;
      }
    }
    return "/";
  };


  return (
    <ThemedView style={styles.bottomNavContainer}>
      {/* Cloud Effects */}
      {image &&
        <Image
          source={require("@/assets/images/kid/cloud-group-bottom.png")}
          style={[styles.cloudGroup, theme == 'darkImage' && { tintColor: 'rgba(5, 59, 74, 1)' }]}
        >
        </Image>
      }

      {
        role == 'parent' && parentHooterData?.map((item, index) => (
          (item.items?.length ?? 0) > 0 && active == item.name && (
            <ThemedView key={index} style={[
              styles.bottomNavBar,
              { height: 65 },
              theme == 'light' && { backgroundColor: 'white' },
              image == true && { backgroundColor: 'rgba(0,0,0,0)' }
            ]}>
              {
                item.items?.map((subItem, subIx) => (
                  <NavSubItem
                    key={subItem.name}
                    icon={subItem.icon}
                    label={subItem.name}
                    active={subActive === subItem.name}
                    theme={theme}
                    onPress={() => router.push(getRoute(item, subItem) as RelativePathString)}
                  />
                ))
              }
            </ThemedView>
          )
        ))
      }

      {/* Nav Items */}
      <ThemedView style={[
        styles.bottomNavBar,
        flag && { justifyContent: 'center' },
        theme == 'light' && { backgroundColor: 'white' },
        image == true && { backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }
      ]}>
        {
          role == "kid" && childHooterData?.map((item, index) => (
            <NavItem
              key={index}
              icon={<Image
                source={item.icon}
                style={[
                  { width: 24, height: 24 },
                  { tintColor: (active == item.name) ? 'rgba(5, 59, 74, 1)' : 'rgba(122, 193, 198, 1)' },
                  theme == 'darkImage' && { tintColor: 'white' },
                  theme == 'light' && { tintColor: 'rgba(5, 59, 74, 1)' }
                ]} />}
              role={role}
              label={item.name}
              active={active == item.name}
              unvisibleFlag={flag}
              theme={theme}
              onPress={() => router.push(getRoute(item) as RelativePathString)}
            />
          ))
        }
        {
          role == "parent" && parentHooterData?.map((item, index) => (
            <NavItem
              key={index}
              icon={<Image
                source={item.icon}
                style={[
                  { width: 24, height: 24 },
                  { tintColor: (active == item.name) ? 'rgba(5, 59, 74, 1)' : 'rgba(122, 193, 198, 1)' },
                  theme == 'darkImage' && { tintColor: 'white' },
                  theme == 'light' && { tintColor: 'rgba(5, 59, 74, 1)' }
                ]} />}
              role={role}
              label={item.name}
              active={active == item.name}
              items={item.items}
              unvisibleFlag={flag}
              theme={theme}
              onPress={() => router.push(getRoute(item) as RelativePathString)}
            />
          ))
        }
      </ThemedView>
    </ThemedView>
  );
}

interface NavItem {
  icon: any,
  role: string,
  label: string,
  active: boolean,
  theme: string,
  items?: HooterItem[],
  onPress: () => void,
  unvisibleFlag: boolean
}

function NavItem({ icon, role, label, active, theme, items = [], onPress, unvisibleFlag = false }: NavItem) {
  return (
    <TouchableOpacity
      style={[styles.navItem, active && styles.navItemActive]}
      onPress={onPress}
    >
      <ThemedView
        style={{ position: "relative", height: 24 }}
      >
        <ThemedView
          style={[styles.activeCircle, !active && { display: "none" }]}
        ></ThemedView>
        {icon}
      </ThemedView>
      <ThemedText
        style={[
          styles.navLabel,
          theme == 'darkImage' && { color: 'white' },
          theme == 'light' && { color: 'rgba(5, 59, 74, 1)' }]}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

// NavSubItem: sub-tab for parent "Learning"
interface NavSubItemProps {
  icon: any;
  label: string;
  active: boolean;
  theme?: string;
  onPress: () => void;
}

function NavSubItem({ icon, label, active, theme, onPress }: NavSubItemProps) {
  return (
    <TouchableOpacity
      style={[styles.subItem, active && styles.subItemActive]}
      onPress={onPress}
    >
      <ThemedView
        style={{ position: "relative", height: 24 }}
      >
        <ThemedView
          style={[styles.activeCircle,  !active && { display: "none" }]}
        ></ThemedView>
        <Image
          source={icon}
          style={[
            { width: 18, height: 18, margin: 'auto' },
            { tintColor: active ? 'rgba(5, 59, 74, 1)' : 'rgba(122, 193, 198, 1)' },
            theme == 'darkImage' && { tintColor: 'white' },
            theme == 'light' && { tintColor: 'rgba(5, 59, 74, 1)' }
          ]} />
      </ThemedView>
      <ThemedText
        style={[
          styles.navLabel,
          theme == 'light' && { color: 'rgba(5, 59, 74, 1)' },
          theme == 'darkImage' && { color: 'white' }
        ]}
      >{label}</ThemedText>
      {label != 'Focus' && <ThemedText style={styles.navLabel}>  |</ThemedText>}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  bottomNavContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 178,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  // Cloud shapes (approximate Figma positions/sizes)
  cloudGroup: {
    position: "absolute",
    width: "100%",
    height: 243,
    left: 0,
    top: -64,
    zIndex: 10
  },
  bottomNavBar: {
    backgroundColor: 'rgba(5, 59, 74, 1)',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 115,
    borderWidth: 1,
    borderColor: 'rgba(122, 193, 198, 0.2)',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 10,
  },
  navItem: {
    width: 85,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  navItemActive: {
    borderWidth: 1,
    borderColor: "rgba(122, 193, 198, 0.2)",
  },
  subItemActive: {
    borderColor: "rgba(122, 193, 198, 0.2)",
  },
  activeCircle: {
    position: "absolute",
    width: 30,
    height: 30,
    bottom: -2,
    left: 0,
    transform: 'translate(-10%, 0)',
    backgroundColor: "#F4A672",
    borderRadius: 14,
  },
  navLabel: {
    color: "rgba(122, 193, 198, 1)",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 12,
    textAlign: "center",
  },
  activeLabel: {
    tintColor: 'rgba(5, 59, 74, 1)'
  },

  submenu: {
    height: 65,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  subItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }
});
