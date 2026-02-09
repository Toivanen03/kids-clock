import { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "../styles";
import Svg, { Circle, Path } from 'react-native-svg';
import { clockLayout, getSectorPath, dailySectors, splitSectorForClock } from "../utils/constants";
import AnalogClockNumbers from "./AnalogClockNumbers";
import ClockHands from "./ClockHands";
import { settings } from "../utils/settings";
import { AnalogClockProps } from "../types/types"

const AnalogPM: FC<AnalogClockProps> = ({ time }) => {
    
    return (
        <View style={styles.container}>
            <Svg height="100%" width={time.AMactive ? "65%" : "95%"} viewBox="0 0 200 200">
                <Circle
                    cx={clockLayout.cx}
                    cy={clockLayout.cy}
                    r={clockLayout.r}
                    fill="#eee"
                />

                {dailySectors.map((sector, index) =>
                    splitSectorForClock(sector, time.AMactive).map((s, i) => (
                        <Path key={`${index}-${i}`} d={getSectorPath(s.start, s.end)} fill={s.color} />
                    ))
                )}

                <Circle
                    cx={clockLayout.cx}
                    cy={clockLayout.cy}
                    r={clockLayout.r}
                    fill="none"
                    stroke="#333"
                    strokeWidth={3}
                />

                {
                settings.analogNumbers && 
                    <AnalogClockNumbers />
                }

                {
                (settings.hourHand || settings.minuteHand || settings.secondHand) &&
                    <ClockHands time={time} />
                }
            </Svg>
        </View>
    );
};

export default AnalogPM;