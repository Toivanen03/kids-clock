import { View, Text } from "react-native";
import { styles } from "../styles";

export const clockHeader = (text: string) => {
    return (
        <View style={{ backgroundColor: "#ccc", alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 40 }}>{text}</Text>
        </View>
    );
};