
import { modesData } from "@/data/parent/dashboardData";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


const modes = modesData;
interface ModeListProps {
    mode?: string, 
    active: any,
    selectActiveChild?: any
}
export function ModeList({mode="dark", active, selectActiveChild}: ModeListProps) {

    const handleModeSelect = (newMode: any) => {
        const newChild = { ...active, ...{ mode: newMode.id } }
        selectActiveChild(newChild)
      };
    return (
        <>
            {modes.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => handleModeSelect(item)}>
                    <ThemedView style={[styles.modeItemStyle, mode=='light'&& styles.lightIS, item.id == active?.mode && styles.activeMIS]}>
                        <ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <ThemedView style={styles.modeAvatarStyle}>
                                <Image 
                                    source={item.avatar} 
                                    style={[styles.modeAvatariconStyle, mode=="light" && styles.lightMAIS,item.id == active?.mode && styles.activeMAIS]} 
                                />
                                <Image 
                                    source={require("@/assets/images/parent/dashboard/white-circle.png")} 
                                    style={[styles.modeAvatarCircleStyle, item.id == active?.mode && styles.activeMACS]} 
                                />
                            </ThemedView>
                            <ThemedText style={[styles.modeName, (item.id == active?.mode || mode == "light") && styles.activeModeName]}>{item.name}</ThemedText>
                            <ThemedText style={[styles.modeName, (item.id == active?.mode || mode == "light") && styles.activeModeName, {fontWeight: 400}]}>Mode</ThemedText>
                        </ThemedView>
                        {item.id == active?.mode ?
                            <Image source={require("@/assets/images/parent/dashboard/selected.png")} />
                            :
                            <Image source={require("@/assets/images/parent/dashboard/selectable.png")} />
                        }
                    </ThemedView>
                </TouchableOpacity >
            ))}
        </>
    )
}



const styles = StyleSheet.create({
    modeItemStyle: {
        height: 72,
        paddingHorizontal: 26,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(5, 59, 74, 0)',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    lightIS: {
        borderColor: 'rgba(5, 59, 74, 0.2)'
    },
    modeAvatarStyle: {
        position: 'relative',
        width: 60,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    modeAvatarCircleStyle: {
        position: 'absolute',
        right: 0,
        tintColor: 'rgba(244, 166, 114, 1)'
    },
    modeAvatariconStyle: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
        tintColor: 'white'
    },
    lightMAIS: {
        tintColor: 'rgba(5, 59, 74, 1)'
    },
    modeName: { color: "#ffffff", fontSize: 18, fontWeight: 700 },
    activeModeName: { color: "rgba(5, 59, 74, 1)", fontSize: 18, fontWeight: 700 },
    activeMIS: {
        height: 72,
        paddingHorizontal: 26,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 166, 114, 1)',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    activeMACS: {
        position: 'absolute',
        right: 0,
        tintColor: 'white'
    },
    activeMAIS: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
        tintColor: 'rgba(5, 59, 74, 1)'
    }
});