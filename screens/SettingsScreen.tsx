import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";

const SettingsScreen = () => {
    return (
        <SafeAreaView style={styles.settingsScreen}>
            <Text>Asetukset</Text>
        </SafeAreaView>
    );
}

export default SettingsScreen;