import { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextType {
  isLight: boolean;
  handleLight: () => void;
  darkModeStart: Time;
  setDarkModeStart: (time: Time) => void;
  lightModeStart: Time;
  setLightModeStart: (time: Time) => void;
}

interface Time {
  hour: number;
  minute: number;
}

const defaultContextValue: DarkModeContextType = {
  isLight: false,
  handleLight: () => {},
  darkModeStart: { hour: 22, minute: 0 },
  setDarkModeStart: () => {},
  lightModeStart: { hour: 8, minute: 30 },
  setLightModeStart: () => {},
};

export const DarkModeContext = createContext(defaultContextValue);

type Props = {
  children: ReactNode;
};

export const DarkModeProvider = ({ children }: Props) => {
  const [isLight, setIsLight] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("isLight");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [darkModeStart, setDarkModeStart] = useState(() => {
    const saved = localStorage.getItem("darkModeStart");
    return saved ? JSON.parse(saved) : { hour: 22, minute: 0 };
  });

  const [lightModeStart, setLightModeStart] = useState(() => {
    const saved = localStorage.getItem("lightModeStart");
    return saved ? JSON.parse(saved) : { hour: 8, minute: 30 };
  });

  const [lastAutoState, setLastAutoState] = useState<"light" | "dark">(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const darkStartMinutes = 22 * 60;
    const lightStartMinutes = 8 * 60 + 30;

    const isNightTime =
      darkStartMinutes < lightStartMinutes
        ? currentMinutes >= darkStartMinutes &&
          currentMinutes < lightStartMinutes
        : currentMinutes >= darkStartMinutes ||
          currentMinutes < lightStartMinutes;

    return isNightTime ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("darkModeStart", JSON.stringify(darkModeStart));
  }, [darkModeStart]);

  useEffect(() => {
    localStorage.setItem("lightModeStart", JSON.stringify(lightModeStart));
  }, [lightModeStart]);

  useEffect(() => {
    const handleTimeCheck = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const darkStartMinutes = darkModeStart.hour * 60 + darkModeStart.minute;
      const lightStartMinutes =
        lightModeStart.hour * 60 + lightModeStart.minute;

      const isNightTime =
        darkStartMinutes < lightStartMinutes
          ? currentMinutes >= darkStartMinutes &&
            currentMinutes < lightStartMinutes
          : currentMinutes >= darkStartMinutes ||
            currentMinutes < lightStartMinutes;

      const currentAutoState = isNightTime ? "dark" : "light";

      if (currentAutoState !== lastAutoState) {
        setLastAutoState(currentAutoState);
        setIsLight(currentAutoState === "light");
      }
    };

    const intervalId = setInterval(handleTimeCheck, 1000);
    return () => clearInterval(intervalId);
  }, [darkModeStart, lightModeStart, lastAutoState]);

  useEffect(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const darkStartMinutes = darkModeStart.hour * 60 + darkModeStart.minute;
    const lightStartMinutes = lightModeStart.hour * 60 + lightModeStart.minute;

    const isNightTime =
      darkStartMinutes < lightStartMinutes
        ? currentMinutes >= darkStartMinutes &&
          currentMinutes < lightStartMinutes
        : currentMinutes >= darkStartMinutes ||
          currentMinutes < lightStartMinutes;

    setIsLight(!isNightTime);
  }, [darkModeStart, lightModeStart]);

  const handleLight = () => {
    setIsLight(!isLight);
  };

  useEffect(() => {
    localStorage.setItem("isLight", JSON.stringify(isLight));
    document.body.classList.toggle("dark-mode", !isLight);
    document.body.classList.toggle("light-mode", isLight);
  }, [isLight]);

  return (
    <DarkModeContext.Provider
      value={{
        isLight,
        handleLight,
        darkModeStart,
        setDarkModeStart,
        lightModeStart,
        setLightModeStart,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
