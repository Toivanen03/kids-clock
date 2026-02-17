import { useEffect, useState } from "react";
import type { Time, UseClockOptions } from "../types/types";

export const useClock = ({ test, speed }: UseClockOptions) => {
    const [currentDate, setCurrentDate] = useState(new Date());

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
    };
};