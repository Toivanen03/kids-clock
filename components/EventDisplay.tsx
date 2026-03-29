import { Text as SvgText } from "react-native-svg";
import { View, Text } from "react-native";
import { clockLayout } from "../utils/constants";
import { decimalToTime } from "../utils/timeConversion";
import { EventDisplayProps } from "../types/types";
import { styles } from "../styles";
import { useSettings } from "../hooks/useSettings";
import { getOnGoingAndNext } from "../utils/schedule";
import { useClock } from "../hooks/useClock";
import { useSectors } from "../hooks/useSectors";

const EventDisplay = ({ time, events, easyClock }: EventDisplayProps) => {
    const { settings } = useSettings();
    const { currentWeekday } = useClock();
    const { sectors } = useSectors();
    const { ongoing, next } = getOnGoingAndNext(time, events, sectors, currentWeekday);

    const showCurrent = settings.showCurrent;
    const showNext = settings.showNext;

    return (
        <>
            {easyClock ? (
                <>
                    {ongoing && showCurrent &&
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
                                {`${ongoing.name} kello ${decimalToTime(ongoing.end)} asti`}
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
                    {ongoing && showCurrent && <Text style={styles.nowText}>Nyt: {`${ongoing.name} kello ${decimalToTime(ongoing.end)} asti`}</Text>}
                    {next && showNext && <Text style={styles.nextText}>Seuraavaksi: {`${next.name} kello ${decimalToTime(next.start)}`}</Text>}
                </View>
            )}
        </>
    )
};

export default EventDisplay