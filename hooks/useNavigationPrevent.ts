import { useContext } from "react";
import { NavigationPreventContext } from "./NavigationPreventContext";

export const useNavigationPrevent = () => {
    const context = useContext(NavigationPreventContext);
    if (!context) throw new Error("useNavigationPrevent must be used within NavigationPreventProvider");
    return context;
};