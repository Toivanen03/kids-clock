import React, { createContext, useEffect, useState, useMemo, useCallback, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SectorsContextType, Sector, NewSector, weekdays } from "../types/types";
import { generateId } from "../utils/constants";
import { Weekday } from "../types/types";
import { ClockContext } from "./ClockProvider";

export const SectorsContext = createContext<SectorsContextType | undefined>(undefined);

export const SectorsProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAM, currentWeekday } = useContext(ClockContext);
    const [selectedDay, setSelectedDay] = useState<Weekday>(currentWeekday);
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [preview, setPreview] = useState(false);

    const saveSectors = useCallback(async (data: Sector[]) => {
        await AsyncStorage.setItem(
            "kidsClockSectors",
            JSON.stringify(data)
        );
    }, []);

    useEffect(() => {
        const load = async () => {
            const stored = await AsyncStorage.getItem("kidsClockSectors");
            if (stored) setSectors(JSON.parse(stored));
        };

        load();
    }, []);

    const setAllSectors = useCallback(
        (updater: Sector[] | ((prev: Sector[]) => Sector[])) => {
            setSectors(prev => {
                const next =
                    typeof updater === "function"
                        ? (updater as (p: Sector[]) => Sector[])(prev)
                        : updater;

                saveSectors(next);
                return next;
            });
        },
        [saveSectors]
    );

    const addSector = useCallback((sector: NewSector) => {
        const newSector: Sector = { ...sector, id: generateId() };
        setAllSectors(prev => [...prev, newSector]);
    }, []);

    const updateSector = useCallback((sector: Sector) => {
        setAllSectors(prev =>
            prev.map(s => (s.id === sector.id ? sector : s))
        );
    }, []);

    const deleteSector = useCallback((id: number) => {
        setAllSectors(prev => prev.filter(s => s.id !== id));
    }, []);

    const linearize = (start: number, end: number) => {
        if (end <= start) end += 24;
        return { start, end };
    };

    const splitSector = (start: number, end: number) => {
        const splits = [12, 24, 36];
        const result = [];

        let currentStart = start;

        for (const split of splits) {
            if (split > start && split < end) {
                result.push({ start: currentStart, end: split });
                currentStart = split;
            }
        }

        result.push({ start: currentStart, end });

        return result;
    };

    const normalizeSector = (sector: Sector) => {
        const result: Sector[] = [];

        sector.activeDays.forEach(d => {

            const { start, end } = linearize(d.start, d.end);
            const parts = splitSector(start, end);

            parts.forEach(p => {

                const dayOffset = Math.floor(p.start / 24);
                const dayIndex = weekdays.indexOf(d.day);
                const newDay = weekdays[(dayIndex + dayOffset) % 7];

                result.push({
                    ...sector,
                    activeDays: [{
                        day: newDay,
                        start: p.start % 24,
                        end: p.end % 24
                    }]
                });

            });

        });

        return result;
    };

    const normalizedEvents = useMemo(() => {
        return sectors.flatMap(normalizeSector);
    }, [sectors]);

    const fullDayEvents = useMemo(() => {
        return sectors
            .map(s => {
                const daySchedules = s.activeDays.filter(d => d.day === selectedDay);
                return daySchedules.length > 0 ? { ...s, activeDays: daySchedules } : null;
            })
            .filter((s): s is Sector => s !== null);
    }, [sectors, selectedDay]);

    const events = useMemo(() => {
        return normalizedEvents
            .filter(e => e.activeDays[0].day === selectedDay)
            .filter(e => {
                if (preview) {
                    return isAM
                        ? e.activeDays[0].start >= 12
                        : e.activeDays[0].start < 12;
                } else {
                    return isAM
                        ? e.activeDays[0].start < 12
                        : e.activeDays[0].start >= 12;
                }
            });
    }, [normalizedEvents, selectedDay, isAM, preview]);

    const amEvents = normalizedEvents.filter(
        e => e.activeDays[0].day === selectedDay &&
            e.activeDays[0].start < 12
    );

    const pmEvents = normalizedEvents.filter(
        e => e.activeDays[0].day === selectedDay &&
            e.activeDays[0].start >= 12
    );

    const value = useMemo(() => ({
        sectors,
        addSector,
        updateSector,
        deleteSector,
        setAllSectors,
        preview,
        setPreview,
        events,
        amEvents,
        pmEvents,
        fullDayEvents,
        selectedDay,
        setSelectedDay
    }), [
        sectors,
        preview,
        events,
        amEvents,
        pmEvents,
        fullDayEvents,
        selectedDay,
        isAM
    ]);

    return (
        <SectorsContext.Provider value={value}>
            {children}
        </SectorsContext.Provider>
    );
};