import { Switch, Text, View, Pressable, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";
import { useSettings } from "../hooks/useSettings";
import { useEffect, useState } from "react";

const SettingsScreen = () => {
    const { secondHand, setSecondHand, 
            minuteHand, setMinuteHand, 
            hourHand, setHourHand, 
            numbers, setNumbers, 
            easyClock, setEasyClock, 
            setLocked, timeToLockdown } = useSettings();
            
    const [delay, setDelay] = useState(timeToLockdown);

    useEffect(() => {
        const interval = setInterval(() => {
            setDelay(delay -1)

            if (delay <= 1) {
                setLocked(true);
            }
                return delay - 1;
        }, 1000);

        return () => clearInterval(interval);
    }, [delay]);

    return (
        <TouchableWithoutFeedback onPress={() => setDelay(timeToLockdown)}>
            <SafeAreaView style={styles.settingsScreen}>
                <View style={styles.settingsRow}>
                    <Text>Helppo kello</Text>
                    <Switch value={easyClock} onValueChange={setEasyClock} />
                </View>

                <View style={styles.settingsRow}>
                    <Text>Sekuntiviisari</Text>
                    <Switch value={secondHand} onValueChange={setSecondHand} />
                </View>

                <View style={styles.settingsRow}>
                    <Text>Minuuttiviisari</Text>
                    <Switch value={minuteHand} onValueChange={setMinuteHand} disabled={easyClock} />
                </View>

                <View style={styles.settingsRow}>
                    <Text>Tuntiviisari</Text>
                    <Switch value={hourHand} onValueChange={setHourHand} disabled={easyClock}/>
                </View>

                <View style={styles.settingsRow}>
                    <Text>Numerot</Text>
                    <Switch value={numbers} onValueChange={setNumbers} />
                </View>

                <View style={styles.lockButton}>
                    <Pressable onPressIn={() => setLocked(true)}>
                        <Text>Lukitse</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default SettingsScreen;