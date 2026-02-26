import { Text as SvgText } from "react-native-svg";
import { View, Text } from "react-native";
import { clockLayout } from "../utils/constants";
import { decimalToTime } from "../utils/timeConversion";
import { EventWithDay, EventDisplayProps } from "../types/types";
import { styles } from "../styles";
import { useSettings } from "../hooks/useSettings";

const EventDisplay = ({ time, events, easyClock }: EventDisplayProps) => {
    const { showCurrent, showNext } = useSettings();
    const now = time.hours + time.minutes / 60 + time.seconds / 3600;

    const flatEvents: EventWithDay[] = events.flatMap(s =>
        s.activeDays.map(d => ({ sector: s, start: d.start, end: d.end, name: s.name }))
    );

    const onGoing = flatEvents
        .slice()
        .sort((a, b) => a.start - b.start)
        .find(e => e.start <= now && e.end > now);

    const next = flatEvents
        .slice()
        .sort((a, b) => a.start - b.start)
        .find(e => e.start > now);

    return (
        <>
            {easyClock ? (
                <>
                    {onGoing && showCurrent &&
                        <>
                            <SvgText
                                x={clockLayout.cx}
                                y={clockLayout.cy + 15}
                                fill="black"
                                fontSize={12}
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                Nyt:
                            </SvgText>

                            <SvgText
                                x={clockLayout.cx}
                                y={clockLayout.cy + 30}
                                fill="blue"
                                fontSize={14}
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {`${onGoing.name} kello ${decimalToTime(onGoing.end)} asti`}
                            </SvgText>
                        </>
                    }

                    {next && showNext &&
                        <>
                            <SvgText
                                x={clockLayout.cx}
                                y={clockLayout.cy + 50}
                                fill="black"
                                fontSize={12}
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                Seuraavaksi:
                            </SvgText>

                            <SvgText
                                x={clockLayout.cx}
                                y={clockLayout.cy + 65}
                                fill="blue"
                                fontSize={14}
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {`${next.name} kello ${decimalToTime(next.start)}`}
                            </SvgText>
                        </>
                    }
                </>
            ) : (
                <View style={styles.eventContainer}>
                    {onGoing && showCurrent && <Text style={styles.nowText}>Nyt: {`${onGoing.name} kello ${decimalToTime(onGoing.end)} asti`}</Text>}
                    {next && showNext && <Text style={styles.nextText}>Seuraavaksi: {`${next.name} kello ${decimalToTime(next.start)}`}</Text>}
                </View>
            )}
        </>
    )
};

export default EventDisplay