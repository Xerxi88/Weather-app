import { useTranslation } from "react-i18next";
import { Props } from "./Weather";

const WeatherToday = ({
  weatherCityProns,
  weatherCity,
  formatDate,
  temperature,
}: Props) => {
  const { t } = useTranslation(["translate"]);

  const timestamp: number | undefined = weatherCity?.dt;

  const convertTemp = (value: number) => {
    if (temperature === "celsius") {
      return value + "ºC";
    } else {
      return (value * 1.8 + 32).toFixed() + "ºF";
    }
  };

  return (
    <div className="weather">
      <div className="card-header">
        <div>
          <p className="card-title">{t("Today")}</p>
          {formatDate && (
            <p className="card-data">{formatDate(timestamp ?? Date.now())}</p>
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
          <span>
            {convertTemp(Number(weatherCity?.main.temp_max.toFixed()))}
          </span>
          <p>{t("High")}</p>
        </div>
        <div>
          <span>
            {convertTemp(Number(weatherCity?.main.temp_min.toFixed()))}
          </span>
          <p>{t("Low")}</p>
        </div>
        <div>
          <span>{weatherCityProns?.list[0].main.humidity.toFixed()}%</span>
          <p>{t("Humidity")}</p>
        </div>
        <div>
          <span>{weatherCity?.wind?.speed.toFixed()} km/h</span>
          <p>{t("Wind")}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherToday;
