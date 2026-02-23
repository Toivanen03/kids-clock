import { View } from "react-native";
import { EasyClockProps } from "../types/types";
import Svg, { Circle, Path, G, Polygon, Defs, ClipPath, Text } from "react-native-svg";
import { clockLayout, getSectorPath } from "../utils/constants";
import AnalogClockNumbers from "./AnalogClockNumbers";
import { clockHeader } from "./ClockHeader";
import { styles } from "../styles";
import { useSettings } from "../hooks/useSettings";
import { decimalToTime } from "../utils/timeConversion";
import ClockHands from "./ClockHands";

const EasyClock = ({ time, events }: EasyClockProps) => {
    const { sectors, settings } = useSettings()
    const rotation = -(time.hours % 12 + time.minutes / 60 + time.seconds / 3600) * 30;
    const offsetY = 25;

    const angle = Math.PI / 4;

    const x1 = clockLayout.cx - Math.sin(angle) * clockLayout.r;
    const y1 = clockLayout.cy - Math.cos(angle) * clockLayout.r;
    const x2 = clockLayout.cx + Math.sin(angle) * clockLayout.r;
    const y2 = clockLayout.cy - Math.cos(angle) * clockLayout.r;

    const yTop = clockLayout.cy - clockLayout.r;
    const xOffset = Math.tan(angle) * clockLayout.r;
    const leftX  = clockLayout.cx - xOffset;
    const rightX = clockLayout.cx + xOffset;

    const now = time.hours + time.minutes / 60 + time.seconds / 3600;

    const onGoing = sectors
        .slice()
        .sort((a, b) => a.start - b.start)
        .find(e => e.start < now && e.end > now);

    const next = sectors
        .slice()
        .sort((a, b) => a.start - b.start)
        .find(e => e.start > now);

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
                        {events.map((s, i) => (
                            <Path key={i} d={getSectorPath(s.start, s.end)} fill={s.color} />
                        ))}
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

                {next &&
                    <>
                        {onGoing &&
                            <>
                                <Text
                                    x={clockLayout.cx}
                                    y={clockLayout.cy + 15}
                                    fill="black"
                                    fontSize={12}
                                    fontWeight="bold"
                                    textAnchor="middle"
                                >
                                    Nyt:
                                </Text>

                                    <Text
                                    x={clockLayout.cx}
                                    y={clockLayout.cy + 30}
                                    fill="blue"
                                    fontSize={14}
                                    fontWeight="bold"
                                    textAnchor="middle"
                                >
                                    {`${onGoing.name} kello ${decimalToTime(onGoing.end)} asti`}
                                </Text>
                            </>
                        }

                        <Text
                            x={clockLayout.cx}
                            y={clockLayout.cy + 50}
                            fill="black"
                            fontSize={12}
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            Seuraavaksi:
                        </Text>

                            <Text
                            x={clockLayout.cx}
                            y={clockLayout.cy + 65}
                            fill="blue"
                            fontSize={14}
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {`${next.name} kello ${decimalToTime(next.start)}`}
                        </Text>
                    </>
                }
            </Svg>
        </View>
    );
};

export default EasyClock;