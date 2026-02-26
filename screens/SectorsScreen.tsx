import { Text, View, Pressable, Alert } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSun, faMoon, faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "../components/AnalogClockNumbers";
import { useSettings } from "../hooks/useSettings";
import { useState } from "react";
import { styles } from "../styles";
import { Sector, AddSectorProps, weekdaysOrdered } from "../types/types";
import { decimalToTime } from "../utils/timeConversion";
import SplitSectors from "../hooks/useSplitSectors";
import { useClock } from "../hooks/useClock";

const SectorsScreen = ({ setShowSectors }: AddSectorProps) => {
    const { setSectors } = useSettings();
    const { currentWeekday } = useClock({ test: false, speed: 0 });
    const [selectedDay, setSelectedDay] = useState(currentWeekday);
    const [selectedSector, setSelectedSector] = useState<Sector | undefined>(undefined);
    const [amEvents, pmEvents] = SplitSectors(selectedDay);
    const [am, setAm] = useState(true);
    const icon = am ? faSun : faMoon;
    const backIcon = faArrowLeft;
    const trashIcon = faTrash;
    const events = am ? amEvents : pmEvents;

    const buttonText = {
        sun: 'SU',
        mon: 'MA',
        tue: 'TI',
        wed: 'KE',
        thu: 'TO',
        fri: 'PE',
        sat: 'LA'
    };

    function formatSectorRow(property: Sector, index: number) {
        const startTime = property.activeDays.flatMap(d => d.start);
        const endTime = property.activeDays.flatMap(d => d.end);

        return (
            <View key={index}>
                <View style={styles.sectorsRow}>
                    <Pressable
                        onPressIn={() => setSelectedSector(property)}
                        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
                    >
                        <View style={styles.colorColumn}>
                            <View style={[styles.colorBox, { backgroundColor: property.color }]} />
                        </View>

                        <View style={styles.nameColumn}>
                            <Text style={styles.sectorPreviewText}>{property.name}</Text>
                        </View>

                        <View style={styles.timeColumn}>
                            <Text style={styles.sectorPreviewText}>
                                {decimalToTime(startTime[0])} - {decimalToTime(endTime[0])}
                            </Text>
                        </View>

                        <Pressable
                            onPressIn={() => deleteSector(property)}
                            style={styles.trashColumn}
                        >
                            <FontAwesomeIcon icon={trashIcon} size={20} color="red" />
                        </Pressable>
                    </Pressable>
                </View>
                
                {selectedSector && 
                    <Text>
                        {selectedSector.id === property.id && 
                            "VALITTU SEKTORI"
                        }
                    </Text>}
            </View>
        );
    }

    

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
    };

    function getWeekdayButtons() {
        return weekdaysOrdered.map(d => {
            const isActive = selectedDay.includes(d);
            const isToday = currentWeekday === d;
            return (
                <View key={d} style={styles.weekdayButtons}>
                    <Pressable onPressIn={() => setSelectedDay(d)}>
                        <Text style={[ styles.weekDayButtonText, isActive && styles.activeWeekDayButtonText, isToday && styles.todayButtonText ]}>
                            {buttonText[d]}
                        </Text>
                    </Pressable>
                </View>
            )}
        )
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
                        
                        <Svg width="100%" height="90%" viewBox="0 0 200 200">
                            <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="#eee" />

                            {events.map((s, i) => 
                                s.activeDays.map((d, j) => 
                                    d ? (
                                    <Path
                                        key={`${i}-${j}`}
                                        d={getSectorPath(d.start, d.end)}
                                        fill={s.color}
                                    />
                                    ) : null
                                )
                            )}

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

                        <View style={{ flexDirection: 'row' }}>{getWeekdayButtons()}</View>
                    </View>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View>
                    {events.map((s, i) => formatSectorRow(s, i))}
                </View>
            </View>
        </View>
    );
};

export default SectorsScreen;