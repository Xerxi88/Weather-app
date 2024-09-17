import { useContext, useEffect, useState } from "react";
import { Params } from "./City";
import { useTranslation } from "react-i18next";
import { CitiesFavsContext } from "../context/CitiesFavsContext";

interface CityFav {
  city: string;
  removeCityIcon: boolean;
}

const CardCityFav = ({ city, removeCityIcon }: CityFav) => {
  const APIKEY = "629d361c49d59dfaf52ccadda2f42bbe";

  const [data, setData] = useState<Params | null>(null);

  const { t } = useTranslation(["translate"]);

  const { removeCity } = useContext(CitiesFavsContext);

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
            <p className="card-city-temp">{data?.main.temp.toFixed(1)}ºC</p>
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
            <svg
              className="close"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g data-name="Layer 2">
                <g data-name="slash">
                  <rect width="24" height="24" opacity="0" />
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm8 10a7.92 7.92 0 0 1-1.69 4.9L7.1 5.69A7.92 7.92 0 0 1 12 4a8 8 0 0 1 8 8zM4 12a7.92 7.92 0 0 1 1.69-4.9L16.9 18.31A7.92 7.92 0 0 1 12 20a8 8 0 0 1-8-8z" />
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default CardCityFav;
