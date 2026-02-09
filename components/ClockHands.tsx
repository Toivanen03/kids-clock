import { FC } from "react";
import { Line } from "react-native-svg";
import { clockLayout } from "../utils/constants";
import { settings } from "../utils/settings";
import { ClockHandsProps } from "../types/types";

const ClockHands: FC<ClockHandsProps> = ({ time }) => {
    const cx = clockLayout.cx;
    const cy = clockLayout.cy;

    const hourValue = time.hours;
    const minuteValue = time.minutes;
    const secondsValue = time.seconds;

    const hourAngle = ((hourValue % 12 + minuteValue / 60) / 12) * 2 * Math.PI - Math.PI / 2;
    const minuteAngle = ((minuteValue % 60 + secondsValue / 60) / 60) * 2 * Math.PI - Math.PI / 2;
    const secondsAngle = ((minuteValue % 60 + secondsValue / 60)) * 2 * Math.PI - Math.PI / 2;

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
            {settings.hourHand &&
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
                        stroke="white"
                        strokeWidth={4}
                        strokeLinecap="round"
                    />
                </>
            }

            {settings.minuteHand &&
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
                        stroke="white"
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
                        stroke="white"
                        strokeWidth={1}
                        strokeLinecap="round"
                    />
                </>
            }
        </>
    );
};

export default ClockHands;