import { FC } from "react";
import { Line, Circle } from "react-native-svg";
import { clockLayout } from "../utils/constants";
import { ClockHandsProps } from "../types/types";
import { useSettings } from "../hooks/useSettings";

const ClockHands: FC<ClockHandsProps> = ({ time, active }) => {
    const { settings } = useSettings();

    const cx = clockLayout.cx;
    const cy = clockLayout.cy;

    const hourValue = time.hours;
    const minuteValue = time.minutes;
    const secondsValue = time.seconds;

    const offset = Math.PI / 2

    const hourAngle = active ? (((hourValue % 12 + minuteValue / 60) / 12) * 2 * Math.PI - offset) : 0 - offset;
    const minuteAngle = active ? (((minuteValue % 60 + secondsValue / 60) / 60) * 2 * Math.PI - offset) : 0 - offset;
    const secondsAngle = active ? (((minuteValue % 60 + secondsValue / 60)) * 2 * Math.PI - offset) : 0 - offset;

    const hourLength = clockLayout.r * 0.5;
    const minuteLength = hourLength * 1.4;
    const secondsLength = minuteLength * 1.1;

    const x2 = cx + hourLength * Math.cos(hourAngle);
    const y2 = cy + hourLength * Math.sin(hourAngle);

    const x3 = cx + minuteLength * Math.cos(minuteAngle);
    const y3 = cy + minuteLength * Math.sin(minuteAngle);

    const x4 = cx + secondsLength * Math.cos(secondsAngle);
    const y4 = cy + secondsLength * Math.sin(secondsAngle);

    return (
        <>
            {settings.hourHand && !settings.easyClock &&
                <>
                    <Line
                        x1={cx}
                        y1={cy}
                        x2={x2}
                        y2={y2}
                        stroke="black"
                        strokeWidth={6}
                        strokeLinecap="round"
                    />

                    <Line
                        x1={cx}
                        y1={cy}
                        x2={x2}
                        y2={y2}
                        stroke="#ffffff"
                        strokeWidth={4}
                        strokeLinecap="round"
                    />
                </>
            }

            {settings.minuteHand && !settings.easyClock &&
                <>
                    <Line
                        x1={cx}
                        y1={cy}
                        x2={x3}
                        y2={y3}
                        stroke="black"
                        strokeWidth={6}
                        strokeLinecap="round"
                    />

                    <Line
                        x1={cx}
                        y1={cy}
                        x2={x3}
                        y2={y3}
                        stroke="#ffffff"
                        strokeWidth={4}
                        strokeLinecap="round"
                    />
                </>
            }

            {settings.secondHand &&
                <>
                    <Line
                        x1={cx}
                        y1={cy}
                        x2={x4}
                        y2={y4}
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                    />

                    <Line
                        x1={cx}
                        y1={cy}
                        x2={x4}
                        y2={y4}
                        stroke="#ffffff"
                        strokeWidth={1}
                        strokeLinecap="round"
                    />

                    <Circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        strokeWidth={1}
                        stroke="gray"
                    />

                    <Circle
                        cx={cx}
                        cy={cy}
                        r={3}
                        fill="darkgray"
                    />

                    <Circle
                        cx={cx}
                        cy={cy}
                        r={1}
                        fill="black"
                    />
                </>
            }
        </>
    );
};

export default ClockHands;