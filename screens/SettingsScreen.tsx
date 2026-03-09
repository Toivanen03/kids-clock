import { Switch, Text, View, Pressable, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";
import { useSettings } from "../hooks/useSettings";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SectorsScreen from "./SectorsScreen";

const SettingsScreen = () => {
    const { settings, updateSetting, timeToLockdown, updatePin } = useSettings();
            
    const [delay, setDelay] = useState(timeToLockdown);
    const [showSectors, setShowSectors] = useState(false);

    const easyClock = settings.easyClock;
    const secondHand = settings.secondHand;
    const minuteHand = settings.minuteHand;
    const hourHand = settings.hourHand;

    useEffect(() => {
        if (settings.autoLock) {
            const interval = setInterval(() => {
                setDelay(delay -1)

                if (delay <= 1) {
                    updateSetting("locked", true);
                }
                    return delay - 1;
            }, 1000);

            return () => clearInterval(interval);
        };
    }, [delay, settings.autoLock]);

    useFocusEffect(
        useCallback(() => {
            return () => setShowSectors(false);
        }, [])
    );

    return (
        <>
            {!showSectors ? (
                <TouchableWithoutFeedback onPress={() => setDelay(timeToLockdown)}>
                    <SafeAreaView style={styles.settingsScreen}>
                        <View style={styles.settingsRow}>
                            <Text>Helppo kello</Text>
                            <Switch value={easyClock} onValueChange={(value) => updateSetting("easyClock", value)} />
                        </View>

                        <View style={styles.settingsRow}>
                            <Text>Sekuntiviisari</Text>
                            <Switch value={secondHand} onValueChange={(value) => updateSetting("secondHand", value)} />
                        </View>

                        <View style={styles.settingsRow}>
                            <Text style={`${easyClock}` && {color: 'gray'}}>Minuuttiviisari</Text>
                            <Switch value={minuteHand} onValueChange={(value) => updateSetting("minuteHand", value)} disabled={easyClock} />
                        </View>

                        <View style={styles.settingsRow}>
                            <Text style={`${easyClock}` && {color: 'gray'}}>Tuntiviisari</Text>
                            <Switch value={hourHand} onValueChange={(value) => updateSetting("hourHand", value)} disabled={easyClock}/>
                        </View>

                        <View style={styles.settingsRow}>
                            <Text>Numerot</Text>
                            <Switch value={settings.analogNumbers} onValueChange={(value) => updateSetting("analogNumbers", value)} />
                        </View>

                        <View style={styles.settingsRow}>
                            <Text>Näytä kuluvan tapahtuvan teksti</Text>
                            <Switch value={settings.showCurrent} onValueChange={(value) => updateSetting("showCurrent", value)} />
                        </View>

                        <View style={styles.settingsRow}>
                            <Text>Näytä seuraavan tapahtuman teksti</Text>
                            <Switch value={settings.showNext} onValueChange={(value) => updateSetting("showNext", value)} />
                        </View>

                        <View style={styles.settingsRow}>
                            <Text>Asetusten autom. lukitus (30 sek.)</Text>
                            <Switch value={settings.autoLock} onValueChange={(value) => updateSetting("autoLock", value)} />
                        </View>

                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{...styles.lockButton, backgroundColor: 'lightblue'}}>
                                <Pressable onPressIn={() => setShowSectors(true)}>
                                    <Text>Sektorit</Text>
                                </Pressable>
                            </View>

                            <View style={styles.lockButton}>
                                <Pressable onPressIn={() => updateSetting("locked", true)}>
                                    <Text>Lukitse</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{...styles.lockButton, backgroundColor: 'lightblue'}}>
                                <Pressable onPressIn={() => { updateSetting("locked", true); updatePin(0) }}>
                                    <Text>Vaihda PIN</Text>
                                </Pressable>
                            </View>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            ) : (
                <SectorsScreen setShowSectors={setShowSectors} />
            )}
        </>
    )
};


export default SettingsScreen;