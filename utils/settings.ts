import { toDecimalHours } from "./timeConversion";
import { Settings } from "../types/types";

export const settings: Settings = {
    pin: 1234,
    analogNumbers: true,
    digitalClock: true,
    hourHand: true,
    minuteHand: true,
    secondHand: true,
    sleep: {
        visible: true,
        start: toDecimalHours({ hours: 20, minutes: 0}),
        end: toDecimalHours({ hours: 6, minutes: 30 }),
    },
    school: {
        visible: true,
        start: toDecimalHours({ hours: 8, minutes: 0 }),
        end: toDecimalHours({ hours: 13, minutes: 15 }),
    },
    hobby: {
        visible: true,
        start: toDecimalHours({ hours: 17, minutes: 45 }),
        end: toDecimalHours({ hours: 19, minutes: 0 }),
    },
};