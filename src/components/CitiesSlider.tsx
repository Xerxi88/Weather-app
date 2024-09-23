import { useContext } from "react";
import City from "./City";
import { CitiesFavsContext } from "../context/CitiesFavsContext";

const arrayCities = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Ibiza",
  "Bilbao",
  "Alicante",
  "Córdoba",
  "Valladolid",
  "Vigo",
  "Gijón",
  "Granada",
  "Santander",
  "Oviedo",
  "Tenerife",
  "A Coruña",
  "La Rioja",
];

const CitiesSlider = ({
  onSelectCity,
}: {
  onSelectCity: (city: string) => void;
}) => {
  const { temperature } = useContext(CitiesFavsContext);
  return (
    <section className="list-cities">
      {arrayCities.map((city, index) => (
        <City
          key={city}
          name={city}
          length={arrayCities.length}
          index={index}
          onSelectCity={onSelectCity}
          temperature={temperature}
        />
      ))}
    </section>
  );
};

export default CitiesSlider;
