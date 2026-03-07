import { ReactNode } from "react";
import type { Dispatch, SetStateAction } from "react";

export const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type Weekday = typeof weekdays[number];
export const weekdaysOrdered: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
    mon: "Maanantai",
    tue: "Tiistai",
    wed: "Keskiviikko",
    thu: "Torstai",
    fri: "Perjantai",
    sat: "Lauantai",
    sun: "Sunnuntai",
};

export type EventWithDay = { sector: Sector; start: number; end: number, name: string };

export const predefinedColors = [ '#E41A1C', '#377EB8', '#4DAF4A', '#FF7F00', '#984EA3', '#00CED1', '#D2B48C', '#000000', '#A9A9A9', '#FFFFFF' ] as const;
export type Color = typeof predefinedColors[number];

export const COLOR_LABELS: Record<Color, string> = {
    '#E41A1C': 'Punainen',
    '#377EB8': 'Sininen',
    '#4DAF4A': 'Vihreä',
    '#FF7F00': 'Keltainen',
    '#984EA3': 'Violetti',
    '#00CED1': 'Turkoosi',
    '#D2B48C': 'Okra',
    '#000000': 'Musta',
    '#A9A9A9': 'Harmaa',
    '#FFFFFF': 'Valkoinen',
};

export type SectorProps = {
    sector: Sector;
    setSectorToEdit: Dispatch<React.SetStateAction<Sector | undefined>>
};

export interface Props {
    children: ReactNode;
}

export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type Settings = {
    pin: number;
    analogNumbers: boolean;
    easyClock: boolean;
    hourHand: boolean;
    minuteHand: boolean;
    secondHand: boolean;
};

export interface SettingsContextType {
    secondHand: boolean;
    setSecondHand: Dispatch<SetStateAction<boolean>>;
    minuteHand: boolean;
    setMinuteHand: Dispatch<SetStateAction<boolean>>;
    hourHand: boolean;
    setHourHand: Dispatch<SetStateAction<boolean>>;
    numbers: boolean;
    setNumbers: Dispatch<SetStateAction<boolean>>;
    sectors: Sector[];
    setSectors: Dispatch<SetStateAction<Sector[]>>;
    easyClock: boolean;
    setEasyClock: Dispatch<SetStateAction<boolean>>;
    pin: number;
    setPin: Dispatch<SetStateAction<number>>;
    locked: boolean;
    setLocked: Dispatch<SetStateAction<boolean>>;
    settings: Settings;
    timeToLockdown: number;
    autoLock: boolean;
    setAutoLock: Dispatch<SetStateAction<boolean>>;
    showCurrent: boolean;
    setShowCurrent: Dispatch<SetStateAction<boolean>>;
    showNext: boolean;
    setShowNext: Dispatch<SetStateAction<boolean>>;
    addSector: (sectorData: Omit<Sector, "id">) => void
    updateSector: (sector: Sector) => void
};

export type DaySchedule = {
    day: Weekday;
    start: number;
    end: number;
};

export type Sector = {
    id: number;
    activeDays: DaySchedule[];
    name: string;
    color: string;
};

export interface ClockHandsProps {
    time: Time;
    active: boolean;
};

export interface ColorSelectorProps {
    showColorPanel: boolean;
    setShowColorPanel: Dispatch<SetStateAction<boolean>>;
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
    name: string;
}

export interface AnalogClockProps {
    time: Time;
    now: Date;
    isAM: boolean;
    currentWeekday: Weekday;
};

export interface EventDisplayProps {
    time: Time;
    events: Sector[];
    easyClock: boolean;
}

export interface EasyClockProps {
    time: Time;
    now: Date,
    isAM: boolean;
    events: Sector[];
    currentWeekday: Weekday;
};

export interface AnalogNumberProps {
    rotation?: number;
}
export interface ChildScreenProps {
    test: boolean;
    speed: number;
}

export type UseClockOptions = {
    test: boolean;
    speed: number;
};

export interface AddSectorProps {
    setShowSectors: (val: boolean) => void;
}

export type UseClockReturn = {
    now: Date;
    time: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    isAM: boolean;
    currentWeekday: Weekday;
};