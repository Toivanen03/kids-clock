import React, { createContext, useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SectorsContextType, Sector, NewSector } from "../types/types";
import { generateId } from "../utils/constants";
import { useClock } from "./useClock";
import { Weekday } from "../types/types";

export const SectorsContext = createContext<SectorsContextType | undefined>(undefined);

export const SectorsProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAM, currentWeekday } = useClock();
    const [selectedDay, setSelectedDay] = useState<Weekday>(currentWeekday);
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [preview, setPreview] = useState(false);

    const defaultSectors: Sector[] = [];

    const saveSectors = async (data: Sector[]) => {
        await AsyncStorage.setItem("kidsClockSectors", JSON.stringify(data));
    };

    const loadSectors = async () => {
        try {
            const stored = await AsyncStorage.getItem("kidsClockSectors");
            if (stored) {
                setSectors(JSON.parse(stored));
            } else {
                setSectors(defaultSectors);
                saveSectors(defaultSectors);
            }
        } catch (e) {
            setSectors(defaultSectors);
        }
    };

    useEffect(() => {
        loadSectors();
    }, []);

    const setAllSectors = (data: Sector[]) => {
        setSectors(data);
        saveSectors(data);
    };

    const addSector = (sector: NewSector) => {
        const newSector: Sector = { ...sector, id: generateId() };
        setAllSectors([...sectors, newSector]);
    };

    const updateSector = (sector: Sector) => {
        setAllSectors(sectors.map(s => (s.id === sector.id ? sector : s)));
    };

    const deleteSector = (id: number) => {
        setAllSectors(sectors.filter(s => s.id !== Number(id)));
    };

    const splitSectorByNoon = (sector: Sector): [Sector[], Sector[]] => {
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
    };

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

    return (
        <SectorsContext.Provider
            value={{
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
            }}
        >
            {children}
        </SectorsContext.Provider>
    );
};