import { Text, View, Pressable, Alert } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSun, faMoon, faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "../components/AnalogClockNumbers";
import { useSettings } from "../hooks/useSettings";
import { useState } from "react";
import { styles } from "../styles";
import { Sector, AddSectorProps } from "../types/types";
import { decimalToTime } from "../utils/timeConversion";
import SplitSectors from "../hooks/useSplitSectors";

const SectorsScreen = ({ setShowSectors }: AddSectorProps) => {
    const { sectors, setSectors } = useSettings();
    const [amEvents, pmEvents] = SplitSectors();
    const [am, setAm] = useState(true);
    const icon = am ? faSun : faMoon;
    const backIcon = faArrowLeft;
    const trashIcon = faTrash;
    const events = am ? amEvents : pmEvents;

    function formatSectorRow(property: Sector) {
        return (
            <View key={property.id} style={{...styles.sectorsRow, backgroundColor: property.color }}>
                <Text style={styles.sectorsColumn}>{property.name}</Text>
                <Text style={styles.sectorsColumn}>{decimalToTime(property.start)} - {decimalToTime(property.end)}</Text>
                <Pressable onPressIn={() => deleteSector(property)}>
                    <View style={{...styles.sectorsColumn, ...styles.trashButtonContainer}}>
                        <FontAwesomeIcon icon={trashIcon} size={20} />
                    </View>
                </Pressable>
            </View>
        )
    };

    function deleteSector(property: Sector) {
        const id = property.id;
        const name = property.name;

        Alert.alert(
            "Poista sektori",
            `Haluatko varmasti poistaa ${name}-sektorin?`,
            [
            {
                text: "Peruuta",
                style: "cancel"
            },
            {
                text: "Poista",
                style: "destructive",
                onPress: () => {
                setSectors(prev => prev.filter(s => s.id !== id));
                }
            }
            ]
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topContainer}>
                <View style={styles.addSectorTopBanner}>
                    <Pressable onPressIn={() => setShowSectors(false)}>
                        <View style={styles.backButtonContainer}>
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

                        <View style={styles.addSectorAMbuttonContainer}>
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

export default SectorsScreen;