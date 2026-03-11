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

export type SectorProps = {
    sector: Sector;
    setSectorToEdit: Dispatch<React.SetStateAction<Sector | undefined>>;
};

export interface Props {
    children: ReactNode;
}

export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type PinResetAnswer = {
    result: boolean;
    answerText: string;
};

export interface ConfirmPinProps {
  setShowTab: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface SettingsContextType {
    settings: Settings;
    updateSetting: <K extends keyof Settings>(setting: K, value: Settings[K]) => void;
    timeToLockdown: number;
    pin: number;
    updatePin: (newPin: number) => void;
    resetPin: (question: number[], answer: number) => PinResetAnswer;
};

export interface SectorStateContextType {
    sectorEdited: boolean;
    setSectorEdited: (val: boolean) => void;
    sectorSaved: boolean;
    setSectorSaved: (val: boolean) => void;
    showTabs: boolean;
    setShowTabs: (val: boolean) => void;
};

export type Settings = {
    secondHand: boolean;
    minuteHand: boolean;
    hourHand: boolean;
    showCurrent: boolean;
    showNext: boolean;
    locked: boolean;
    autoLock: boolean;
    easyClock: boolean;
    analogNumbers: boolean;
};

export type NewSector = Omit<Sector, "id">;

export type SectorsContextType = {
    sectors: Sector[];
    addSector: (sector: NewSector) => void;
    updateSector: (sector: Sector) => void;
    deleteSector: (id: number) => void;
    setAllSectors: (sectors: Sector[]) => void;
    preview: boolean;
    setPreview: (val: boolean) => void;
    events: Sector[];
    amEvents: Sector[];
    pmEvents: Sector[];
    fullDayEvents: Sector[];
    selectedDay: Weekday;
    setSelectedDay: (val: Weekday) => void;
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
    selectedDay: Weekday;
    setSelectedDay: (val: Weekday) => void;
};