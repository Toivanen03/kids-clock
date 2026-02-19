import AnalogClock from "../components/AnalogClock";
import { ChildScreenProps } from "../types/types";
import { useClock } from "../hooks/useClock";

const ChildScreen = ({ test, speed }: ChildScreenProps) => {
    const { now, time, isAM } = useClock({
        test,
        speed,
    });

    return (
        <AnalogClock
            time={time}
            now={now}
            isAM={isAM}
        />
    );
};

export default ChildScreen;