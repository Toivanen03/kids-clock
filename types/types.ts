import { ReactNode } from "react";

export const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type Weekday = typeof weekdays[number];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
    mon: "Maanantai",
    tue: "Tiistai",
    wed: "Keskiviikko",
    thu: "Torstai",
    fri: "Perjantai",
    sat: "Lauantai",
    sun: "Sunnuntai",
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
    setSecondHand: (val: boolean) => void;
    minuteHand: boolean;
    setMinuteHand: (val: boolean) => void;
    hourHand: boolean;
    setHourHand: (val: boolean) => void;
    numbers: boolean;
    setNumbers: (val: boolean) => void;
    sectors: Sector[];
    setSectors: (val: Sector[]) => void;
    easyClock: boolean;
    setEasyClock: (val: boolean) => void;
    pin: number;
    setPin: (val: number) => void;
    locked: boolean;
    setLocked: (val: boolean) => void;
    settings: Settings;
    timeToLockdown: number;
    autoLock: boolean;
    setAutoLock: (val: boolean) => void;
}

export type Sector = {
    visible: boolean;
    name: string;
    start: number;
    end: number;
    color: string;
};

export interface  ClockHandsProps {
    time: Time;
    active: boolean;
};

export interface AnalogClockProps {
    time: Time;
    now: Date,
    isAM: boolean;
    currentWeekday: Weekday;
};

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