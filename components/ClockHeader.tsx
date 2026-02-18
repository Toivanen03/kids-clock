import { View, Text } from "react-native";
import { styles } from "../styles";

export const clockHeader = (text: string) => {
    return (
        <View style={styles.header}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 40 }}>{text}</Text>
        </View>
    );
};