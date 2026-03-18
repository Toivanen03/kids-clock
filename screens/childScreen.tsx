import { styles } from "../styles";
import { useState } from "react";
import { View, Pressable } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "../components/AnalogClockNumbers";
import ClockHands from "../components/ClockHands";
import { clockHeader } from "../components/ClockHeader";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useSettings } from "../hooks/useSettings";
import EasyClock from "../components/EasyClock";
import EventDisplay from "../components/EventDisplay";
import { useClock } from "../hooks/useClock";
import { useSectors } from "../hooks/useSectors";

const ChildScreen = () => {
    const [secondaryView, setSecondaryView] = useState(false);
    const { settings } = useSettings();
    const { time, isAM } = useClock();
    const { events, preview, setPreview } = useSectors();

    const icon = preview
        ? (isAM ? faSun : faMoon)
        : (isAM ? faMoon : faSun);

    const flatEvents = events.flatMap(s =>
        s.activeDays.map(d => ({ sector: s, start: d.start, end: d.end, name: s.name }))
    );

    const endTimes = flatEvents.map(e => e.end);

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
                    
                    <Svg height="60%" width="95%" viewBox="0 0 200 200">
                        <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="#eee" />

                        {events.map((s, i) => 
                            s.activeDays.map((d, j) => 
                                d ? (
                                <Path
                                    key={`${i}-${j}`}
                                    d={getSectorPath(d.start, d.end)}
                                    fill={s.color}
                                    fillOpacity={0.85}
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

                    {(!preview && events && endTimes) ? ( <EventDisplay time={time} events={events} easyClock={false} endTimes={endTimes} /> ) : (<View style={{height: 120}} />)}

                    <View style={styles.previewButton}>
                        <Pressable
                            onPressIn={() => { setPreview(true); setSecondaryView(true); }}
                            onPressOut={() => { setPreview(false); setSecondaryView(false) }}
                        >
                            <FontAwesomeIcon icon={icon} size={50} color="#ffd341" />
                        </Pressable>
                    </View>
                </View>
            ) : (
                <EasyClock time={time} events={events} endTimes={endTimes} />
            )}
        </>
    );
};

export default ChildScreen;