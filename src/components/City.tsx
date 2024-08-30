import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CityProps = {
  name: string;
  length: number;
  index: number;
  onSelectCity: (city: string) => void;
};

export interface Params {
  name: string;
  main: Main;
  weather: Weather[];
}

export interface Main {
  temp: number;
}

export interface Weather {
  icon: string;
}

const City = ({ name, length, index, onSelectCity }: CityProps) => {
  const APIKEY = "629d361c49d59dfaf52ccadda2f42bbe";

  const [data, setData] = useState<Params | null>(null);

  const { t } = useTranslation(["translate"]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APIKEY}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [name]);

  return (
    <button
      className="city"
      style={
        {
          "--position": index + 1,
          "--quantity": length,
        } as React.CSSProperties
      }
      onClick={() => onSelectCity(name)}
    >
      <div className="block">
        {t(`${name}`) + "  "}
        {data?.main.temp.toFixed()}º
        <img
          src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`}
          alt="weather-icon"
          width="30px"
          height="30px"
        />
      </div>
    </button>
  );
};

export default City;
