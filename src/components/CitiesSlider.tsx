import City from "./City";

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
  return (
    <section className="list-cities">
      {arrayCities.map((city, index) => (
        <City
          key={city}
          name={city}
          length={arrayCities.length}
          index={index}
          onSelectCity={onSelectCity}
        />
      ))}
    </section>
  );
};

export default CitiesSlider;
