import { useState } from "react";
import { View, Pressable } from "react-native";
import { styles } from "../styles";
import Svg, { Circle, Path } from 'react-native-svg';
import { clockLayout, getSectorPath, dailySectors, splitSectorForClock } from "../utils/constants";
import AnalogClockNumbers from "./AnalogClockNumbers";
import ClockHands from "./ClockHands";
import { settings } from "../utils/settings";
import { AnalogClockProps } from "../types/types"
import { clockHeader } from "./ClockHeader";
import type { Sector } from "../types/types";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const AnalogClock = ({ time, now, isAM }: AnalogClockProps) => {
    const [preview, setPreview] = useState(false);
    const [secondaryView, setSecondaryView] = useState(false);

    const sectorsToRender = dailySectors.flatMap(s =>
        splitSectorForClock(s, now, isAM, preview)
    );

    const [amEvents, pmEvents]: [Sector[], Sector[]] = sectorsToRender.reduce<[Sector[], Sector[]]>(
        (a, s) => {
            if (s.start < 12) {
                a[0].push(s);
            } else a[1].push(s);

            return a;
        },
        [[], []]
    );

    const tomorrowEvents: Sector[] = dailySectors.map(s => {
        if (s.start > s.end) {
            return { ...s, start: 0 };
        }

        if ((s.start >= 0 && s.start < 12) && s.end >= 12) {
            return { ...s, end: 12 };
        } else if ((s.start >= 0 && s.start < 12) && s.end < 12) {
            return s;
        }
        return null;
    }).filter((s): s is Sector => s !== null);

    const events: Sector[] = !preview
        ? (isAM ? amEvents : pmEvents)
        : (isAM ? pmEvents : tomorrowEvents);

    const icon = preview
        ? (isAM ? faSun : faMoon)
        : (isAM ? faMoon : faSun);

    return (
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

                {events.map((s, i) => (
                    <Path key={i} d={getSectorPath(s.start, s.end)} fill={s.color} />
                ))}

                <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="none" stroke="#333" strokeWidth={3} />

                {settings.analogNumbers && <AnalogClockNumbers />}
                
                {(settings.hourHand || settings.minuteHand || settings.secondHand) && (
                    <ClockHands time={time} active={!secondaryView} />
                )}
            </Svg>

            <View style={styles.previewButton}>
                <Pressable
                    onPressIn={() => { setPreview(true); setSecondaryView(true); }}
                    onPressOut={() => { setPreview(false); setSecondaryView(false) }}
                >
                    <FontAwesomeIcon icon={icon} size={50} color="white" />
                </Pressable>
            </View>
        </View>
    );
};

export default AnalogClock;