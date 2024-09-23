import NavBar from "./components/NavBar";
import useGetWeather from "./hooks/useGetWeather";
import CitiesSlider from "./components/CitiesSlider";
import i18next from "i18next";
import Weather from "./components/Weather";
import { useEffect, useRef, useState } from "react";
import FilterForm from "./components/FilterForm";
import CitiesFavorites from "./components/CitiesFavorites";
import Options from "./components/Options";

function App() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("es");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFavorites, setOpenFavorites] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { weatherCity, weatherCityProns } = useGetWeather(
    selectedCity,
    inputRef,
    setErrorMessage
  );

  useEffect(() => {
    i18next.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <>
      <header>
        <NavBar
          city={weatherCity?.name}
          setOpenFavorites={setOpenFavorites}
          openFavorites={openFavorites}
          setOpenOptions={setOpenOptions}
          openOptions={openOptions}
        />
      </header>
      <main>
        <FilterForm
          inputRef={inputRef}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setSelectedCity={setSelectedCity}
        />
        <CitiesFavorites openFavorites={openFavorites} />
        <Options
          openOptions={openOptions}
          setSelectedLanguage={setSelectedLanguage}
        />
        <Weather
          weatherCity={weatherCity}
          weatherCityProns={weatherCityProns}
        />
        <CitiesSlider onSelectCity={setSelectedCity} />
      </main>
    </>
  );
}

export default App;
