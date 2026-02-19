import { createContext, useState } from 'react';
import { SettingsContextType, Props } from '../types/types';
import { toDecimalHours } from '../utils/timeConversion';
import type { Sector, Settings } from '../types/types';

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: Props) => {
  const [secondHand, setSecondHand] = useState(false);
  const [minuteHand, setMinuteHand] = useState(false);
  const [hourHand, setHourHand] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const [pin, setPin] = useState(1234);
  const [digitalClock, setDigitalClock] = useState(true);

  const settings: Settings = {
    pin: 1234,
    analogNumbers: numbers,
    digitalClock: true,
    hourHand: hourHand,
    minuteHand: minuteHand,
    secondHand: secondHand,

  };

  const [sectors, setSectors] = useState<Sector[]>([
    {
        visible: true,
        name: "sleep",
        start: toDecimalHours({ hours: 20, minutes: 0}),
        end: toDecimalHours({ hours: 6, minutes: 30 }),
        color: "red"
    },
    {
        visible: true,
        name: "school",
        start: toDecimalHours({ hours: 8, minutes: 0 }),
        end: toDecimalHours({ hours: 13, minutes: 15 }),
        color: "yellow"
    },
    {
        visible: true,
        name: "hobby",
        start: toDecimalHours({ hours: 17, minutes: 45 }),
        end: toDecimalHours({ hours: 19, minutes: 0 }),
        color: "blue"
    },
    {
        visible: true,
        name: "breakfast",
        start: toDecimalHours({ hours: 7, minutes: 0 }),
        end: toDecimalHours({ hours: 7, minutes: 30 }),
        color: "green"
    },
    {
        visible: true,
        name: "supper",
        start: toDecimalHours({ hours: 18, minutes: 30 }),
        end: toDecimalHours({ hours: 19, minutes: 0 }),
        color: "green"
    },
  ])

  return (
    <SettingsContext.Provider value={{
      secondHand, setSecondHand,
      minuteHand, setMinuteHand,
      hourHand, setHourHand,
      numbers, setNumbers,
      sectors, setSectors,
      settings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};