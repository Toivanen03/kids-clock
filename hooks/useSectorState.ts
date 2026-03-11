import { useContext } from "react";
import { SectorStateContext } from "./SectorStateContext";

export const useSectorState = () => {
    const context = useContext(SectorStateContext);
    if (!context) throw new Error("useSectorState must be used within SectorStateProvider");
    return context;
};