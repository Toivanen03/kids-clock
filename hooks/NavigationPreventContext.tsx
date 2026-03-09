import React, { createContext, useState, ReactNode } from "react";
import { NavigationPreventContextType } from "../types/types";

export const NavigationPreventContext = createContext<NavigationPreventContextType | undefined>(undefined);

export const NavigationPreventProvider = ({ children }: { children: ReactNode }) => {
    const [sectorEdited, setSectorEdited] = useState(false);
    const [sectorSaved, setSectorSaved] = useState(false);

    return (
        <NavigationPreventContext.Provider value={{ sectorEdited, setSectorEdited, sectorSaved, setSectorSaved }}>
            {children}
        </NavigationPreventContext.Provider>
    );
};

