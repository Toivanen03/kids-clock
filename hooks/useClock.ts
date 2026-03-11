import { useEffect, useState } from "react";
import type { Time, UseClockReturn, Weekday } from "../types/types";
import { weekdays } from "../types/types";

export const useClock = (): UseClockReturn => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const test = false;
    const speed = 3600;

    const currentWeekday: Weekday = weekdays[currentDate.getDay()];

    const [selectedDay, setSelectedDay] = useState(currentWeekday);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(prev => {
                if (test) {
                    return new Date(prev.getTime() + 1000 * speed);
                }
                return new Date();
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [test, speed]);

    const time: Time = {
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes(),
        seconds: currentDate.getSeconds(),
    };

    return {
        now: currentDate,
        time,
        isAM: time.hours < 12,
        currentWeekday,
        selectedDay,
        setSelectedDay
    };
};