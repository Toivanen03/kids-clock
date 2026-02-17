export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type Settings = {
    pin: number;
    analogNumbers: boolean;
    digitalClock: boolean;
    hourHand: boolean;
    minuteHand: boolean;
    secondHand: boolean;
    sleep: { visible: boolean; start: number; end: number };
    school: { visible: boolean; start: number; end: number };
    hobby: { visible: boolean; start: number; end: number };
    breakfast: { visible: boolean; start: number; end: number };
};

export type Sector = {
    visible: boolean;
    name: string;
    start: number;
    end: number;
    color: string;
};

export interface ClockHandsProps {
    time: Time;
    active: boolean;
};

export interface AnalogClockProps {
    time: Time;
    sectorsToRender: Sector[];
    isAM: boolean;
};

export interface ChildScreenProps {
    test: boolean;
    speed: number;
}

export type UseClockOptions = {
    test: boolean;
    speed: number;
};