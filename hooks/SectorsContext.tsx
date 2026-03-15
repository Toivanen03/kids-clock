import React, { createContext, useEffect, useState, useMemo, useCallback, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SectorsContextType, Sector, NewSector } from "../types/types";
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

const splitSectorByNoon = useCallback((sector: Sector): [Sector[], Sector[]] => {
        const am: Sector[] = [];
        const pm: Sector[] = [];

        sector.activeDays.forEach(d => {
            if (d.start < 12) {
                if (d.end > 12) {
                    am.push({ ...sector, activeDays: [{ ...d, end: 12 }] });
                    pm.push({ ...sector, activeDays: [{ ...d, start: 12 }] });
                } else {
                    am.push({ ...sector, activeDays: [d] });
                }
            } else {
                pm.push({ ...sector, activeDays: [d] });
            }
        });

        return [am, pm];
    }, []);

    const normalizeSectorForTomorrow = (sector: Sector): Sector | null => {
        const newActiveDays = sector.activeDays
            .map(d => {
                let start = d.start > d.end ? 0 : d.start;
                let end = d.start < 12 && d.end >= 12 ? 12 : d.end;
                return { ...d, start, end };
            })
            .filter(d => d.start !== d.end);
        return newActiveDays.length > 0 ? { ...sector, activeDays: newActiveDays } : null;
    };

    const fullDayEvents = useMemo(() => {
        return sectors
            .map(s => {
                const daySchedules = s.activeDays.filter(d => d.day === selectedDay);
                return daySchedules.length > 0 ? { ...s, activeDays: daySchedules } : null;
            })
            .filter((s): s is Sector => s !== null);
    }, [sectors, selectedDay]);

    const [amEvents, pmEvents] = useMemo(() => {
        const am: Sector[] = [];
        const pm: Sector[] = [];
        fullDayEvents.forEach(s => {
            const [a, p] = splitSectorByNoon(s);
            am.push(...a);
            pm.push(...p);
        });
        return [am, pm];
    }, [fullDayEvents]);

    const tomorrowEvents = useMemo(() => {
        return sectors
            .map(normalizeSectorForTomorrow)
            .filter((s): s is Sector => s !== null);
    }, [sectors]);

    const events = useMemo(() => {
        if (!preview) return isAM ? amEvents : pmEvents;
        return isAM ? pmEvents : tomorrowEvents;
    }, [preview, isAM, amEvents, pmEvents, tomorrowEvents]);

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
        selectedDay
    ]);

    return (
        <SectorsContext.Provider value={value}>
            {children}
        </SectorsContext.Provider>
    );
};