import NavBar from "./components/NavBar";
import useGetWeather from "./hooks/useGetWeather";
import CitiesSlider from "./components/CitiesSlider";
import i18next from "i18next";
import Weather from "./components/Weather";
import { useState } from "react";

function App() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const { weatherCity, weatherCityProns } = useGetWeather(selectedCity);

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  return (
    <>
      <header>
        <NavBar city={weatherCity?.name} />
      </header>
      <main>
        <Weather
          weatherCity={weatherCity}
          weatherCityProns={weatherCityProns}
        />
        <CitiesSlider onSelectCity={setSelectedCity} />
      </main>
      <footer>
        <div>
          <button onClick={() => changeLanguage("en")}>Inglés</button>
          <button onClick={() => changeLanguage("es")}>Español</button>
          <button onClick={() => changeLanguage("ca")}>Catalan</button>
          <button onClick={() => changeLanguage("fr")}>Frances</button>
          <button onClick={() => changeLanguage("it")}>Italiano</button>
          <button onClick={() => changeLanguage("de")}>Aleman</button>
        </div>
      </footer>
    </>
  );
}

export default App;
