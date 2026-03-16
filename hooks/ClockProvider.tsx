import { createContext, useMemo } from "react";
import { ClockContextType, Props, weekdays } from "../types/types";
import { useClock } from "./useClock";

export const ClockContext = createContext<ClockContextType>({isAM: true, currentWeekday: weekdays[new Date().getDay()]});

export const ClockProvider = ({ children }: Props) => {
    const { now } = useClock();

    const hour = now.getHours();
    const day = now.getDay();

    const value = useMemo(() => ({
        isAM: hour < 12,
        currentWeekday: weekdays[day]
    }), [hour, day]);

    return (
        <ClockContext.Provider value={value}>
            {children}
        </ClockContext.Provider>
    );
};