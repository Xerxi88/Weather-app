import { useEffect, useState } from "react";
import { City } from "../types";
import useGetLocation from "./useGetLocation";
import { useTranslation } from "react-i18next";

const useGetWeather = (
  selectedCity: string | null,
  inputRef: React.RefObject<HTMLInputElement>,
  setErrorMessage: (message: string) => void
) => {
  const { location } = useGetLocation();
  const [weatherCity, setWeatherCity] = useState<City | null>(null);
  const [weatherCityProns, setWeatherCityProns] = useState<City | null>(null);
  const { t } = useTranslation(["translate"]);

  const APIKEY = "629d361c49d59dfaf52ccadda2f42bbe";

  useEffect(() => {
    const cityName = selectedCity || location;

    if (cityName) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`;

      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          if (res.cod !== 200) {
            setErrorMessage(t("ErrorCity"));
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            return;
          }
          setWeatherCity(res);
        })
        .catch(() => {
          setErrorMessage(t("ErrorCity"));
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        });
    }
  }, [selectedCity, location, inputRef, t, setErrorMessage]);

  useEffect(() => {
    const cityName = selectedCity || location;

    if (cityName) {
      const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}&units=metric`;

      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          if (res.cod !== "200") {
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            return;
          }

          if (inputRef.current) {
            inputRef.current.value = "";
          }
          setWeatherCityProns(res);
        })
        .catch(() => {
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        });
    }
  }, [selectedCity, location, inputRef]);

  return { weatherCity, weatherCityProns };
};

export default useGetWeather;
