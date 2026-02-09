import { FC } from "react";
import { Text as SvgText } from "react-native-svg";
import { clockLayout } from "../utils/constants";

const numberStyle = (isMajor: boolean) => ({
    fontSize: isMajor ? 20 : 16,
    fontWeight: "bold",
    fill: "#333",
    textAnchor: "middle" as const,
    alignmentBaseline: "middle" as const,
});

const NUMBERS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

const AnalogClockNumbers: FC = () => {
    const { cx, cy, r } = clockLayout;

    return (
        <>
        {NUMBERS.map((num) => {
            const angle = (num / 12) * 2 * Math.PI - Math.PI / 2;

            const radius = r * 0.8;

            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);

            const isMajor = num === 12 || num === 3 || num === 6 || num === 9;

            return (
                <SvgText key={num} x={x} y={y} {...numberStyle(isMajor)}>
                    {num}
                </SvgText>
            );
        })}
        </>
    );
};

export default AnalogClockNumbers;