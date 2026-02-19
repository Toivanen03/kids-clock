import { Text } from "react-native";
import { styles } from "../styles";

export const clockHeader = (text: string) => {
    return (
        <Text style={styles.headerText}>{text}</Text>
    );
};