import { Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";
import { useSettings } from "../hooks/useSettings";

const SettingsScreen = () => {
    const { secondHand, setSecondHand, minuteHand, setMinuteHand, hourHand, setHourHand, numbers, setNumbers } = useSettings();

    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.settingsRow}>
                <Text>Sekuntiviisari</Text>
                <Switch value={secondHand} onValueChange={setSecondHand} />
            </View>

            <View style={styles.settingsRow}>
                <Text>Minuuttiviisari</Text>
                <Switch value={minuteHand} onValueChange={setMinuteHand} />
            </View>

            <View style={styles.settingsRow}>
                <Text>Tuntiviisari</Text>
                <Switch value={hourHand} onValueChange={setHourHand} />
            </View>

            <View style={styles.settingsRow}>
                <Text>Numerot</Text>
                <Switch value={numbers} onValueChange={setNumbers} />
            </View>
        </SafeAreaView>
    );
}

export default SettingsScreen;