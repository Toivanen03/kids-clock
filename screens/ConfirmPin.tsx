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
    const newPinRef = useRef<TextInput>(null);
    const confirmNewPinRef = useRef<TextInput>(null);
    const { pin, setPin, locked, setLocked } = useSettings();
    const [newPin, setNewPin] = useState("");
    const [newPinConfirm, setNewPinConfirm] = useState("");

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

    const defaultPin = pin === 1234;

    const inputValue = defaultPin
        ? (newPin.length < 4 ? newPin : newPinConfirm)
        : code;

    const inputSetter = defaultPin
        ? (newPin.length < 4 ? setNewPin : setNewPinConfirm)
        : setCode;

    const inputRefToUse = defaultPin
        ? (newPin.length < 4 ? newPinRef : confirmNewPinRef)
        : inputRef;

    const displayText = defaultPin
        ? (newPin.length < 4 ? "Uusi PIN:" : "Vahvista uusi PIN:")
        : "Anna PIN:";

    useEffect(() => {
        if (!defaultPin) {
            if (code.length === 4 && Number(code) === pin) {
                setCode("");
                setLocked(false);
            } else if (code.length === 4) {
                triggerShake();
                setCode("");
                setLocked(true);
            }
        } else {
            if (newPin.length === 4 && newPinConfirm.length === 4 && Number(newPin) !== 1234) {
                if (newPin === newPinConfirm) {
                    setPin(Number(newPin));
                    setNewPin("");
                    setNewPinConfirm("");
                    setLocked(false);
                } else {
                    setNewPinConfirm("");
                    triggerShake();
                }
            } else if (Number(newPin) === 1234) {
                setNewPin("");
                setNewPinConfirm("");
                triggerShake();
            }
        }
    }, [code, pin, newPin, newPinConfirm, defaultPin]);

    return (
        <>
            {locked ? (
                <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                    <Text style={styles.changePINheader}>{Number(newPin) !== 1234 ? displayText : "PIN ei ole kelvollinen.\nValitse uusi."}</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => inputRefToUse.current?.focus()}
                        style={styles.pinContainer}
                    >

                        {Array(4).fill(0).map((_, i) => (
                            <View key={i} style={[ styles.box, i === inputValue.length && { borderWidth: 2, borderColor: "blue" }]}>
                                <Text style={styles.text}>
                                    {inputValue[i] ? "•" : ""}
                                </Text>
                            </View>
                        ))}

                        <TextInput
                            ref={inputRefToUse}
                            value={inputValue}
                            onChangeText={inputSetter}
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