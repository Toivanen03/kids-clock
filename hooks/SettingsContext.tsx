import { createContext, useState, useEffect } from 'react';
import { SettingsContextType, Props } from '../types/types';
import { toDecimalHours } from '../utils/timeConversion';
import { Sector, Settings } from '../types/types';
import { generateId } from '../utils/constants';

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: Props) => {
  const [secondHand, setSecondHand] = useState(true);
  const [minuteHand, setMinuteHand] = useState(true);
  const [hourHand, setHourHand] = useState(true);
  const [numbers, setNumbers] = useState(true);

  const [showCurrent, setShowCurrent] = useState(true);
  const [showNext, setShowNext] = useState(true);

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
      id: generateId(),
      name: "Uni",
      activeDays: [
        { day: 'mon', start: toDecimalHours({ hours: 20, minutes: 0}), end: toDecimalHours({ hours: 6, minutes: 30 }) },
        { day: 'tue', start: toDecimalHours({ hours: 18, minutes: 0}), end: toDecimalHours({ hours: 6, minutes: 30 }) },
        { day: 'wed', start: toDecimalHours({ hours: 20, minutes: 0}), end: toDecimalHours({ hours: 6, minutes: 30 }) },
        { day: 'thu', start: toDecimalHours({ hours: 19, minutes: 0}), end: toDecimalHours({ hours: 6, minutes: 30 }) },
        { day: 'fri', start: toDecimalHours({ hours: 20, minutes: 0}), end: toDecimalHours({ hours: 6, minutes: 30 }) },
        { day: 'sat', start: toDecimalHours({ hours: 22, minutes: 0}), end: toDecimalHours({ hours: 6, minutes: 30 }) },
        { day: 'sun', start: toDecimalHours({ hours: 21, minutes: 0}), end: toDecimalHours({ hours: 6, minutes: 30 }) },
      ],
      color: "#E41A1C"
    },
    {
      id: generateId(),
      name: "Koulu",
      activeDays: [
        { day: 'mon', start: toDecimalHours({ hours: 8, minutes: 0}), end: toDecimalHours({ hours: 12, minutes: 0 }) },
        { day: 'tue', start: toDecimalHours({ hours: 9, minutes: 0}), end: toDecimalHours({ hours: 13, minutes: 15 }) },
        { day: 'wed', start: toDecimalHours({ hours: 8, minutes: 0}), end: toDecimalHours({ hours: 12, minutes: 0 }) },
        { day: 'thu', start: toDecimalHours({ hours: 9, minutes: 0}), end: toDecimalHours({ hours: 13, minutes: 15 }) },
        { day: 'fri', start: toDecimalHours({ hours: 8, minutes: 0}), end: toDecimalHours({ hours: 12, minutes: 0 }) },
      ],
      color: "#FF7F00"
    },
    {
      id: generateId(),
      name: "Harrastus",
      activeDays: [
        { day: 'tue', start: toDecimalHours({ hours: 17, minutes: 30}), end: toDecimalHours({ hours: 19, minutes: 0 }) },
      ],
      color: "#377EB8"
    },
    {
      id: generateId(),
      name: "Aamupala",
      activeDays: [
        { day: 'mon', start: toDecimalHours({ hours: 7, minutes: 15}), end: toDecimalHours({ hours: 7, minutes: 30 }) },
        { day: 'tue', start: toDecimalHours({ hours: 7, minutes: 15}), end: toDecimalHours({ hours: 7, minutes: 30 }) },
        { day: 'wed', start: toDecimalHours({ hours: 7, minutes: 15}), end: toDecimalHours({ hours: 7, minutes: 30 }) },
        { day: 'thu', start: toDecimalHours({ hours: 7, minutes: 15}), end: toDecimalHours({ hours: 7, minutes: 30 }) },
        { day: 'fri', start: toDecimalHours({ hours: 7, minutes: 15}), end: toDecimalHours({ hours: 7, minutes: 30 }) },
        { day: 'sat', start: toDecimalHours({ hours: 7, minutes: 15}), end: toDecimalHours({ hours: 7, minutes: 30 }) },
        { day: 'sun', start: toDecimalHours({ hours: 7, minutes: 15}), end: toDecimalHours({ hours: 7, minutes: 30 }) },
      ],
      color: "#4DAF4A"
    },
    {
      id: generateId(),
      name: "Iltapala",
      activeDays: [
        { day: 'mon', start: toDecimalHours({ hours: 19, minutes: 15}), end: toDecimalHours({ hours: 19, minutes: 45 }) },
        { day: 'tue', start: toDecimalHours({ hours: 19, minutes: 15}), end: toDecimalHours({ hours: 19, minutes: 45 }) },
        { day: 'wed', start: toDecimalHours({ hours: 19, minutes: 15}), end: toDecimalHours({ hours: 19, minutes: 45 }) },
        { day: 'thu', start: toDecimalHours({ hours: 19, minutes: 15}), end: toDecimalHours({ hours: 19, minutes: 45 }) },
        { day: 'fri', start: toDecimalHours({ hours: 19, minutes: 15}), end: toDecimalHours({ hours: 19, minutes: 45 }) },
        { day: 'sat', start: toDecimalHours({ hours: 19, minutes: 15}), end: toDecimalHours({ hours: 19, minutes: 45 }) },
        { day: 'sun', start: toDecimalHours({ hours: 19, minutes: 15}), end: toDecimalHours({ hours: 19, minutes: 45 }) },
      ],
      color: "#4DAF4A"
    },
  ]);

  const addSector = (sectorData: Omit<Sector, "id">) => {
    const newSector: Sector = {
      ...sectorData,
      id: generateId(),
    };

    setSectors(prev => [...prev, newSector]);
  };

  const updateSector = (updatedSector: Sector) => {
    setSectors(prev =>
      prev.map(sector =>
        sector.id === updatedSector.id
          ? updatedSector
          : sector
      )
    );
  };

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
      pin, setPin,
      showCurrent, setShowCurrent,
      showNext, setShowNext,
      addSector, updateSector
    }}>
      {children}
    </SettingsContext.Provider>
  );
};