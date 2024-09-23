import { useContext, useState } from "react";
import CardCityFav from "./CardCityFav";
import { CitiesFavsContext } from "../context/CitiesFavsContext";
import sadFace from "../assets/caraTriste.png";
import { useTranslation } from "react-i18next";
import { BuildingCheck, BuildingGear } from "./Icons";

interface Props {
  openFavorites: boolean;
}

const CitiesFavorites = ({ openFavorites }: Props) => {
  const { citiesFavs } = useContext(CitiesFavsContext);

  const [removeCityIcon, setRemoveCityIcon] = useState<boolean>(false);

  const { t } = useTranslation(["translate"]);

  return (
    <section
      className={openFavorites ? "container-fav-open" : "container-fav-close"}
    >
      {citiesFavs.length > 0 ? (
        <>
          <div className="navbar-favs">
            <p>{t(`ManageCities`)}</p>
            <button onClick={() => setRemoveCityIcon(!removeCityIcon)}>
              {!removeCityIcon ? <BuildingGear /> : <BuildingCheck />}
            </button>
          </div>
          {citiesFavs.map((card) => (
            <CardCityFav
              key={card}
              city={card}
              removeCityIcon={removeCityIcon}
            />
          ))}
        </>
      ) : (
        <>
          <img className="sad-face" src={sadFace} alt="sad" />
          <h2>{t(`AddCitys`)}</h2>
        </>
      )}
    </section>
  );
};

export default CitiesFavorites;
