import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useSettings } from "../hooks/useSettings";
import { Animated } from "react-native";
import { styles } from "../styles";
import SettingsScreen from "./SettingsScreen";
import { useEffect, useRef, useState } from "react";
import * as Haptics from 'expo-haptics';

const ConfirmPin = () => {
    const [code, setCode] = useState("");
    const inputRef = useRef<TextInput>(null);
    const { pin, locked, setLocked } = useSettings();

    const shakeAnim = useRef(new Animated.Value(0)).current;

    const triggerShake = () => {
        Haptics.selectionAsync().catch(() => {});

        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    useEffect(() => {
        if (code.length === 4 && Number(code) === pin) {
            setCode("");
            setLocked(false);
        } else if (code.length === 4) {
            triggerShake();
            setCode("");
            setLocked(true);
        };
    }, [code, pin]);

    return (
        <>
            {locked ? (
                <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => inputRef.current?.focus()}
                        style={styles.pinContainer}
                    >

                        {Array(4).fill(0).map((_, i) => (
                            <View key={i} style={[ styles.box, i === code.length && { borderWidth: 2, borderColor: "blue" }]}>
                                <Text style={styles.text}>
                                    {code[i] ? "•" : ""}
                                </Text>
                            </View>
                        ))}

                        <TextInput
                            ref={inputRef}
                            value={code}
                            onChangeText={setCode}
                            keyboardType="number-pad"
                            maxLength={4}
                            style={styles.hiddenInput}
                            secureTextEntry={true}
                        />
                    </TouchableOpacity>
                </Animated.View>
            ) : (
                <SettingsScreen />
            )}
        </>
    );
};

export default ConfirmPin;