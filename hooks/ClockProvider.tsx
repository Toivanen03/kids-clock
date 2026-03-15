import { createContext, useState, useEffect, useMemo } from "react";
import { ClockContextType, Props } from "../types/types";
import { weekdays } from "../types/types";

export const ClockContext = createContext<ClockContextType>({isAM: true, currentWeekday: weekdays[new Date().getDay()]});

export const ClockProvider = ({ children }: Props) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const value = useMemo(() => ({
        isAM: now.getHours() < 12,
        currentWeekday: weekdays[now.getDay()]
    }), [now]);

    return <ClockContext.Provider value={value}>{children}</ClockContext.Provider>;
};