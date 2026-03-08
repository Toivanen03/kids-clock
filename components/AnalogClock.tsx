import { useState } from "react";
import { View, Pressable } from "react-native";
import { styles } from "../styles";
import Svg, { Circle, Path } from 'react-native-svg';
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "./AnalogClockNumbers";
import ClockHands from "./ClockHands";
import { AnalogClockProps } from "../types/types"
import { clockHeader } from "./ClockHeader";
import type { Sector } from "../types/types";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useSettings } from "../hooks/useSettings";
import { useSectors } from "../hooks/useSectors";
import EasyClock from "./EasyClock";
import useSplitSectors from "../hooks/useSplitSectors";
import EventDisplay from "./EventDisplay";

const AnalogClock = ({ time, now, isAM, currentWeekday }: AnalogClockProps) => {
    const [preview, setPreview] = useState(false);
    const [secondaryView, setSecondaryView] = useState(false);
    const { settings } = useSettings();
    const { sectors } = useSectors();
    const dailySectors: Sector[] = sectors;

    const [amEvents, pmEvents] = useSplitSectors(currentWeekday);

    const tomorrowEvents: Sector[] = dailySectors.map(s => {
        const newActiveDays = s.activeDays
            .map(d => {
            let newStart = d.start;
            let newEnd = d.end;

            if (d.start > d.end) {
                newStart = 0;
            }

            if (d.start < 12 && d.end >= 12) {
                newEnd = 12;
            }

            return { ...d, start: newStart, end: newEnd };
            })
            .filter(d => d.start !== d.end);
        return { ...s, activeDays: newActiveDays };
    }).filter(s => s.activeDays.length > 0);

    const events: Sector[] = !preview
        ? (isAM ? amEvents : pmEvents)
        : (isAM ? pmEvents : tomorrowEvents);

    const icon = preview
        ? (isAM ? faSun : faMoon)
        : (isAM ? faMoon : faSun);

    return (
        <>
            {!settings.easyClock ? (
                <View style={styles.container}>
                    <View style={styles.header}>
                        {clockHeader(!secondaryView ? (
                            `${isAM ? "Aamu" : "Ilta"} ${time.hours}:${time.minutes
                                .toString()
                                .padStart(2, "0")}`
                            ) : (
                                isAM && preview ? "Ilta" : "Huominen"
                            ))}
                    </View>
                    
                    <Svg height="80%" width="95%" viewBox="0 0 200 200">
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

                        {settings.analogNumbers && <AnalogClockNumbers />}
                        
                        {(settings.hourHand || settings.minuteHand || settings.secondHand) && (
                            <ClockHands time={time} active={!secondaryView} />
                        )}
                    </Svg>

                    {!preview && <EventDisplay time={time} events={events} easyClock={false} />}

                    <View style={styles.previewButton}>
                        <Pressable
                            onPressIn={() => { setPreview(true); setSecondaryView(true); }}
                            onPressOut={() => { setPreview(false); setSecondaryView(false) }}
                        >
                            <FontAwesomeIcon icon={icon} size={50} color="#ffffff" />
                        </Pressable>
                    </View>
                </View>
            ) : (
                <EasyClock time={time} now={now} isAM={isAM} events={events} currentWeekday={currentWeekday} />
            )}
        </>
    );
};

export default AnalogClock;