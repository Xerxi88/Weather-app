import { City } from "../types";
import { PuffLoader } from "react-spinners";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import WeatherNow from "./WeatherNow";
import WeatherToday from "./WeatherToday";
import WeatherTomorrow from "./WeatherTomorrow";

export type Props = {
  weatherCity?: City | null;
  weatherCityProns: City | null;
  formatDate?: (timestamp: number) => string;
};

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };

  return date.toLocaleDateString("es-ES", options);
}

const Weather = ({ weatherCity, weatherCityProns }: Props) => {
  const { isLight } = useContext(DarkModeContext);

  return (
    <section className="weather-main">
      {weatherCity ? (
        <WeatherNow
          weatherCity={weatherCity}
          weatherCityProns={weatherCityProns}
        />
      ) : (
        <div className="weather-container">
          <PuffLoader
            color={isLight ? "#003aa7" : "#d8e306"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <aside className="weather-prons">
        {weatherCityProns ? (
          <WeatherToday
            weatherCityProns={weatherCityProns}
            weatherCity={weatherCity}
            formatDate={formatDate}
          />
        ) : (
          <PuffLoader
            color={isLight ? "#003aa7" : "#d8e306"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {weatherCityProns ? (
          <WeatherTomorrow
            weatherCityProns={weatherCityProns}
            formatDate={formatDate}
          />
        ) : (
          <PuffLoader
            color={isLight ? "#003aa7" : "#d8e306"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </aside>
    </section>
  );
};

export default Weather;
