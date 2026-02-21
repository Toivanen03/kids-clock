import { Text, View, Pressable } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "../components/AnalogClockNumbers";
import { useSettings } from "../hooks/useSettings";
import { useState } from "react";
import { styles } from "../styles";
import { Sector } from "../types/types";

const AddSector = () => {
    const { sectors } = useSettings();
    const [am, setAm] = useState(true);
    const icon = am ? faSun : faMoon;

    const [amEvents, pmEvents]: [Sector[], Sector[]] = sectors.reduce<[Sector[], Sector[]]>(
        (a, s) => {
            if (s.start < 12) {
                a[0].push(s);
            } else a[1].push(s);

            return a;
        },
        [[], []]
    );

    const events = am ? amEvents : pmEvents;

  return (
    <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
            <Text style={styles.headerText}>{am ? "0.00-12.00" : "12.00-0.00"}</Text>
            <View style={{ flex: 4, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Svg width="100%" height="100%" viewBox="0 0 200 200">
                    <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="#eee" />
                        {events.map((s, i) => (
                            <Path key={i} d={getSectorPath(s.start, s.end)} fill={s.color} />
                        ))}
                    <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="none" stroke="#333" strokeWidth={3} />
                    <AnalogClockNumbers />
                </Svg>
            </View>

            <View style={{...styles.previewButton, padding: 10}}>
                <Pressable onPressIn={() => setAm(false)} onPressOut={() => setAm(true)}>
                    <FontAwesomeIcon icon={icon} size={50} color="white" />
                </Pressable>
            </View>
      </View>

        <View style={{ flex: 1, backgroundColor: '#eed', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Alalohko</Text>
        </View>
    </View>
  );
};

export default AddSector;