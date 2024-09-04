import { useEffect, useState } from "react";
import { City } from "../types";
import useGetLocation from "./useGetLocation";

const useGetWeather = (selectedCity: string | null) => {
  const { location } = useGetLocation();

  const [weatherCity, setWeatherCity] = useState<City | null>(null);
  const [weatherCityProns, setWeatherCityProns] = useState<City | null>(null);

  const APIKEY = "629d361c49d59dfaf52ccadda2f42bbe";

  useEffect(() => {
    const cityName = selectedCity || location;

    if (cityName) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`;

      fetch(URL)
        .then((res) => res.json())
        .then((res) => setWeatherCity(res));
    }
  }, [selectedCity, location]);

  useEffect(() => {
    const cityName = selectedCity || location;

    if (cityName) {
      const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}&units=metric`;

      fetch(URL)
        .then((res) => res.json())
        .then((res) => setWeatherCityProns(res));
    }
  }, [selectedCity, location]);

  return { weatherCity, weatherCityProns };
};

export default useGetWeather;
