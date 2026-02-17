import { FC } from "react";
import AnalogClock from "../components/AnalogClock";
import { ChildScreenProps } from "../types/types";
import { dailySectors, splitSectorForClock } from "../utils/constants";
import { useClock } from "../hooks/useClock";

const ChildScreen: FC<ChildScreenProps> = ({ test, speed }) => {
    const { now, time, isAM } = useClock({
        test,
        speed,
    });

    const sectorsToRender = dailySectors.flatMap(s =>
        splitSectorForClock(s, now, isAM)
    );

    return (
        <AnalogClock
            time={time}
            sectorsToRender={sectorsToRender}
            isAM={isAM}
        />
    );
};

export default ChildScreen;