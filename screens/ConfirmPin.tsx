import { View, TextInput, TouchableOpacity, Text, Alert, Pressable } from "react-native";
import { useSettings } from "../hooks/useSettings";
import { Animated } from "react-native";
import { styles } from "../styles";
import SettingsScreen from "./SettingsScreen";
import { useEffect, useRef, useState } from "react";
import * as Haptics from 'expo-haptics';

const ConfirmPin = () => {
    const [showPinReset, setShowPinReset] = useState(false);
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState([0, 0, 0])
    const [answerCount, setAnswerCount] = useState(0);
    const [code, setCode] = useState("");
    const inputRef = useRef<TextInput>(null);
    const newPinRef = useRef<TextInput>(null);
    const answerRef = useRef<TextInput>(null);
    const confirmNewPinRef = useRef<TextInput>(null);
    const { settings, updateSetting, pin, updatePin, resetPin } = useSettings();
    const [newPin, setNewPin] = useState("");
    const [newPinConfirm, setNewPinConfirm] = useState("");

    const generateQuestion = () => {
        let question: number[] = []; 
        do {
            question = Array.from({ length: 3 }, () => Math.floor(Math.random() * 90) + 10);
        } while (question.reduce((a, b) => a + b, 0) < 100);
        return question;
    };

    useEffect(() => {
        setQuestion(generateQuestion());
    }, []);

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

    const defaultPin = pin === 0;

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
                updateSetting("locked", false);
            } else if (code.length === 4) {
                triggerShake();
                setCode("");
                updateSetting("locked", true);
            }
        } else {
            if (newPin.length === 4 && newPinConfirm.length === 4) {
                if (newPin === newPinConfirm) {
                    updatePin(Number(newPin));
                    setNewPin("");
                    setNewPinConfirm("");
                    updateSetting("locked", false);
                } else {
                    setNewPinConfirm("");
                    triggerShake();
                }
            }
        }
    }, [code, pin, newPin, newPinConfirm, defaultPin]);

    useEffect(() => {
        if (showPinReset) {
            const result = resetPin(question, Number(answer)).result;
            const answerText = resetPin(question, Number(answer)).answerText;

            if (answerCount >= 5) {
                setAnswer("");
                setAnswerCount(0);
                setShowPinReset(false);
                triggerShake();
                Alert.alert("Liian monta yritystä.");
                setQuestion(generateQuestion());
            }

            if (answer.length === 3 && Number(answer) !== 0) {
                setAnswerCount(answerCount + 1);

                if (result) {
                    setAnswer("");
                    updatePin(0);
                    setShowPinReset(false);
                    setQuestion(generateQuestion());
                } else {
                    setAnswer("");
                    triggerShake();
                }

                if (answerCount < 5) Alert.alert(answerText);
            }
        }
    }, [showPinReset, answer, answerCount]);

    return (
        <>
            {settings.locked ? (
                <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                    {!showPinReset ? (
                        <>
                            <Text style={styles.changePINheader}>{displayText}</Text>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => inputRefToUse.current?.focus()}
                                delayLongPress={2000}
                                onLongPress={() => setShowPinReset(true)}
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
                        </>
                    ) : (
                        <View style={styles.topContainer}>
                            <Text style={styles.changePINheader}>Kuinka paljon on</Text>

                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                {question.map((n, i) => 
                                    <Text key={i} style={{...styles.changePINheader, color: 'red'}}>{n}{i < question.length - 1 ? " + " : " ? "}</Text>
                                )}
                            </View>

                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => answerRef.current?.focus()}
                                style={styles.pinContainer}
                            >

                                {Array(3).fill(0).map((_, i) => (
                                    <View key={i} style={[ styles.box, i === answer.length && { borderWidth: 2, borderColor: "blue" }]}>
                                        <Text style={styles.text}>
                                            {answer[i] ? answer[i] : "?"}
                                        </Text>
                                    </View>
                                ))}

                                <TextInput
                                    ref={answerRef}
                                    value={answer}
                                    onChangeText={setAnswer}
                                    keyboardType="number-pad"
                                    maxLength={3}
                                    style={styles.hiddenInput}
                                    secureTextEntry={false}
                                />
                            </TouchableOpacity>

                            <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                <Pressable 
                                    style={{...styles.lockButton, alignSelf: 'flex-end', backgroundColor: 'lightblue'}}
                                    onPressIn={() => {
                                        setQuestion(generateQuestion())
                                        setShowPinReset(false)
                                    }}
                                    >
                                    <Text style={{...styles.weekDayButtonText, color: 'black'}}>Poistu</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </Animated.View>
            ) : (
                <SettingsScreen />
            )}
        </>
    );
};

export default ConfirmPin;