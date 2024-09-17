import NavBar from "./components/NavBar";
import useGetWeather from "./hooks/useGetWeather";
import CitiesSlider from "./components/CitiesSlider";
import i18next from "i18next";
import Weather from "./components/Weather";
import { useRef, useState } from "react";
import FilterForm from "./components/FilterForm";
import CitiesFavorites from "./components/CitiesFavorites";

function App() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFavorites, setOpenFavorites] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { weatherCity, weatherCityProns } = useGetWeather(
    selectedCity,
    inputRef,
    setErrorMessage
  );

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  return (
    <>
      <header>
        <NavBar
          city={weatherCity?.name}
          setOpenFavorites={setOpenFavorites}
          openFavorites={openFavorites}
        />
      </header>
      <main>
        <FilterForm
          inputRef={inputRef}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setSelectedCity={setSelectedCity}
        />
        <CitiesFavorites
          openFavorites={openFavorites}
          setOpenFavorites={setOpenFavorites}
        />
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
