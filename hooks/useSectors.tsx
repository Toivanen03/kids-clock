import { useContext } from "react";
import { SectorsContext } from "./SectorsContext";

export const useSectors = () => {
    const context = useContext(SectorsContext)
    if (!context) throw new Error("useSectors must be used inside SectorsProvider")
    return context
}