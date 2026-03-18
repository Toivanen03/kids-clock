import { View } from "react-native";
import { EasyClockProps } from "../types/types";
import Svg, { Circle, Path, G, Polygon, Defs, ClipPath, Text } from "react-native-svg";
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "./AnalogClockNumbers";
import { clockHeader } from "./ClockHeader";
import { styles } from "../styles";
import { useSettings } from "../hooks/useSettings";
import ClockHands from "./ClockHands";
import EventDisplay from "./EventDisplay";
import { sectorPath } from "../utils/constants";

const EasyClock = ({ time, events, endTimes }: EasyClockProps) => {
    const { settings } = useSettings()
    const rotation = -(time.hours % 12 + time.minutes / 60 + time.seconds / 3600) * 30;
    const offsetY = 25;

    const { leftX, yTop, rightX, x1, y1, x2, y2} = sectorPath();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {clockHeader(`${time.hours < 12 ? "Aamu" : "Ilta"} ${time.hours}:${time.minutes.toString().padStart(2,"0")}`)}
            </View>

            <Svg height="90%" width="95%" viewBox="0 0 200 200">
                <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="#eee" />

                <Defs>
                    <ClipPath id="windowClip">
                        <Polygon
                            points={`
                                ${leftX},${yTop} 
                                ${rightX},${yTop} 
                                ${clockLayout.cx},${clockLayout.cy}
                            `}
                        />
                    </ClipPath>
                </Defs>

                <Path
                    d={`
                        M ${clockLayout.cx},${clockLayout.cy} L ${x1},${y1}
                        M ${clockLayout.cx},${clockLayout.cy} L ${x2},${y2}
                    `}
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
                />

                <G clipPath="url(#windowClip)">
                    <G transform={`rotate(${rotation} ${clockLayout.cx} ${clockLayout.cy})`}>

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

                        {settings.analogNumbers && <AnalogClockNumbers rotation={rotation} />}
                    </G>
                </G>

                {settings.secondHand && (
                        <ClockHands time={time} active={settings.secondHand} />
                )}

                <Circle cx={clockLayout.cx} cy={clockLayout.cy} r={clockLayout.r} fill="none" stroke="#333" strokeWidth={3} />

                <Polygon
                    points={`
                        ${clockLayout.cx-10},${clockLayout.cy - clockLayout.r - 10 - offsetY} 
                        ${clockLayout.cx +10},${clockLayout.cy - clockLayout.r - 10 - offsetY} 
                        ${clockLayout.cx},${clockLayout.cy - clockLayout.r + 20 - offsetY}
                    `}
                    fill="red"
                />

                <Text
                    x={clockLayout.cx}
                    y={clockLayout.cy - clockLayout.cy - offsetY - 15}
                    fill="black"
                    fontSize={12}
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    Aika
                </Text>
                
                <EventDisplay time={time} events={events} easyClock={true} endTimes={endTimes} />
                
            </Svg>
        </View>
    );
};

export default EasyClock;