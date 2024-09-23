import { useContext } from "react";
import "../App.css";
import { useTranslation } from "react-i18next";
import { PulseLoader } from "react-spinners";
import { DarkModeContext } from "../context/DarkModeContext";
import { CitiesFavsContext } from "../context/CitiesFavsContext";
import { BuildingAdd, BuildingSlash, GearIcon, MapIcon, Pin } from "./Icons";

export type Props = {
  city: string | undefined;
  setOpenFavorites: (state: boolean) => void;
  openFavorites: boolean;
  setOpenOptions: (state: boolean) => void;
  openOptions: boolean;
};

export const NavBar = ({
  city,
  setOpenFavorites,
  openFavorites,
  setOpenOptions,
  openOptions,
}: Props) => {
  const { t } = useTranslation(["translate"]);

  const { addCity, removeCity, citiesFavs } = useContext(CitiesFavsContext);

  const { isLight, handleLight } = useContext(DarkModeContext);

  return (
    <header className="navbar">
      <div className="logo" data-testid="logo">
        <Pin />
        {city ? (
          t(`${city}`)
        ) : (
          <PulseLoader color="#ffffff" speedMultiplier={0.7} />
        )}
        {city && citiesFavs.includes(city) ? (
          <button onClick={() => removeCity(city)}>
            <BuildingSlash />
          </button>
        ) : (
          city && (
            <button onClick={() => addCity(city)}>
              <BuildingAdd />
            </button>
          )
        )}
      </div>

      <div className="icons" data-testid="icons">
        <button className="btn-dark-mode" onClick={handleLight}>
          {isLight ? "🌚" : "🌞"}
        </button>
        <div onClick={() => setOpenFavorites(!openFavorites)}>
          <MapIcon />
        </div>
        <div onClick={() => setOpenOptions(!openOptions)}>
          <GearIcon />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
