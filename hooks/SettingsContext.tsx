import { createContext, useState, useEffect } from 'react';
import { SettingsContextType, Props } from '../types/types';
import { toDecimalHours } from '../utils/timeConversion';
import type { Sector, Settings } from '../types/types';

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: Props) => {
  const [secondHand, setSecondHand] = useState(true);
  const [minuteHand, setMinuteHand] = useState(true);
  const [hourHand, setHourHand] = useState(true);
  const [numbers, setNumbers] = useState(true);

  const [pin, setPin] = useState(1234);
  const [timeToLockdown] = useState(60);
  const [locked, setLocked] = useState(true);
  const [easyClock, setEasyClock] = useState(true);

  useEffect(() => {
    if (easyClock) {
      setHourHand(false);
      setMinuteHand(false);
    } else {
      setHourHand(true);
      setMinuteHand(true);
    };
  }, [easyClock]);

  const settings: Settings = {
    pin: pin,
    analogNumbers: numbers,
    easyClock: easyClock,
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
      easyClock, setEasyClock,
      locked, setLocked,
      settings, timeToLockdown,
      pin, setPin
    }}>
      {children}
    </SettingsContext.Provider>
  );
};