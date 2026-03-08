import { createContext, useState, useEffect } from 'react';
import { SettingsContextType, Props } from '../types/types';
import { Settings } from '../types/types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultSettings } from '../utils/constants';
import { PinResetAnswer } from '../types/types';

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: Props) => {
  const [timeToLockdown] = useState<number>(30);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [pin, setPin] = useState<number>(0);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const loadSettings = async (): Promise<Settings> => {
    try {
      const json = await AsyncStorage.getItem("kidsClockSettings");
      setSettingsLoaded(true);
      return json ? JSON.parse(json) : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  };

  const loadPin = async (): Promise<number> => {
    try {
      const json = await AsyncStorage.getItem("kidsClockPin");
      return json ? JSON.parse(json) : 0;
    } catch (e) {
      return 0;
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const loadedPin = await loadPin();
      const loadedSettings = await loadSettings();
      const lockedSettings = { ...loadedSettings, ["locked"]: true}
      setSettings(lockedSettings);
      setPin(loadedPin)
    };

    fetchSettings();
  }, []);

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      saveSettings(updated);
      return updated;
    });
  };

  const saveSettings = async (settings: Settings) => {
    try {
      await AsyncStorage.setItem("kidsClockSettings", JSON.stringify(settings));
    } catch (e) {
      return;
    }
  };

  const updatePin = (newPin: number) => {
    const updated = newPin;
    setPin(updated);
    savePin(updated);
  };

  const savePin = async (newPin: number) => {
    try {
      await AsyncStorage.setItem("kidsClockPin", JSON.stringify(newPin));
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    if (settingsLoaded) {
      if (settings.easyClock) {
        updateSetting("hourHand", false);
        updateSetting("minuteHand", false);
      };
    }
  }, [settingsLoaded, settings.easyClock]);

  const resetPin = (question: number[], answer: number): PinResetAnswer => {
    const correctAnswer = question.reduce((acc, curr) => acc + curr, 0);

    if (answer === correctAnswer) {
      AsyncStorage.removeItem("kidsClockPin");
      return {result: true, answerText: "PIN-koodi nollattu."};
    } else {
      return {result: false, answerText: "Väärä vastaus."};
    }
  };

  return (
    <SettingsContext.Provider value={{
      settings, updateSetting,
      pin, updatePin,
      timeToLockdown, resetPin
    }}>
      {children}
    </SettingsContext.Provider>
  );
};