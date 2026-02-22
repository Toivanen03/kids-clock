import { Text, View, Pressable } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSun, faMoon, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "../components/AnalogClockNumbers";
import { useSettings } from "../hooks/useSettings";
import { useState } from "react";
import { styles } from "../styles";
import { Sector, AddSectorProps } from "../types/types";

const AddSector = ({ setShowSectors }: AddSectorProps) => {
    const { sectors } = useSettings();
    const [am, setAm] = useState(true);
    const icon = am ? faSun : faMoon;
    const backIcon = faArrowLeft;

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

    function formatSectorRow(property: Sector) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{flexDirection: 'column'}}>{property.color}</Text>
                <Text style={{flexDirection: 'column'}}>{property.name}</Text>
                <Text style={{flexDirection: 'column'}}>{property.start}</Text>
                <Text style={{flexDirection: 'column'}}>{property.end}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topContainer}>
                <View style={styles.addSectorTopBanner}>
                    <Pressable onPressIn={() => setShowSectors(false)}>
                        <View style={styles.backButtonContainer}
                    >
                        <FontAwesomeIcon icon={backIcon} size={30} color="black" />

                        </View>
                    </Pressable>

                    <Text style={styles.headerText}>{am ? "0.00-12.00" : "12.00-0.00"}</Text>

                    <View style={{ width: 36 }} />
                </View>

                <View style={styles.addSectorClockContainer}>
                    <View style={{ aspectRatio: 1 }}>
                        
                        <Svg width="100%" height="100%" viewBox="0 0 200 200">
                            <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="#eee" />
                                {events.map((s, i) => (
                                    <Path key={i} d={getSectorPath(s.start, s.end)} fill={s.color} />
                                ))}
                            <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="none" stroke="#333" strokeWidth={3} />

                            <AnalogClockNumbers />
                        </Svg>

                        <View style={styles.addSectorAMbuttonContainer}
                        >
                            <Pressable onPressIn={() => setAm(false)} onPressOut={() => setAm(true)}>
                                <View style={{ ...styles.previewButton, padding: 10 }}>
                                    <FontAwesomeIcon icon={icon} size={50} color="white" />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View>
                    {sectors.map(s => formatSectorRow(s))}
                </View>
            </View>
        </View>
    );
};

export default AddSector;