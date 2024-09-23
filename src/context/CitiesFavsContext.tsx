import { createContext, ReactNode, useEffect, useState } from "react";

type InitialValue = {
  citiesFavs: Array<string>;
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
  temperature: string;
  setTemperature: (temp: string) => void;
};

const InitialValue: InitialValue = {
  citiesFavs: [],
  addCity: () => {},
  removeCity: () => {},
  temperature: "celsius",
  setTemperature: () => {},
};
type Children = {
  children: ReactNode;
};

export const CitiesFavsContext = createContext(InitialValue);

export const CitiesFavsProvider = ({ children }: Children) => {
  const [citiesFavs, setCitiesFavs] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const [temperature, setTemperature] = useState(InitialValue.temperature);

  const addCity = (city: string) => {
    if (!citiesFavs.includes(city)) {
      setCitiesFavs([...citiesFavs, city]);
    }
  };

  const removeCity = (city: string) => {
    setCitiesFavs(citiesFavs.filter((card) => card !== city));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(citiesFavs));
  }, [citiesFavs]);

  return (
    <CitiesFavsContext.Provider
      value={{ citiesFavs, addCity, removeCity, temperature, setTemperature }}
    >
      {children}
    </CitiesFavsContext.Provider>
  );
};
