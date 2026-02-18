import { FC, useState } from "react";
import { View, Pressable } from "react-native";
import { styles } from "../styles";
import Svg, { Circle, Path } from 'react-native-svg';
import { clockLayout, getSectorPath, dailySectors } from "../utils/constants";
import AnalogClockNumbers from "./AnalogClockNumbers";
import ClockHands from "./ClockHands";
import { settings } from "../utils/settings";
import { AnalogClockProps } from "../types/types"
import { clockHeader } from "./ClockHeader";
import type { Sector } from "../types/types";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const AnalogClock: FC<AnalogClockProps> = ({ time, sectorsToRender, isAM }) => {
    const [preview, setPreview] = useState(false);
    const [secondaryView, setSecondaryView] = useState(false);
    const [amEvents, pmEvents]: Array<Sector[]> = sectorsToRender.reduce<[Sector[], Sector[]]>(
        (a, s) => {
            if (s.start < 12) {
                a[0].push(s);
            } else a[1].push(s);

            return a;
        },
        [[], []]
    );

    const tomorrowEvents: Sector[] = dailySectors.filter(s => s.start < 12);

    let events: Sector[];

    if (!preview) {
        events = isAM ? amEvents : pmEvents;
    } else {
        events = isAM ? pmEvents : tomorrowEvents;
    }

    const icon = preview
        ? (isAM ? faSun : faMoon)
        : (isAM ? faMoon : faSun);

    return (
        <>
        {clockHeader(!secondaryView ? (
            `${isAM ? "Aamu" : "Ilta"} ${time.hours}:${time.minutes
                .toString()
                .padStart(2, "0")}`
            ) : (
                isAM && preview ? "Ilta" : "Huominen"
            ))}
            <View style={styles.container}>
                <Svg height="100%" width="95%" viewBox="0 0 200 200">
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

                <Pressable
                    onPressIn={() => { setPreview(true); setSecondaryView(true); }}
                    onPressOut={() => { setPreview(false); setSecondaryView(false) }}
                    style={styles.previewButton}
                >
                    <FontAwesomeIcon icon={icon} size={50} color="white" />
                </Pressable>
            </View>
        </>
    );
};

export default AnalogClock;