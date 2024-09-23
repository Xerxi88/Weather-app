import { useContext, useEffect, useState } from "react";
import { Params } from "./City";
import { useTranslation } from "react-i18next";
import { CitiesFavsContext } from "../context/CitiesFavsContext";
import { Slash } from "./Icons";

interface CityFav {
  city: string;
  removeCityIcon: boolean;
}

const CardCityFav = ({ city, removeCityIcon }: CityFav) => {
  const APIKEY = "629d361c49d59dfaf52ccadda2f42bbe";

  const [data, setData] = useState<Params | null>(null);

  const { t } = useTranslation(["translate"]);

  const { removeCity, temperature } = useContext(CitiesFavsContext);

  const convertTemp = (value: number) => {
    if (temperature === "celsius") {
      return value + "ºC";
    } else {
      return (value * 1.8 + 32).toFixed(1) + "ºF";
    }
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [city]);

  return (
    <>
      <div className="card-container">
        <div className="card-fav-city">
          <p>{data?.name}</p>
          <span>
            <p className="card-city-temp">
              {convertTemp(Number(data?.main.temp.toFixed(1)))}
            </p>
            <p className="card-city-cond">{t(`${data?.weather?.[0]?.main}`)}</p>
          </span>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`}
          alt="weather-icon"
          width="70px"
          height="70px"
        />
        {removeCityIcon && (
          <button
            className="remove-city-favs"
            onClick={() => removeCity(data?.name || city)}
          >
            <Slash />
          </button>
        )}
      </div>
    </>
  );
};

export default CardCityFav;
