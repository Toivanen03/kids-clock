import React, { createContext, useState, ReactNode } from "react";
import { SectorStateContextType } from "../types/types";

export const SectorStateContext = createContext<SectorStateContextType | undefined>(undefined);

export const SectorStateProvider = ({ children }: { children: ReactNode }) => {
    const [sectorEdited, setSectorEdited] = useState(false);
    const [sectorSaved, setSectorSaved] = useState(false);
    const [showTabs, setShowTabs] = useState(true);

    return (
        <SectorStateContext.Provider value={{ sectorEdited, setSectorEdited, sectorSaved, setSectorSaved, showTabs, setShowTabs }}>
            {children}
        </SectorStateContext.Provider>
    );
};

