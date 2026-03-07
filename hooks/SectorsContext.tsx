import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SectorsContextType, Sector, NewSector } from "../types/types";
import { generateId } from "../utils/constants";

export const SectorsContext = createContext<SectorsContextType | undefined>(undefined);

export const SectorsProvider = ({ children }: { children: React.ReactNode }) => {
    const [sectors, setSectors] = useState<Sector[]>([]);

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
        };
    };

    useEffect(() => {
        loadSectors();
    }, []);

    const setAllSectors = (data: Sector[]) => {
        setSectors(data);
        saveSectors(data);
    }

    const addSector = (sector: NewSector) => {
        const newSector: Sector = {
            ...sector,
            id: generateId(),
        };
        const updated = [...sectors, newSector];
        setAllSectors(updated);
    }

    const updateSector = (sector: Sector) => {
        const updated = sectors.map(s =>
            s.id === sector.id ? sector : s
        );
        setAllSectors(updated);
    }

    const deleteSector = (id: number) => {
        const updated = sectors.filter(s => s.id !== Number(id));
        setAllSectors(updated);
    }

    return (
        <SectorsContext.Provider
            value={{
                sectors,
                addSector,
                updateSector,
                deleteSector,
                setAllSectors
            }}
        >
        {children}
        </SectorsContext.Provider>
    )
};