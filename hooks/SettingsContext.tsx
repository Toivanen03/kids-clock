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
  const [timeToLockdown] = useState(30);
  const [locked, setLocked] = useState(true);
  const [autoLock, setAutoLock] = useState(false);
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
      id: 1,
      visible: true,
      name: "Uni",
      start: toDecimalHours({ hours: 20, minutes: 0}),
      end: toDecimalHours({ hours: 6, minutes: 30 }),
      color: "#E41A1C"
    },
    {
      id: 2,
      visible: true,
      name: "Koulu",
      start: toDecimalHours({ hours: 8, minutes: 0 }),
      end: toDecimalHours({ hours: 13, minutes: 15 }),
      color: "#FF7F00"
    },
    {
      id: 3,
      visible: true,
      name: "Harrastus",
      start: toDecimalHours({ hours: 17, minutes: 45 }),
      end: toDecimalHours({ hours: 19, minutes: 0 }),
      color: "#377EB8"
    },
    {
      id: 4,
      visible: true,
      name: "Aamupala",
      start: toDecimalHours({ hours: 7, minutes: 0 }),
      end: toDecimalHours({ hours: 7, minutes: 30 }),
      color: "#4DAF4A"
    },
    {
      id: 5,
      visible: true,
      name: "Iltapala",
      start: toDecimalHours({ hours: 18, minutes: 30 }),
      end: toDecimalHours({ hours: 19, minutes: 0 }),
      color: "#4DAF4A"
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
      autoLock, setAutoLock,
      pin, setPin
    }}>
      {children}
    </SettingsContext.Provider>
  );
};