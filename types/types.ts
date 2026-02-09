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
};

export type Sector = {
    visible: boolean;
    name: string;
    start: number;
    end: number;
    color: string;
};

export interface ClockHandsProps {
    time: {
        hours: number;
        minutes: number;
        seconds: number;
        AMactive: boolean;
    };
};

export interface AnalogClockProps {
    time: {
        hours: number;
        minutes: number;
        seconds: number;
        AMactive: boolean;
    };
};