import { useTranslation } from "react-i18next";
import { Props } from "./Weather";

const WeatherTomorrow = ({
  weatherCityProns,
  formatDate,
  temperature,
}: Props) => {
  const { t } = useTranslation(["translate"]);

  const convertTemp = (value: number) => {
    if (temperature === "celsius") {
      return value + "ºC";
    } else {
      return (value * 1.8 + 32).toFixed() + "ºF";
    }
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const filteredTomorrowForecasts = weatherCityProns?.list.filter(
    (forecast) => {
      const forecastDate = forecast.dt_txt.toString().split(" ")[0];
      return forecastDate === getTomorrowDate();
    }
  );

  const maxTemp =
    filteredTomorrowForecasts && filteredTomorrowForecasts.length > 0
      ? Math.max(...filteredTomorrowForecasts.map((item) => item.main.temp_max))
      : 0;

  const minTemp =
    filteredTomorrowForecasts && filteredTomorrowForecasts.length > 0
      ? Math.min(...filteredTomorrowForecasts.map((item) => item.main.temp_min))
      : 0;

  const timestampTomorrow: number | undefined =
    filteredTomorrowForecasts?.[0]?.dt;

  return (
    <div className="weather">
      <div className="card-header">
        <div>
          <p className="card-title">{t("Tomorrow")}</p>
          {formatDate && (
            <p className="card-data">
              {formatDate(timestampTomorrow ?? Date.now())}
            </p>
          )}
        </div>
        <div className="card-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weatherCityProns?.list[0].weather[0].icon}@2x.png`}
            alt="weather-icon"
            width="64px"
            height="64px"
          />
        </div>
      </div>
      <div className="card-body">
        <div>
          <span>{convertTemp(Number(maxTemp.toFixed()))}</span>
          <p>{t("High")}</p>
        </div>
        <div>
          <span>{convertTemp(Number(minTemp.toFixed()))}</span>
          <p>{t("Low")}</p>
        </div>
        <div>
          <span>{weatherCityProns?.list[8].main.humidity.toFixed()}%</span>
          <p>{t("Humidity")}</p>
        </div>
        <div>
          <span>{weatherCityProns?.list[8].wind.speed.toFixed()} km/h</span>
          <p>{t("Wind")}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherTomorrow;
