import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { City } from "../types";

type Props = {
  weatherCity: City | null;
  weatherCityProns: City | null;
};

const WeatherToday = ({ weatherCity, weatherCityProns }: Props) => {
  const { t } = useTranslation(["translate"]);

  const weatherPronsToday = useMemo(() => {
    return weatherCityProns?.list.splice(0, 5);
  }, [weatherCityProns]);

  function formateHour(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return date.toLocaleString("en-US", options);
  }

  return (
    <>
      <div className="weather-container">
        <div>
          <div className="weather-temp">
            {weatherCity?.main.temp.toFixed(1)}ºC
          </div>
          <div className="weather-state">
            {t(`${weatherCity?.weather?.[0]?.main}`)}
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherCity?.weather?.[0]?.icon}@2x.png`}
            alt="weather-icon"
            width="120px"
            height="120px"
          />
        </div>

        <div className="prons-today">
          <table>
            <thead key={weatherCity?.id}>
              <tr>
                {weatherPronsToday?.map((hour) => (
                  <th key={hour.dt}>{formateHour(hour.dt)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weatherPronsToday?.map((weather) => (
                  <td key={weather.dt}>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                      alt="weather-icon"
                      width="50px"
                      height="50px"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {weatherPronsToday?.map((weather) => (
                  <td key={weather.dt} className="prons-today-temp">
                    {weather.main.temp.toFixed()}º
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WeatherToday;
