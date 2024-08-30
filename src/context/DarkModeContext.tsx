import { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextType {
  isLight: boolean;
  handleLight: () => void;
}

const defaultContextValue: DarkModeContextType = {
  isLight: false,
  handleLight: () => {},
};

export const DarkModeContext = createContext(defaultContextValue);

type Props = {
  children: ReactNode;
};

const DARK_MODE_START = { hour: 22, minute: 0 };
const LIGHT_MODE_START = { hour: 8, minute: 30 };

export const DarkModeProvider = ({ children }: Props) => {
  const [isLight, setIsLight] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("isLight");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const handleTimeCheck = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      if (
        currentHour === DARK_MODE_START.hour &&
        currentMinute === DARK_MODE_START.minute &&
        isLight
      ) {
        setIsLight(false);
        return;
      }

      if (
        currentHour === LIGHT_MODE_START.hour &&
        currentMinute === LIGHT_MODE_START.minute &&
        !isLight
      ) {
        setIsLight(true);
        return;
      }
    };

    const intervalId = setInterval(handleTimeCheck, 1000);

    return () => clearInterval(intervalId);
  }, [isLight]);

  useEffect(() => {
    const newHour = new Date().getHours();
    const newMinute = new Date().getMinutes();

    if (
      (newHour >= DARK_MODE_START.hour &&
        newMinute >= DARK_MODE_START.minute) ||
      (newHour < LIGHT_MODE_START.hour && newMinute < LIGHT_MODE_START.minute)
    ) {
      setIsLight(false);
    } else {
      setIsLight(true);
    }
  }, []);

  const handleLight = () => {
    setIsLight(!isLight);
  };

  useEffect(() => {
    localStorage.setItem("isLight", JSON.stringify(isLight));
    document.body.classList.toggle("dark-mode", !isLight);
    document.body.classList.toggle("light-mode", isLight);
  }, [isLight]);

  return (
    <DarkModeContext.Provider value={{ isLight, handleLight }}>
      {children}
    </DarkModeContext.Provider>
  );
};
