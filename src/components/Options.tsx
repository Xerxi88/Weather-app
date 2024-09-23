import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CitiesFavsContext } from "../context/CitiesFavsContext";
import { DarkModeContext } from "../context/DarkModeContext";

interface Props {
  openOptions: boolean;
  setSelectedLanguage: (lang: string) => void;
}

const Options = ({ openOptions, setSelectedLanguage }: Props) => {
  const { t } = useTranslation(["translate"]);

  const { isLight } = useContext(DarkModeContext);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const [openTemp, setOpenTemp] = useState(false);
  const { temperature, setTemperature } = useContext(CitiesFavsContext);

  function convertTextTemp(value: string) {
    const newValue = value.charAt(0).toLocaleUpperCase() + value.substring(1);
    if (newValue === "Celsius") {
      return "Celsius" + " (ºC)";
    } else {
      return "Fahrenheit" + " (ºF)";
    }
  }

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenTemp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section
      className={`${openOptions ? "options-open" : "options-close"} ${
        isLight ? "light" : "dark"
      }`}
    >
      <p>{t(`Setting`)}</p>
      <div className="options-menu">
        <div className="language-option">
          <span>{t(`Lang`)}</span>
          <select onChange={handleLanguageChange}>
            <option value="es">{t(`Spanish`)}</option>
            <option value="ca">{t(`Catalan`)}</option>
            <option value="en">{t(`English`)}</option>
            <option value="fr">{t(`French`)}</option>
            <option value="it">{t(`Italian`)}</option>
            <option value="de">{t(`German`)}</option>
          </select>
        </div>
        <hr />
        <div className="temperature-option">
          <span>{t(`Temperature`)}</span>
          <div className="temperature" ref={menuRef}>
            <span
              className="temperature-title"
              onClick={() => setOpenTemp(!openTemp)}
            >
              {convertTextTemp(temperature)}
            </span>
            {openTemp && (
              <div className="temperature-name">
                <div
                  onClick={() => {
                    setTemperature("celsius");
                    setOpenTemp(false);
                  }}
                >
                  Celsius (ºC)
                </div>
                <hr />
                <div
                  onClick={() => {
                    setTemperature("fahrenheit");
                    setOpenTemp(false);
                  }}
                >
                  Fahrenheit (ºF)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Options;
