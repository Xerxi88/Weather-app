import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CityProps = {
  name: string;
  length: number;
  index: number;
  onSelectCity: (city: string) => void;
  temperature: string;
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
  main: string;
}

const City = ({
  name,
  length,
  index,
  onSelectCity,
  temperature,
}: CityProps) => {
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

  const convertTemp = (value: number) => {
    if (temperature === "celsius") {
      return value + "º";
    } else {
      return (value * 1.8 + 32).toFixed() + "º";
    }
  };

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
        {convertTemp(Number(data?.main.temp.toFixed()))}
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
